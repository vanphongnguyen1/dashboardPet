import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { BtnCreatExport } from '../../../../Components/Btn'
import TableContentTab from './TableContentTab'
import { useDispatch, useSelector } from 'react-redux'
import { sectionData } from './sectionData'
import PropTypes from 'prop-types'
import { fetchOrders } from '../../../../rootReducers/orderSlice'
import { fetchProductDetailOrderAll } from '../../../../rootReducers/productDetailOrderThunk'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { useHistory } from 'react-router-dom'
import { fetchCarts } from '../../../../rootReducers/cartSlice'

const Orders = ({ match }) => {
  const url = match.url.slice(1)
  const { TabPane } = Tabs
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

  const [listDataPending, setListDataPending] = useState([])
  const [listDataDelivered, setListDataDelivered] = useState([])
  const [listDataCanselled, setListDataCanselled] = useState([])

  useEffect(() => {
    if (dataOrder.loading === 'success' && dataCarts.loading === 'success' && dataProductDetailOrder.loading === 'success') {
      const [
        dataPending,
        dataDelivered,
        dataCanselled
      ] = sectionData(dataOrder.list, dataProductDetailOrder.list, dataCarts.list)

      setListDataPending(dataPending)
      setListDataDelivered(dataDelivered)
      setListDataCanselled(dataCanselled)
      dispatch(hideLoading('sectionBar'))
    }
  }, [dispatch, dataOrder, dataCarts, dataProductDetailOrder])

  console.log(listDataPending);
  console.log(listDataCanselled);
  console.log(listDataDelivered);

  return (
    <div className="orders posi-relative">
      <div className="box-btn">
        <div className="box-btn--link">
          <BtnCreatExport
            icon="fas fa-arrow-alt-to-bottom"
            title="Export"
          />
        </div>
      </div>

      <Tabs type="card">
        <TabPane tab="Pendding" key="1">
          <TableContentTab data={listDataPending} url={url} />
        </TabPane>

        <TabPane tab="Delivered" key="2">
          <TableContentTab data={listDataDelivered} url={url} />
        </TabPane>

        <TabPane tab="Cancelled" key="3">
          <TableContentTab data={listDataCanselled} url={url} />
        </TabPane>
      </Tabs>
    </div>
  )
}

Orders.propTypes = {
  match: PropTypes.object
}

Orders.defaultProps = {
  match: {}
}

export default Orders
