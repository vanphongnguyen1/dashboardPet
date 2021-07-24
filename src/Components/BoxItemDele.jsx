import { Delete } from './Btn'
import PropTypes from 'prop-types'

const BoxItemDele = (props) => {
  const { items, onClick } = props

  return (
    <div
      className={items.length > 0 ? 'box-delete translateY-ux' : 'box-delete'}
    >
      <div className="box-delete__title">
        <span className="box-delete__title--text">
          {items.length} Items selected
        </span>
      </div>

      <div className="box-delete__item" onClick={onClick}>
        <Delete />
      </div>
    </div>
  )
}

BoxItemDele.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
}

BoxItemDele.defaultProps = {
  items: [],
  onClick: () => {},
}

export default BoxItemDele
