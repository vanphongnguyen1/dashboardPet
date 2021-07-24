import PropTypes from 'prop-types'
import { myFormatNumber } from '../../../../../Components/access/logic/myFormatNumber'

const ItemTotal = ({ name, value }) => {
  return (
    <div className="table__tr">
      <p className="table__td--name">{name}</p>
      <p className="table__td--price">
        {typeof value === 'number' && value.toString().length >= 3
          ? myFormatNumber(value)
          : value}
      </p>
    </div>
  )
}

ItemTotal.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

ItemTotal.defaultProps = {
  name: '',
  value: '',
}

export default ItemTotal
