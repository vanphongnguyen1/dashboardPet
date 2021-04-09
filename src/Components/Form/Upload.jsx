import React from 'react'
import PropTypes from 'prop-types'

const Upload = props => {
  const {
    dataProduct,
    id,
    onChange,
    multiple,
  } = props

  return (
    <div className="box-checkbox">
      <div className="box-file">
        {
          dataProduct.length
            ? dataProduct.map((item, index)  => {
              return (
                <img
                  src={item}
                  key={index} alt=""
                  className="box-file__image"
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
    </div>
  )
}

Upload.propTypes = {
  dataProduct: PropTypes.array,
  id: PropTypes.string,
  onChange: PropTypes.func,
  multiple: PropTypes.bool
}

Upload.defaultProps = {
  dataProduct: [],
  id: '',
  onChange: () => {},
  multiple: false
}

export default Upload
