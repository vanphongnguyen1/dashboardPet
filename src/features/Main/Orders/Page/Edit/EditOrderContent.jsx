import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openMessage } from '../../../../../Components/openMessage'
import { Selector } from '../../../../../Components/Form/Selector'
import moment from 'moment'
import PropTypes from 'prop-types'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { fetchStatus } from '../../../../../rootReducers/statusSlice'
import { fetchTrasport } from '../../../../../rootReducers/trasportSlice'
import { defaultOrder } from '../../../../../rootReducers/orderSlice'
import { Delete, Save } from '../../../../../Components/Btn'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { REGEX } from '../../../../../dataDefault'
import { HeadingBox, SubHeading } from '../../../../../Components/HeadingBox'
import DelayLink from '../../../../../Components/DelayLink'
import ItemTotal from './ItemTotal'
import ItemProduct from './ItemProduct'

const EditOrderContent = ({ url })  =>{
  const urlOrder = url.split('/')
  const dispatch = useDispatch()

  const dataStatus = useSelector(state => state.status)
  const dataTrasport = useSelector(state => state.trasport)
  const data = useSelector(state => state.orders.order)

  const initialValidate = {
    name: '',
    address: '',
    phone: ''
  }

  const [validate, setValidate] = useState(initialValidate)
  const [dataEdit, setDataEdit] = useState(data)

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

    if (name === 'trasportID') {
      setDataEdit({
        ...dataEdit,
        trasportID: value,
        trasport: findPriceTrasport(Number(value)),
        intoMeny: dataEdit.totalPrice + findPriceTrasport(Number(value))
      })
    } else {
      setDataEdit({
        ...dataEdit,
        [name]: value
      })
    }
  }

  const onChangeCountProduct = (value, id) => {
    let sumPriceProduct = 0
    let sumCount = 0

    const newdata = dataEdit.products.map(product => {
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

    setDataEdit({
      ...dataEdit,
      products: newdata,
      totalCount: sumCount,
      totalPrice: sumPriceProduct,
      intoMeny: dataEdit.trasport + sumPriceProduct
    })
  }

  const handleDelProduct = id => {
    let sumPriceProduct = 0
    let sumCount = 0

    const newdata = dataEdit.products.filter(product => product.id !== id)

    if (newdata.length > 0) {
      newdata.forEach(product => {
        sumPriceProduct += product.totalPrice
        sumCount += product.count
      })
    }

    setDataEdit({
      ...dataEdit,
      products: newdata,
      totalCount: sumCount,
      totalPrice: sumPriceProduct,
      intoMeny: dataEdit.trasport + sumPriceProduct
    })
  }

  const checkValidated = () => {
    const { ...newValidate } = validate

    if (!REGEX.PHONE.test(dataEdit.phone)) {
      newValidate.phone = 'Số điện thoại gồm 10 số và đầu là 09|03|08|05|07'
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

    if (!dataEdit.products.length > 0) {
      hanleDeleteOrder()
      return;
    }

    if (isInputValida) {
      customAxiosApi.put(`/users/${dataEdit.usersID}`, {
        name: dataEdit.name,
        phone: dataEdit.phone,
        address: dataEdit.address
      })
      .then(response => {
        console.log(response.data)
      })

      customAxiosApi.put(`/orders/${dataEdit.id}`, {
        intoMeny: dataEdit.intoMeny,
        trasportID: dataEdit.trasportID,
        peymentID: dataEdit.peymentID,
        statusID: dataEdit.statusID,
      })

      customAxiosApi.put(`/detailOrder/${dataEdit.detailOrderID}`, {
        count: dataEdit.totalCount,
        price: dataEdit.totalPrice,
      })

      dataEdit.products.forEach(productDetailOrder => {
        customAxiosApi.put(`/productDetailOrder/${productDetailOrder.id}`, {
          count: productDetailOrder.count,
          price: productDetailOrder.totalPrice,
        })
      })

      openMessage('Update Success !')
    }
  }

  const hanleDeleteOrder = async () => {
    await customAxiosApi.delete(`/orders/${dataEdit.id}`)
    await customAxiosApi.delete(`/detailOrder/${dataEdit.detailOrderID}`)

    await dataEdit.products.forEach(productDetailOrder => {
      customAxiosApi.delete(`/productDetailOrder/${productDetailOrder.id}`)
    })

    dispatch(defaultOrder())
  }

  return (
    <>
      <div className="edit-order">
        <HeadingBox title="Order" />

        <div className="box-row">
          <div className="box-5">
            <div className="edit-order__box">
              <span className="edit-order__box--text">
                Date: { moment(dataEdit.updated).format('DD-MM-YYYY') }
              </span>

              <Selector
                title="Status"
                name="statusID"
                onChange={handleOnChange}
                value={dataEdit.statusID}
                options={dataStatus.list}
              />

              <Selector
                title="Trasport"
                name="trasportID"
                onChange={handleOnChange}
                value={dataEdit.trasportID}
                options={dataTrasport.list}
              />
            </div>
          </div>

          <div className="box-7">
            <div className="edit-order__box">
              <SubHeading title="Customer" />

              <GroupInput
                type="text"
                name="name"
                validateName={validate.name}
                value={dataEdit.name}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Name *"
              />

              <GroupInput
                type="text"
                name="phone"
                validateName={validate.phone}
                value={dataEdit.phone}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Phone *"
              />

              <GroupInput
                type="text"
                name="address"
                validateName={validate.address}
                value={dataEdit.address}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Address *"
              />
            </div>
          </div>
        </div>

        <div className="edit-order__box">
          <SubHeading title="Products" />

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
                dataEdit.products.map((product, index) => {
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
          <SubHeading title="Totals" />

          <div className="totals">
            <div className="table">
              <ItemTotal name="totalPrice" value={dataEdit.totalPrice} />

              <ItemTotal name="totalCount" value={dataEdit.totalCount} />

              <ItemTotal name="Trasport" value={dataEdit.trasport} />

              <ItemTotal name="Peyment" value={dataEdit.peyment} />

              <ItemTotal name="intoMeny" value={dataEdit.intoMeny} />
            </div>
          </div>
        </div>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save" onClick={handleSave}>
              <Save />
            </div >
            <DelayLink
              to={`/${urlOrder[1]}`}
              className="box-submit__delete"
              onClick={hanleDeleteOrder}
              delay={1000}
              children={<Delete/>}
            />
          </div>
        </div>
      </div>
    </>
  )
}

EditOrderContent.propTypes = {
  url: PropTypes.string
}
EditOrderContent.defaultProps = {
  url: ''
}

export default EditOrderContent
