import PropTypes from 'prop-types'

const ItemMenuProduct = ({ title }) => {
  return (
    <li className="menu-product__item">
      { title }
    </li>
  )
}

ItemMenuProduct.propTypes = {
  title: PropTypes.string
}

ItemMenuProduct.defaultProps = {
  title: ''
}

export default ItemMenuProduct
