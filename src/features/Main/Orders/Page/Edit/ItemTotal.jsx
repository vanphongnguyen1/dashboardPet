import PropTypes from 'prop-types'

const ItemTotal = ({ name, value}) => {
  return (
    <div className="table__tr">
      <p className="table__td--name">{ name }</p>
      <p className="table__td--price">{ value }</p>
    </div>
  )
}

ItemTotal.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
}

ItemTotal.defaultProps = {
  name: '',
  value: ''
}

export default ItemTotal
