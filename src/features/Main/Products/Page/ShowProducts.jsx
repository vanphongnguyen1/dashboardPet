import { useMemo } from 'react'
import ShowItemProduct from './ShowItemProduct'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { BtnCreatExport } from '../../../../Components/Btn'
import { CREAT } from '../../../../dataDefault'
import { Link } from 'react-router-dom'

const ShowProducts = ({ id, url }) => {
  const dataProducts = useSelector(state => state.products.list)
  const menuLineageId = useSelector(state => state.stateIsMenu.menuLineageID)

  const dataShowProducts = useMemo(() => {
    return dataProducts.filter(item => item.lineage.groupID === id)
  }, [dataProducts, id])

  const filterProducts = useMemo(() => {
    if (menuLineageId === 0) {
      return dataShowProducts
    }

    return dataShowProducts.filter(item => item.lineageID === menuLineageId)
  }, [dataShowProducts, menuLineageId])

  return (
    <>
      <div className="list-product">
        <div className="box-row">
          {
            filterProducts.length
              ? filterProducts.map(product => {
                return <ShowItemProduct
                  idGroup={id}
                  product={product}
                  key={product.id}
                />
              })
              : (
                <div className="box__not-products">
                  <Link
                    to={`/${url}/${CREAT.toLowerCase()}`}
                    className="box-btn--link"
                  >
                    <BtnCreatExport
                      title="Creat Product"
                      icon="fas fa-plus"
                    />
                  </Link>
                </div>
              )
          }
        </div>
      </div>
    </>
  )
}

ShowProducts.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
}

ShowProducts.propsDefault = {
  id: 1,
  url: ''
}

export default ShowProducts
