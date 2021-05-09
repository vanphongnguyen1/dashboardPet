import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { sectionData } from '../Orders/Page/sectionData'
import ItemOrderPending from './ItemOrderPending'

const PendingOrder = ({ data }) => {
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder.list)

  const newData = useMemo(() => {
    const [dataPendding] = sectionData(data, dataProductDetailOrder)

    if (!Array.isArray(dataPendding)) {
      return [dataPendding]
    }

    return dataPendding
  }, [data, dataProductDetailOrder])

  return (
    <>
      <div className="pending-order">
        <h2 className="pending-order__heading">
          Pending Orders
        </h2>

        <ul className="pending-order__list">
          {
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
