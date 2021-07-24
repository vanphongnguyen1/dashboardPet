import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { setMenuLineageID } from '../../../../rootReducers/menuAnimation'
import { useDispatch, useSelector } from 'react-redux'

const MenuProduct = ({ id }) => {
  const dispatch = useDispatch()
  const dataLineage = useSelector((state) => state.lineage.list)
  const menuLineageId = useSelector((state) => state.stateIsMenu.menuLineageID)

  const newDataLine = useMemo(() => {
    return dataLineage.filter((item) => item.groupID === id)
  }, [dataLineage, id])

  const handFetchDataLineage = (id) => {
    dispatch(setMenuLineageID(id))
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="menu-product">
        <ul className="menu-product__list">
          <li
            className={`
              menu-product__item
              ${menuLineageId === 0 ? 'active-lineage' : ''}
            `}
            onClick={() => handFetchDataLineage(0)}
          >
            Show All
          </li>

          {newDataLine.map((item) => (
            <li
              key={item.id}
              className={`
                  menu-product__item
                  ${menuLineageId === item.id ? 'active-lineage' : ''}
                `}
              onClick={() => handFetchDataLineage(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

MenuProduct.propTypes = {
  id: PropTypes.number,
}

MenuProduct.defaultProps = {
  id: 1,
}

export default MenuProduct
