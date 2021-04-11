import React from 'react'
import PropTypes from 'prop-types'
import { ItemImage } from './ItemImage'

const Upload = props => {
  const {
    dataProduct,
    id,
    onChange,
    multiple,
    handleDeleteItem,
    handleViewImage,
  } = props

  return (
    <div className="box-file">
      {
        dataProduct.length
          ? dataProduct.map(item  => {
            return (
              <ItemImage
                key={ item.id }
                item={ item }
                alt=""
                handleDelete={ () => handleDeleteItem(item.id) }
                handleView={ handleViewImage }
              />
            )
          })
          : ''
      }

      <input
        type="file"
        name="files"
        className="group__files"
        id={id}
        onChange={onChange}
        multiple={multiple}
      />

      <label
        htmlFor={id}
        className="group__checkbox--title label-file"
      >
        <span className="label-file__icon fas fa-plus" />
        <span className="label-file__text">
          Upload
        </span>
      </label>
    </div>
  )
}

Upload.propTypes = {
  dataProduct: PropTypes.array,
  id: PropTypes.string,
  multiple: PropTypes.bool,

  onChange: PropTypes.func,
  handleViewImage: PropTypes.func,
  handleDeleteItem: PropTypes.func,
}

Upload.defaultProps = {
  dataProduct: [],
  id: '',
  multiple: false,

  onChange: () => {},
  handleDeleteItem: () => {},
  handleViewImage: () => {},

}

export default Upload
