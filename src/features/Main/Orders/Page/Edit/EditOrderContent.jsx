import { useState, useEffect } from 'react'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Lable } from '../../../../../Components/Form/Lable'
import { fetchStatus } from '../../../../../rootReducers/statusSlice'
import { fetchTrasport } from '../../../../../rootReducers/trasportSlice'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import moment from 'moment'
import { customAxiosApi } from '../../../../../customAxiosApi'
import ItemTotal from './ItemTotal'
import ItemProduct from './ItemProduct'
import { REGEX } from '../../../../../dataDefault'

const EditOrderContent = ({ data })  =>{
  const { user, order, products, totals } = data
  const initialValidate = {
    name: '',
    address: '',
    phone: ''
  }

  const dispatch = useDispatch()
  const dataStatus = useSelector(state => state.status)
  const dataTrasport = useSelector(state => state.trasport)

  const [validate, setValidate] = useState(initialValidate)
  const [dataUser, setDataUser] = useState(user)
  const [dataOrder, setDataOrder] = useState(order)
  const [dataProducts, setDataProducts] = useState(products)
  const [dataTotals, setDataTotals] = useState(totals)

  let sumPriceProduct = 0
  let sumCount = 0

  useEffect(() => {
    dispatch(fetchStatus())
    dispatch(fetchTrasport())
  }, [dispatch])

  const findPriceTrasport = id => {
    const newData = dataTrasport.list.find(item => item.id === id)
    return newData.price
  }

  const handleOnBlur = e => {
    const { value, name } = e.target

    if ( !value ) {
      setValidate({
        ...validate,
        [name]: 'Requite *'
      })
    }
  }

  const handleOnChange = e => {
    const { name, value } = e.target

    if (name === 'trasport' || name === 'status') {
      setDataOrder({
        ...dataOrder,
        [name]: value
      })

      if (name === 'trasport') {
        setDataTotals({
          ...dataTotals,
          trasport: findPriceTrasport(Number(value)),
          intoMeny: dataTotals.totalPrice + findPriceTrasport(Number(value))
        })
      }

    } else {
      setDataUser({
        ...dataUser,
        [name]: value
      })
    }
  }

  const onChangeCountProduct = (value, id) => {
    const newdata = dataProducts.map(product => {
      if (product.id === id) {
        return {
          ...product,
          count: value,
          totalPrice: product.price * value
        }
      }
      return product
    })

    if (newdata.length > 0) {
      newdata.forEach(product => {
        sumPriceProduct += product.totalPrice
        sumCount += product.count
      })
    }

    setDataTotals({
      ...dataTotals,
      totalCount: sumCount,
      totalPrice: sumPriceProduct,
      intoMeny: dataTotals.trasport + sumPriceProduct
    })

    setDataProducts(newdata)
  }

  const handleDelProduct = id => {
    const newdata = dataProducts.filter(product => product.id !== id)

    if (newdata.length > 0) {
      newdata.forEach(product => {
        sumPriceProduct += product.totalPrice
        sumCount += product.count
      })
    }

    setDataTotals({
      ...dataTotals,
      totalPrice: sumPriceProduct,
      totalCount: sumCount,
      intoMeny: dataTotals.trasport + sumPriceProduct
    })

    setDataProducts(newdata)
  }

  const openMessage = () => {
    const key = 'updatable'

    message.loading({ content: 'Loading...', key })
    setTimeout(() => {
      message.success({ content: 'Success!', key, duration: 2 })
    }, 1000)
  }

  const checkValidated = () => {
    const { ...newValidate } = validate

    if (!REGEX.EMAIL.test(dataUser.email)) {
      newValidate.email = 'Bạn nhập sai Email !'
    }

    if (!REGEX.PHONE.test(dataUser.phone)) {
      newValidate.phone = 'Số điện thoại gồm 10 số và đầu là 09|03|08|05|07'
    }

    for (let key in dataUser) {
      if (!dataUser[key]) {
        newValidate[key] = 'Requite *'
      }
    }

    setValidate(newValidate)

    for (let key in newValidate) {
      if (newValidate[key]) {
        return false
      }
    }
    return true
  }

  const handleSave = () => {
    const isInputValida = checkValidated()

    if (isInputValida) {
      customAxiosApi.put(`/users/${dataUser.id}`, dataUser)
      .then(response => {
        console.log(response.data)
      })

      customAxiosApi.put(`/orders/${dataOrder.id}`, {
        intoMeny: dataTotals.intoMeny,
        trasportID: dataOrder.trasport,
        peymentID: dataOrder.peyment,
        statusID: dataOrder.status,
      })

      customAxiosApi.put(`/detailOrder/${dataOrder.detailOrderID}`, {
        count: dataTotals.totalCount,
        price: dataTotals.totalPrice,
      })

      dataProducts.forEach(productDetailOrder => {
        customAxiosApi.put(`/productDetailOrder/${productDetailOrder.id}`, {
          count: productDetailOrder.count,
          price: productDetailOrder.totalPrice,
        })
      })

      openMessage ()
    }
  }

  const hanleDeleteOrder = () => {
    customAxiosApi.delete(`/orders/${dataOrder.id}`)
    customAxiosApi.delete(`/detailOrder/${dataOrder.detailOrderID}`)

    dataProducts.forEach(productDetailOrder => {
      customAxiosApi.delete(`/productDetailOrder/${productDetailOrder.id}`)
    })
  }

  return (
    <>
      <div className="edit-order">
        <div className="edit-order__heading">
          Order
        </div>

        <div className="box-row">
          <div className="box-5">
            <div className="edit-order__box">
              <span className="edit-order__box--text">
                Date: { moment(dataOrder.date).format('DD-MM-YYYY') }
              </span>

              <div className="group">
                <select
                  name="status"
                  className="group__select"
                  onChange={handleOnChange}
                  value={dataOrder.status}
                >
                  {
                    dataStatus.loading === 'success'
                      ? (
                          dataStatus.list.map(item => {
                            return (
                              <option
                                value={item.id}
                                key={item.id}
                                >
                                  { item.name}
                              </option>
                            )
                          })
                      ) : ''
                  }
                </select>

                <Lable
                  text="Status"
                  className='group__label label-input-value'
                />
              </div>

              <div className="group">
                <select
                  name="trasport"
                  className="group__select"
                  onChange={handleOnChange}
                  value={dataOrder.trasport}
                >
                  {
                    dataTrasport.loading === 'success'
                      ? (
                          dataTrasport.list.map(item => {
                            return (
                              <option
                                value={item.id}
                                key={item.id}
                                >
                                  { item.name}
                              </option>
                            )
                          })
                      ) : ''
                  }
                </select>

                <Lable
                  text="Trasport"
                  className='group__label label-input-value'
                />
              </div>
            </div>
          </div>

          <div className="box-7">
            <div className="edit-order__box">
              <p className="edit-order__box--title">
                Customer
              </p>

              <GroupInput
                type="text"
                name="name"
                validateName={validate.name}
                value={dataUser.name}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Name *"
              />

              <GroupInput
                type="text"
                name="phone"
                validateName={validate.phone}
                value={dataUser.phone}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Phone *"
              />

              <GroupInput
                type="text"
                name="address"
                validateName={validate.address}
                value={dataUser.address}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Address *"
              />
            </div>
          </div>
        </div>

        <div className="edit-order__box">
          <p className="edit-order__box--title">Products</p>

          <div className="table">
            <div className="table__item">
              <div className="table__tr">
                <p className="table__th--name">Name</p>
                <p className="table__th--price">Price</p>
                <p className="table__th--count">Count</p>
                <p className="table__th--totalPrice">TotalPrice</p>
                <p className="table__th--action">Action</p>
              </div>

              {
                dataProducts.map((product, index) => {
                  return (
                    <ItemProduct
                      key={index}
                      name={product.name}
                      count={product.count}
                      price={product.price}
                      totalPrice={product.totalPrice}
                      onChangeCount={value => onChangeCountProduct(value, product.id)}
                      handleDelProduct={() => handleDelProduct(product.id)}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className="edit-order__box">
          <p className="edit-order__box--title">Totals</p>

          <div className="totals">
            <div className="table">
              <ItemTotal name="totalPrice" value={dataTotals.totalPrice} />

              <ItemTotal name="totalCount" value={dataTotals.totalCount} />

              <ItemTotal name="Trasport" value={dataTotals.trasport} />

              <ItemTotal name="Peyment" value={dataTotals.peyment} />

              <ItemTotal name="intoMeny" value={dataTotals.intoMeny} />
            </div>
          </div>
        </div>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save" onClick={handleSave}>
              <Save />
            </div >
            <div className="box-submit__delete" onClick={hanleDeleteOrder}>
              <Delete/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditOrderContent
