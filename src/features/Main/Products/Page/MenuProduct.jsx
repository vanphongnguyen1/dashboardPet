import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ItemMenuProduct from './ItemMenuProduct'

const MenuProduct = ({ id }) => {
  const dataLineage = useSelector(state => state.lineage.list)

  const newDataLine = useMemo(() => {
    return dataLineage.filter(item => item.groupID === id)
  }, [dataLineage, id])

  return (
    <>
      <div className="menu-product">
        <ul className="menu-product__list">
          {
            newDataLine.map(item => (
              <ItemMenuProduct
                title={ item.name }
                key={ item.id }
              />
            ))
          }
        </ul>
      </div>
    </>
  )
}

MenuProduct.propTypes = {
  id: PropTypes.number
}

MenuProduct.defaultProps = {
  id: 1
}

export default MenuProduct
