import PropTypes from 'prop-types'
import { setMenuLineageID } from '../../../../rootReducers/menuAnimation'
import { useDispatch, useSelector } from 'react-redux'

const ItemMenuProduct = ({ title, id }) => {
  const dispatch = useDispatch()
  const menuLineageId = useSelector(state => state.stateIsMenu.menuLineageID)

  return (
    <li
      className={`
        menu-product__item
        ${ menuLineageId === id ? 'active-lineage' : '' }
      `}
      onClick={() => dispatch(setMenuLineageID(id)) }
    >
      { title }
    </li>
  )
}

ItemMenuProduct.propTypes = {
  title: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

ItemMenuProduct.defaultProps = {
  title: '',
  id: 0
}

export default ItemMenuProduct
