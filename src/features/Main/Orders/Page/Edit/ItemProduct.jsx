import { InputNumber } from 'antd'
import PropTypes from 'prop-types'

const ItemProduct = (props) => {
  const {
    name,
    price,
    count,
    totalPrice,
    onChangeCount,
    handleDelProduct
  } = props

  return (
    <div className="table__tr">
      <p className="table__td--name">{name}</p>

      <p className="table__td--price">{price}</p>

      <div className="table__td--count">
        <InputNumber
          min={1}
          max={10}
          defaultValue={count}
          onChange={onChangeCount}
        />
      </div>

      <p className="table__td--totalPrice">{totalPrice}</p>

      <p className="table__td--action" onClick={handleDelProduct}>
        Delete
      </p>
    </div>
  )
}

ItemProduct.propsTypes = {
  price: PropTypes.number,
  count: PropTypes.number,
  totalPrice: PropTypes.number,

  name: PropTypes.string,
  onChangeCount: PropTypes.func,
  handleDelProduct: PropTypes.func,
}

ItemProduct.defaultProps = {
  price: 0,
  count: 0,
  totalPrice: 0,

  name: '',
  onChangeCount: () => {},
  handleDelProduct: () => {}
}

export default ItemProduct
