import { useEffect } from 'react'
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

const Orders = ({ match }) => {
  const url = match.url.slice(1)
  const { TabPane } = Tabs
  const dispatch = useDispatch()
  const history = useHistory()

  const dataToken = useSelector(state => state.login.token)
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!dataToken && !idLogin) {
      history.replace("/")
    }
  }, [dataToken, history, idLogin])

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchOrders())
    dispatch(fetchProductDetailOrderAll())
  }, [dispatch])

  const dataOrder = useSelector(state => state.orders)
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder)

  useEffect(() => {
    if (dataProductDetailOrder.loading === 'success') {
      setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 500)
    }
  }, [dispatch, dataProductDetailOrder.loading])

  const [
    dataPending,
    dataDelivered,
    dataCanselled
  ] = sectionData(dataOrder.list, dataProductDetailOrder.list)

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
          <TableContentTab data={dataPending} url={url} />
        </TabPane>

        <TabPane tab="Delivered" key="2">
          <TableContentTab data={dataDelivered} url={url} />
        </TabPane>

        <TabPane tab="Cancelled" key="3">
          <TableContentTab data={dataCanselled} url={url} />
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
