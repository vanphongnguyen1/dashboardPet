import { Tabs } from 'antd'
import { BtnCreatExport } from '../../../../Components/Btn'
import TableContentTab from './TableContentTab'
import { useSelector } from 'react-redux'
import { sectionData } from './sectionData'
import PropTypes from 'prop-types'

const Orders = ({ match }) => {
  const url = match.url.slice(1)
  const { TabPane } = Tabs

  const dataOrder = useSelector(state => state.orders.list)
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder.list)

  const [
    dataPending,
    dataDelivered,
    dataCanselled
  ] = sectionData(dataOrder, dataProductDetailOrder)

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
