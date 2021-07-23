import { useEffect, useState } from 'react'
import TableContentTab from '../TableContentTab'
import { useDispatch, useSelector } from 'react-redux'
import { sectionData } from '../sectionData'
import PropTypes from 'prop-types'
import { fetchOrders } from '../../../../../rootReducers/orderSlice'
import { fetchProductDetailOrderAll } from '../../../../../rootReducers/productDetailOrderThunk'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { useHistory } from 'react-router-dom'
import { fetchCarts } from '../../../../../rootReducers/cartSlice'
import moment from 'moment'

const OrderMoth = ({ match }) => {
  const url = match.url.slice(1)
  const dispatch = useDispatch()
  const history = useHistory()

  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin && !idLogin) {
      history.replace("/")
    }
  }, [history, idLogin])

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchOrders())
    dispatch(fetchProductDetailOrderAll())
    dispatch(fetchCarts())
  }, [dispatch])

  const dataOrder = useSelector(state => state.orders)
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder)
  const dataCarts = useSelector(state => state.carts)
  const [listDataDelivered, setListDataDelivered] = useState([])


  useEffect(() => {
    const moth = moment().format('MM')
    if (dataOrder.loading === 'success' && dataCarts.loading === 'success' && dataProductDetailOrder.loading === 'success') {
      const [
        ,
        dataDelivered,

      ] = sectionData(dataOrder.list, dataProductDetailOrder.list, dataCarts.list)
      const newData = []

      dataDelivered.forEach(item => {
        const dayOrder = moment(item.updated_at).format('MM')

        if (moth === dayOrder && item.status === 'delivered') {
          newData.push(item)
        }
      })

      newData.sort((a, b) => -a.id + b.id)

      setListDataDelivered(newData)
      dispatch(hideLoading('sectionBar'))
    }
  }, [dispatch, dataOrder, dataCarts, dataProductDetailOrder])

  return (
    <div className="orders posi-relative">

      <TableContentTab data={listDataDelivered} url={url} />
    </div>
  )
}

OrderMoth.propTypes = {
  match: PropTypes.object
}

OrderMoth.defaultProps = {
  match: {}
}

export default OrderMoth
