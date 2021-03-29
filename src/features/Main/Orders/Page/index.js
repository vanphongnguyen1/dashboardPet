import { useEffect } from 'react'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { Create } from '../../../../Components/Btn'
import TableContentTab from './TableContentTab'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../asyncThunk/orderSlice'
import { fetchProductDetailOrder } from '../../../../rootReducers/productDetailOrderThunk'
import { useSectionData } from './useSectionData'
import Loading from '../../../../Components/Loading'

const Orders = () => {
  const { TabPane } = Tabs
  const dispatch = useDispatch()
  const dataOrder = useSelector(state => state.orders)
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder.list)

  const [
    dataPending,
    dataDelivered,
    dataCanselled
  ] = useSectionData(dataOrder.list, dataProductDetailOrder)

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchProductDetailOrder())
  }, [dispatch])

  return (
    <>
      {
        dataOrder.loading === 'success' ? (
          <div className="orders posi-relative">
            <div className="box-btn">
              <Link
                // to={`/${TITLE_MENU.USERS.toLowerCase()}/${CREAT.toLowerCase()}`}
                className="box-btn--link"
              >
                <Create />
              </Link>
            </div>

            <Tabs type="card">
              <TabPane tab="Pendding" key="1">
                <TableContentTab data={dataPending} />
              </TabPane>

              <TabPane tab="Delivered" key="2">
                <TableContentTab data={dataDelivered} />
              </TabPane>

              <TabPane tab="Cancelled" key="3">
                <TableContentTab data={dataCanselled} />
              </TabPane>
            </Tabs>
          </div>
        ) : <Loading />
      }

    </>
  )
}

export default Orders
