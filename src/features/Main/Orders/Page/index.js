import { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { Create } from '../../../../Components/Btn'
import TableContentTab from './TableContentTab'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../asyncThunk/orderSlice'
// import { customAxiosApi } from '../../../../customAxiosApi'
import sectionData from './sectionData'

const Orders = () => {
  const { TabPane } = Tabs
  const dispatch = useDispatch()
  const dataOrder = useSelector(state => state.orders.list)

  const callback = key => {
    console.log(key)
  }
  const [dataPending, dataDelivered, dataCanselled] = sectionData(dataOrder)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return (
    <>
      <div className="orders posi-relative">
        <div className="box-btn">
          <Link
            // to={`/${TITLE_MENU.USERS.toLowerCase()}/${CREAT.toLowerCase()}`}
            className="box-btn--link"
          >
            <Create />
          </Link>
        </div>

        <Tabs onChange={callback} type="card">
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
    </>
  )
}

export default Orders
