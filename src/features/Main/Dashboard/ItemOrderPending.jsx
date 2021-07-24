import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'
import { Link } from 'react-router-dom'
import { TITLE_MENU, EDIT } from '../../../dataDefault'
import { dateTime } from '../../../Components/myMonment'
import { myFormatNumber } from '../../../Components/access/logic/myFormatNumber'

const ItemOrderPending = ({ data }) => {
  return (
    <li className="pending-order__item">
      <Link
        className="pending-order__link"
        to={`${TITLE_MENU.ORDERS}/${data.id}/${EDIT}`}
      >
        <div className="info-order">
          <div className="info-order__user">
            <Avarta avarta={data.avarta} name={data.name} />

            <div className="info-order__detail">
              <span className="info-order__detail--date">
                {dateTime(data.created)}
              </span>

              <span className="info-order__detail--customer">
                {data.name}, mua {data.products.length} sản phẩm
              </span>
            </div>
          </div>

          <div className="info-order__meny">
            {myFormatNumber(data.intoMeny)}
          </div>
        </div>
      </Link>
    </li>
  )
}

ItemOrderPending.propTypes = {
  data: PropTypes.object,
}

ItemOrderPending.defaultProps = {
  data: {},
}

export default ItemOrderPending
