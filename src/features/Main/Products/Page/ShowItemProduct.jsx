import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setProduct } from '../../../../rootReducers/productsSlice'
import { Link } from 'react-router-dom'

const ShowItemProduct = ({ product, idGroup }) => {
  const dispatch = useDispatch()
  const urlImage = product.images.url.split('|')

  const handleEdit = () => {
    dispatch(setProduct({
      ...product,
      groupID: idGroup
    }))
  }

  return (
    <div className="box-3">
      <div className="product-box">
        <img
          src={ urlImage[0] }
          alt={ product.name }
          className="product__image"
        />


        <div className="product__sale">
          <span className="product__sale--text">20%</span>
        </div>

        <div className="product__info">
          <p
            className="product__info--name"
            title={product.name}
          >
            { product.name }
          </p>

          <span className="product__info--price-sale">
            { product.priceSale }
          </span>

          <span className="product__info--price">
            { product.price }
          </span>
        </div>

        <div className="product__btn">
          <div className="product__btn-box">
            <span className="product__btn--icon fas fa-images" />
            <span className="product__btn--text">Product</span>
          </div>

          <div className="product__btn-box">
            <span className="product__btn--icon fas fa-edit" />
            <Link
              to="products/edit"
              className="product__btn--text"
              onClick={handleEdit}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ShowItemProduct.propTypes = {
  product: PropTypes.object
}

ShowItemProduct.propsDefault = {
  product: {}
}

export default ShowItemProduct
