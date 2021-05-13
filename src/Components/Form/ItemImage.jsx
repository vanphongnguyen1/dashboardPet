import { useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import { API_NAME } from '../../dataDefault'

export const ItemImage = ({ item, handleDelete, slider }) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const indexAlt = item.lastIndexOf('/')
  const alt = item.slice(indexAlt + 1)

  return (
    <div className="product-item">
      <img
        src={item}
        alt={alt}
        className={
          API_NAME.SLIDER === slider
          ? 'product-item__image-slider'
          : 'product-item__image'
        }
      />

      <div className="product-item__icon">
        <span
          className="product-item__icon--eye far fa-eye"
          onClick={ () => setPreviewVisible(true) }
        />
        <span
          className="product-item__icon--delete far fa-trash"
          onClick={ handleDelete }
        />
      </div>

      <Modal
        visible={previewVisible}
        title={null}
        footer={null}
        style={{'object-fit': 'cover', 'object-position': 'center'}}
        width={API_NAME.SLIDER === slider ? '70%' : '520px'}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt={alt}
          className="modal-image"
          src={item}
        />
      </Modal>
    </div>
  )
}

ItemImage.propTypes = {
  item: PropTypes.string,
  slider: PropTypes.string,

  handleDelete: PropTypes.func,
  handleView: PropTypes.func,
}

ItemImage.defaultProps = {
  item: '',
  slider: '',

  handleDelete: () => {},
  handleView: () => {},
}
