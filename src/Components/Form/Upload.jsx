import React from 'react'
import PropTypes from 'prop-types'
import { ItemImage } from './ItemImage'
import { API_NAME } from '../../dataDefault'

const Upload = props => {
  const {
    data,
    onChange,
    multiple,
    nameUrl,
    handleDeleteItem,
  } = props

  return (
    <div className="box-file">
      {
        data.length
          ? data.map((item, index)  => {
            return (
              <ItemImage
                key={ index }
                item={ item }
                slider={ nameUrl }
                handleDelete={ () => handleDeleteItem(index) }
              />
            )
          })
          : ''
      }

      {
        API_NAME.SLIDER === nameUrl && data.length ? '' : (
          <>
            <input
              type="file"
              name="files"
              className="group__files"
              id="files"
              onChange={onChange}
              multiple={multiple}
            />

            <label
              htmlFor="files"
              className="group__checkbox--title label-file"
            >
              <span className="label-file__icon fas fa-plus" />
              <span className="label-file__text">
                Upload
              </span>
            </label>
          </>
        )
      }
    </div>
  )
}

Upload.propTypes = {
  data: PropTypes.array,
  multiple: PropTypes.bool,
  nameUrl:PropTypes.string,

  onChange: PropTypes.func,
  handleDeleteItem: PropTypes.func,
}

Upload.defaultProps = {
  data: [],
  multiple: false,
  nameUrl: '',

  onChange: () => {},
  handleDeleteItem: () => {},
}

export default Upload
