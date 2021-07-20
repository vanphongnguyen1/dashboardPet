import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openMessage } from '../../../../../Components/openMessage'
import { Selector } from '../../../../../Components/Form/Selector'
import { date } from '../../../../../Components/myMonment'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { fetchOrder } from '../../../../../rootReducers/orderSlice'
import { fetchDetailOrder } from '../../../../../rootReducers/productDetailOrderThunk'
import { fetchCarts } from '../../../../../rootReducers/cartSlice'
import { Delete, Save } from '../../../../../Components/Btn'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { REGEX, TITLE_MENU, API_NAME } from '../../../../../dataDefault'
import { HeadingBox, SubHeading } from '../../../../../Components/HeadingBox'
import ItemTotal from './ItemTotal'
import ItemProduct from './ItemProduct'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { Prompt, useParams, useHistory } from 'react-router-dom'
import { resetScroll } from '../../../../../Components/access/logic/resetScroll'
import { sectionData } from '../sectionData'

const EditOrderContent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const dataStatus = useSelector(state => state.status)
  const dataTrasport = useSelector(state => state.trasport)
  const dataCarts = useSelector(state => state.carts)

  const initialValidate = {
    name: '',
    address: '',
    phone: ''
  }

  const [validate, setValidate] = useState(initialValidate)
  const [dataEdit, setDataEdit] = useState({})
  const [isLocalPath, setIsLocalPath] = useState(false)

  const findPriceTrasport = id => {
    const newData = dataTrasport.list.find(item => item.id === id)
    return newData.price
  }

  useEffect(() => {
    dispatch(fetchCarts())
  }, [dispatch])

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    if (id && dataCarts.loading === 'success') {
      dispatch(fetchOrder(id))
      .then(data => {
        const { payload } = data

        dispatch(fetchDetailOrder(payload.detailOrderID))
        .then(res => {
          const newDataEdit = sectionData([payload], res.payload, dataCarts.list)

          setDataEdit(newDataEdit[0])
        })
      })
    }

    setTimeout(() => {
      dispatch(hideLoading('sectionBar'))
    }, 700)
  }, [dispatch, id, dataCarts])

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
    setIsLocalPath(true)

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

      setValidate({
        ...validate,
        [name]: ''
      })
    }
  }

  const onChangeCountProduct = (value, id) => {
    let sumPriceProduct = 0
    let sumCount = 0
    setIsLocalPath(true)

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
      newValidate.phone = 'Đầu số 09|03|08|05|07 gồm 10 số !'
    }

    setValidate(newValidate)

    for (let key in newValidate) {
      if (newValidate[key]) {
        return false
      }
    }
    return true
  }

  const handleSave = async () => {
    const isInputValida = checkValidated()
    const cart = dataCarts.list.find(item => item.id === dataEdit.cartID)

    if (isInputValida) {
      if (isLocalPath) {
        setIsLocalPath(false)
      }

      dispatch(showLoading('sectionBar'))

      customAxiosApi.put(`${API_NAME.USERS}/${cart.usersID}`, {
        name: dataEdit.name,
        phone: dataEdit.phone,
        address: dataEdit.address
      })
      .then(response => {
        console.log(response.data)
      })

      customAxiosApi.put(`${API_NAME.ORDERS}/${dataEdit.id}`, {
        intoMeny: dataEdit.intoMeny,
        trasportID: dataEdit.trasportID,
        peymentID: dataEdit.peymentID,
        statusID: dataEdit.statusID,
      })

      customAxiosApi.put(`${API_NAME.DETAILORDER}/${dataEdit.detailOrderID}`, {
        count: dataEdit.totalCount,
        price: dataEdit.totalPrice,
      })

      dataEdit.products.forEach(productDetailOrder => {
        customAxiosApi.put(`${API_NAME.PRODUCTDETAILORDER}/${productDetailOrder.id}`, {
          count: productDetailOrder.count,
          price: productDetailOrder.totalPrice,
        })
      })

      openMessage('Update Success !')
      await setTimeout(() => {
        resetScroll()
        dispatch(hideLoading('sectionBar'))
      }, 500)
    }
  }

  const hanleDeleteOrder = async () => {
    if (isLocalPath) {
      setIsLocalPath(false)
    }

    dispatch(showLoading('sectionBar'))

    await customAxiosApi.delete(`${API_NAME.ORDERS}/${dataEdit.id}`)
    await customAxiosApi.delete(`${API_NAME.DETAILORDER}/${dataEdit.detailOrderID}`)

    await dataEdit.products.forEach(async productDetailOrder => {
      await customAxiosApi.delete(`${API_NAME.PRODUCTDETAILORDER}/${productDetailOrder.id}`)
    })
    await dispatch(hideLoading('sectionBar'))
    history.replace(`/${TITLE_MENU.ORDERS}`)
  }

  return (
    <>
      <div className="edit-order">
        <HeadingBox title="Order" />

        <div className="box-row">
          <div className="box-5">
            <div className="edit-order__box">
              <span className="edit-order__box--text">
                Date: { date(dataEdit.updated) }
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
                dataEdit.hasOwnProperty('products') &&
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
              <ItemTotal
                name="totalPrice"
                value={dataEdit.totalPrice}
              />

              <ItemTotal
                name="totalCount"
                value={dataEdit.totalCount}
              />

              <ItemTotal
                name="Trasport"
                value={dataEdit.trasport}
              />

              <ItemTotal
                name="Peyment"
                value={dataEdit.peyment}
              />

              <ItemTotal
                name="intoMeny"
                value={dataEdit.intoMeny}
              />
            </div>
          </div>
        </div>

        <div className="box-submit">
          <div className="box-row justify-between">
            <div
              className="box-submit__save"
              onClick={handleSave}
            >
              <Save />
            </div>

            <div
              className="box-submit__delete"
              onClick={hanleDeleteOrder}
            >
            <Delete/>
            </div>
          </div>
        </div>
      </div>

      <Prompt
        when={isLocalPath}
        message={location => (`Bạn có muốn đến ${location.pathname}`)}
      />
    </>
  )
}

export default EditOrderContent
