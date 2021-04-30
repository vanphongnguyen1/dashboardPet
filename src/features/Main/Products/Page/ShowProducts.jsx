import { useMemo } from 'react'
import ShowItemProduct from './ShowItemProduct'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const ShowProducts = ({ id }) => {
  const dataProducts = useSelector(state => state.products.list)

  const dataShowProducts = useMemo(() => {
    return dataProducts.filter(item => item.lineage.groupID === id)
  }, [dataProducts, id])

  return (
    <>
      <div className="list-product">
        <div className="box-row">
          {
            dataShowProducts.length
              ? dataShowProducts.map(product => {
                return <ShowItemProduct
                  idGroup={id}
                  product={product}
                  key={product.id}
                />
              })
              : ''
          }
        </div>
      </div>
    </>
  )
}

ShowProducts.propTypes = {
  id: PropTypes.number
}

ShowProducts.propsDefault = {
  id: 1
}

export default ShowProducts
