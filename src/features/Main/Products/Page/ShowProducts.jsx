import { useMemo, useState } from 'react'
import ShowItemProduct from './ShowItemProduct'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { BtnCreatExport } from '../../../../Components/Btn'
import { CREAT } from '../../../../dataDefault'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'

const ShowProducts = ({ id, url }) => {
  const initial = {
    page: 1,
    pageSize: 12
  }

  const [paginationSize, setPaginationSize] = useState(initial)
  const [defaultDataPagination , setDefaultDataPagination ] = useState([])

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

  useMemo(() => {
    const { page, pageSize } = paginationSize
    const defaule = page * pageSize

    const newData = filterProducts.slice(defaule - pageSize, defaule)
    setDefaultDataPagination(newData)
  }, [paginationSize, filterProducts])

  const onChange = (page, pageSize) => {
    setPaginationSize({
      page,
      pageSize
    })
  }

  return (
    <>
      <div className="list-product">
        <div>
          {
            defaultDataPagination.length
              ? (
                <>
                  <div className="box-row">
                    {
                      defaultDataPagination.map(product => {
                        return <ShowItemProduct
                          idGroup={id}
                          product={product}
                          key={product.id}
                        />
                      })
                    }
                  </div>

                  <div className="my-pagination">
                    <Pagination
                      defaultCurrent={1}
                      onChange={onChange}
                      total={filterProducts.length}
                      pageSize={paginationSize.pageSize}
                    />
                  </div>
              </>
              )
              : (
                <div className="box__not-products">
                  <div className="box__not-products--icon fas fa-dizzy"/>

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
