import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { sectionData } from '../Orders/Page/sectionData'
import ItemOrderPending from './ItemOrderPending'
import { Link } from 'react-router-dom'
import { TITLE_MENU } from '../../../dataDefault'

const PendingOrder = ({ data }) => {
  const dataProductDetailOrder = useSelector(state => state.productDetailOrder)
  const dataCarts = useSelector(state => state.carts)
  const [dataOrderShow, setDataOrderShow] = useState([])

  useEffect(() => {
    if (dataCarts.loading === 'success' && dataProductDetailOrder.loading === 'success') {
      const [dataPendding] = sectionData(data, dataProductDetailOrder.list, dataCarts.list)

      if (!Array.isArray(dataPendding)) {
        setDataOrderShow([dataPendding])
      }
      setDataOrderShow(dataPendding)
    }
  }, [data, dataProductDetailOrder, dataCarts])

  // if (newData) {
    dataOrderShow.sort((a, b) => -a.id + b.id)
    const dataShow = dataOrderShow.slice(0, 5)

  // }

  return (
    <>
      <div className="pending-order">
        <h2 className="pending-order__heading">
          Pending Orders
        </h2>

        <ul className="pending-order__list">
          {
            dataOrderShow &&
            dataShow.map(item => {
              return (
                <ItemOrderPending data={item} key={item.id} />
              )
            })
          }
        </ul>

        {
           dataOrderShow.length > 5 && (
            <Link className="show-comments__all" to={TITLE_MENU.ORDERS}>
              Show All
            </Link>
          )
        }
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
