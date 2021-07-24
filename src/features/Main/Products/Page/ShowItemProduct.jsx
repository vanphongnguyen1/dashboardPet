import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { customAxiosApi } from '../../../../customAxiosApi'
import { API_NAME, EDIT } from '../../../../dataDefault'
import { openMessage, messageError } from '../../../../Components/openMessage'
import { fetchProducts } from '../../../../rootReducers/productsSlice'
import { myFormatNumber } from '../../../../Components/access/logic/myFormatNumber'

const ShowItemProduct = ({ product }) => {
  const {
    id,
    imagesID,
    typeProductID,
    images,
    name,
    priceSale,
    price,
  } = product

  const salse = Number.parseInt(((price - priceSale) / price) * 100)

  const dispatch = useDispatch()
  const urlImage = images.url.split('|')

  const handleDeleteProduct = () => {
    customAxiosApi
      .delete(`${API_NAME.PRODUCTS}/${id}`)
      .then(async () => {
        customAxiosApi.delete(`${API_NAME.IMAGES}/${imagesID}`)
        customAxiosApi.delete(`${API_NAME.IMAGES}/${typeProductID}`)

        openMessage('Delete Product Success !')
        await dispatch(fetchProducts())
      })
      .catch((rej) => {
        messageError(rej.message)
      })
  }

  return (
    <div className="box-3">
      <div className="product-box">
        <img src={urlImage[0]} alt={name} className="product__image" />

        {salse > 0 && (
          <div className="product__sale">
            <span className="product__sale--text">{salse + '%'}</span>
          </div>
        )}

        <div className="product__info">
          <p className="product__info--name" title={name}>
            {name}
          </p>

          <span className="product__info--price-sale">
            {myFormatNumber(priceSale)}
          </span>

          {priceSale < price && (
            <span className="product__info--price">
              {myFormatNumber(price)}
            </span>
          )}
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
            to={`${API_NAME.PRODUCTS}/${id}/${EDIT}`}
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
  product: PropTypes.object,
}

ShowItemProduct.propsDefault = {
  product: {},
}

export default ShowItemProduct
