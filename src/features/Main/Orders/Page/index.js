import { useEffect } from 'react'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { Create } from '../../../../Components/Btn'
import TableContentTab from './TableContentTab'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../../../rootReducers/orderSlice'
import { fetchProductDetailOrder } from '../../../../rootReducers/productDetailOrderThunk'
import { sectionData } from './sectionData'
import Loading from '../../../../Components/Loading'
import PropTypes from 'prop-types'

const Orders = ({ match }) => {
  const url = match.url.slice(1)
  const { TabPane } = Tabs
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders(url))
    dispatch(fetchProductDetailOrder('productDetailOrder'))
  }, [dispatch, url])

  const dataOrder = useSelector(state => state.orders)
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder.list)

  if (dataOrder.loading === 'success') {
    const [
      dataPending,
      dataDelivered,
      dataCanselled
    ] = sectionData(dataOrder.list, dataProductDetailOrder)

    return (
      <div className="orders posi-relative">
        <div className="box-btn">
          <Link
            to={`/${url}`}
            className="box-btn--link"
          >
            <Create />
          </Link>
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

  } else {
    return <Loading />
  }
}

Orders.propTypes = {
  match: PropTypes.object
}

Orders.defaultProps = {
  match: {}
}

export default Orders
