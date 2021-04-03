import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { TITLE_MENU, EDIT } from '../../../dataDefault'
import { setOrder } from '../../../rootReducers/orderSlice'
import { dateTime } from '../../../Components/myMonment'

const ItemOrderPending = ({ data }) => {
  const dispatch = useDispatch()

  return (
    <li className="pending-order__item" onClick={() => dispatch(setOrder(data))}>
      <Link
        className="pending-order__link"
        to={`${TITLE_MENU.ORDERS}/${EDIT}`}
      >
        <div className="info-order">
          <div className="info-order__user">
            <Avarta avarta={data.avarta} name={data.name}/>

            <div className="info-order__detail">
              <span className="info-order__detail--date">
                { dateTime(data.created) }
              </span>

              <span className="info-order__detail--customer">
                { data.name }, mua { data.products.length } sản phẩm
              </span>
            </div>
          </div>

          <div className="info-order__meny">{ data.intoMeny }</div>
        </div>
      </Link>
    </li>
  )
}

ItemOrderPending.propTypes = {
  data: PropTypes.object
}

ItemOrderPending.defaultProps = {
  data: {}
}

export default ItemOrderPending
