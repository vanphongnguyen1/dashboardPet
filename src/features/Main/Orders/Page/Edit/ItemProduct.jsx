import { InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { myFormatNumber } from '../../../../../Components/access/logic/myFormatNumber'

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
      <p className="table__td--name">
        { name }
      </p>

      <p className="table__td--price">
        { myFormatNumber(price) }
      </p>

      <div className="table__td--count">
        <InputNumber
          min={1}
          max={10}
          defaultValue={count}
          onChange={onChangeCount}
        />
      </div>

      <p className="table__td--totalPrice">
        { myFormatNumber(totalPrice) }
      </p>

      <p
        className="table__td--action"
        onClick={handleDelProduct}
      >
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
