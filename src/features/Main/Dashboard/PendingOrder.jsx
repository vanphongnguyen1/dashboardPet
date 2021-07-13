import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { sectionData } from '../Orders/Page/sectionData'
import ItemOrderPending from './ItemOrderPending'

const PendingOrder = ({ data }) => {
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder)
  const dataCarts = useSelector(state => state.carts)

  const newData = useMemo(() => {
    if (dataCarts.loading === 'success' && dataProductDetailOrder.loading === 'success') {
      const [dataPendding] = sectionData(data, dataProductDetailOrder.list, dataCarts.list)

      if (!Array.isArray(dataPendding)) {
        return [dataPendding]
      }

      console.log(dataPendding);

      return dataPendding
    }
  }, [data, dataProductDetailOrder, dataCarts])

  return (
    <>
      <div className="pending-order">
        <h2 className="pending-order__heading">
          Pending Orders
        </h2>

        <ul className="pending-order__list">
          {
            newData &&
            newData.map(item => {
              return (
                <ItemOrderPending data={item} key={item.id} />
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

PendingOrder.propTypes = {
  data: PropTypes.array,
}

PendingOrder.defaultProps = {
  data: []
}

export default PendingOrder
