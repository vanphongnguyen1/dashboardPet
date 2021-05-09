import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { customAxiosApi } from '../../../../customAxiosApi'
import { API_NAME, EDIT } from '../../../../dataDefault'
import { openMessage, messageError } from '../../../../Components/openMessage'
import { fetchProducts } from '../../../../rootReducers/productsSlice'

const ShowItemProduct = ({ product }) => {
  const dispatch = useDispatch()
  const urlImage = product.images.url.split('|')

  const formatNumber = number => (
    new Intl.NumberFormat(
      'de-DE',
      { style: 'currency', currency: 'vnd' }
    ).format(number)
  )

  const handleDeleteProduct = () => {
    customAxiosApi.delete(`${API_NAME.PRODUCTS}/${product.id}`)
    .then( async () => {
      customAxiosApi.delete(`${API_NAME.IMAGES}/${product.imagesID}`)
      customAxiosApi.delete(`${API_NAME.IMAGES}/${product.typeProductID}`)

      openMessage('Delete Product Success !')

      await dispatch(fetchProducts())
    })
    .catch(rej => {
      messageError(rej.message)
    })
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
            { formatNumber(product.priceSale) }
          </span>

          <span className="product__info--price">
            { formatNumber(product.price) }
          </span>
        </div>

        <div className="product__btn">
          <div
            className="product__btn-box box-delte"
            onClick={handleDeleteProduct}
          >
            <span className="product__btn--icon fas fa-trash" />
            <span className="product__btn--text">Delete</span>
          </div>

          <Link
            to={`${API_NAME.PRODUCTS}/${product.id}/${EDIT}`}
            className="product__btn-box"
          >
              <span className="product__btn--icon fas fa-edit" />
              <span className="product__btn--text">Edit</span>
          </Link>
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
