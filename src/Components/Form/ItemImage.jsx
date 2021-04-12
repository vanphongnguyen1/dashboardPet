import PropTypes from 'prop-types'

export const ItemImage = ({ item, alt, handleView, handleDelete }) => {
  return (
    <div className="product-item">
      <img
        src={ item }
        alt={ alt }
        className="product-item__image"
      />

      <div className="product-item__icon">
        <span
          className="product-item__icon--eye far fa-eye"
          onClick={ handleView }
        />
        <span
          className="product-item__icon--delete far fa-trash"
          onClick={ handleDelete }
        />
      </div>
    </div>
  )
}

ItemImage.propTypes = {
  item: PropTypes.string,
  alt: PropTypes.string,

  handleDelete: PropTypes.func,
  handleView: PropTypes.func,
}

ItemImage.defaultProps = {
  item: '',
  alt: '',

  handleDelete: () => {},
  handleView: () => {},
}
