import { useMemo, useState, useEffect } from 'react'
import ShowItemProduct from './ShowItemProduct'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { BtnCreatExport } from '../../../../Components/Btn'
import { CREAT } from '../../../../dataDefault'
import { Link } from 'react-router-dom'
import { removeAccents } from '../../../../Components/access/logic/removeAccent'
import { Pagination } from 'antd'

const ShowProducts = ({ id, url, dataSearch }) => {
  const initial = {
    page: 1,
    pageSize: 12,
  }

  const [paginationSize, setPaginationSize] = useState(initial)
  const [defaultDataPagination, setDefaultDataPagination] = useState([])
  const lengthDataPagination = defaultDataPagination.length

  const dataProducts = useSelector((state) => state.products.list)
  const menuLineageId = useSelector((state) => state.stateIsMenu.menuLineageID)

  const dataShowProducts = useMemo(() => {
    return dataProducts.filter((item) => item.lineage.groupID === id)
  }, [dataProducts, id])

  const filterProducts = useMemo(() => {
    setPaginationSize({
      page: 1,
      pageSize: 12,
    })
    if (menuLineageId === 0) {
      return dataShowProducts
    }

    return dataShowProducts.filter((item) => item.lineageID === menuLineageId)
  }, [dataShowProducts, menuLineageId])

  const dataPagination = useMemo(() => {
    if (filterProducts.length > paginationSize.pageSize) {
      const { page, pageSize } = paginationSize
      const defaule = page * pageSize

      const newData = filterProducts.slice(defaule - pageSize, defaule)
      setDefaultDataPagination(newData)

      return newData
    }

    return filterProducts
  }, [paginationSize, filterProducts])

  useEffect(() => {
    if (dataSearch) {
      const newData = dataShowProducts.filter(
        (item) =>
          removeAccents(item.name).indexOf(removeAccents(dataSearch)) !== -1,
      )

      setDefaultDataPagination(newData)
      return
    }

    setDefaultDataPagination(dataPagination)
  }, [dataSearch, dataPagination, dataShowProducts])

  const onChange = (page, pageSize) => {
    setPaginationSize({
      page,
      pageSize,
    })

    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="list-product">
        <div>
          {lengthDataPagination ? (
            <>
              <div className="box-row">
                {defaultDataPagination.map((product) => {
                  return (
                    <ShowItemProduct
                      idGroup={id}
                      product={product}
                      key={product.id}
                    />
                  )
                })}
              </div>

              {filterProducts.length > 12 && (
                <div className="my-pagination">
                  <Pagination
                    defaultCurrent={paginationSize.page}
                    onChange={onChange}
                    total={filterProducts.length}
                    pageSize={paginationSize.pageSize}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="box__not-products">
              <div className="box__not-products--icon fas fa-dizzy" />

              <Link
                to={`/${url}/${CREAT.toLowerCase()}`}
                className="box-btn--link"
              >
                <BtnCreatExport title="Creat Product" icon="fas fa-plus" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

ShowProducts.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  dataSearch: PropTypes.string,
}

ShowProducts.propsDefault = {
  id: 1,
  url: '',
  dataSearch: '',
}

export default ShowProducts
