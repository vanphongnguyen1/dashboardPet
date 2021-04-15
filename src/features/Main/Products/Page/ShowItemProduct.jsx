import React from 'react'
import img from '../../../../Components/access/upload/2-1-510x576.jpg'

const ShowItemProduct = () => {
  return (
    <div className="box-4">
      <div className="product-box">
        <img src={img} alt="aa" className="product__image"/>

        <div className="product__sale">
          <span className="product__sale--text">20%</span>
        </div>

        <div className="product__info">
          <p className="product__info--name">Mew mew</p>
          <span className="product__info--price-sale">10000</span>
          <span className="product__info--price">10000</span>
        </div>

        <div className="product__btn">
          <div className="product__btn-box">
            <span className="product__btn--icon fas fa-images" />
            <span className="product__btn--text">Product</span>
          </div>

          <div className="product__btn-box">
            <span className="product__btn--icon fas fa-edit" />
            <span className="product__btn--text">Edit</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowItemProduct
