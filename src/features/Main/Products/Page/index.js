import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import MenuProduct from './MenuProduct'
import { BtnCreatExport } from '../../../../Components/Btn'
import GroupInput from '../../../../Components/Form/GroupInput'
import { CREAT, STATUS_FETCH } from '../../../../dataDefault'
import { Link, useHistory } from 'react-router-dom'
import { fetchLineage } from '../../../../rootReducers/lineageSlice'
import { fetchProducts } from '../../../../rootReducers/productsSlice'
import { fetchGroup } from '../../../../rootReducers/groupSlice'
import { setMenuLineageID } from '../../../../rootReducers/menuAnimation'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import ShowProducts from './ShowProducts'

const Products = ({ match }) => {
  const url = match.url.slice(1)
  const dispatch = useDispatch()
  const { TabPane } = Tabs
  const history = useHistory()
  const [dataSearch, setDataSearch] = useState('')

  const dataGroup = useSelector(state => state.groups.list)
  const dataProducts = useSelector(state => state.products.loading)
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin) {
      history.replace("/")
    }
  }, [history, idLogin])

  useEffect (() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchGroup())
    dispatch(fetchLineage())
    dispatch(fetchProducts())
  }, [dispatch])

  // const data = "<li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>, <li>aaaaa</li>"
  // const newData = data.split(',')
  /* { newData.map(item => {
        return <div className="editor" dangerouslySetInnerHTML={{__html:item}}/>
      })} */

  useEffect (() => {
    if (dataProducts === STATUS_FETCH.SUCCESS) {

      setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 500)
    }
  }, [dispatch, dataProducts])

  const handleChangeTabs = () => {
    dispatch(setMenuLineageID(0))
  }

  const handleOnChange = e => {
    e.preventDefault()
    const { value } = e.target

    setDataSearch(value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className="product">
      <div className="box-search-product">
        <form className="group-search" onSubmit={handleOnSubmit}>
          <GroupInput
            titleLabel="Search name product"
            type="text"
            name="search"
            value={dataSearch}
            onChange={handleOnChange}
          />

          <span
            className="group-search__icon fas fa-search"
            onClick={handleOnSubmit}
          />
        </form>

        <Link
          to={`/${url}/${CREAT.toLowerCase()}`}
          className="box-btn--link"
        >
          <BtnCreatExport icon="fas fa-plus" title="Create"/>
        </Link>
      </div>

      <Tabs type="card" onChange={handleChangeTabs} >
        {
          dataGroup.length
            ? dataGroup.map(item => (
                <TabPane tab={item.name.toUpperCase()} key={item.id}>
                  <div className="box-products">
                    <div className="box-row">
                      <div className="box-3">
                        <MenuProduct id={item.id} />
                      </div>

                      <div className="box-9">
                        <ShowProducts
                          id={item.id}
                          url={url}
                          dataSearch={dataSearch}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
              ))
            : ''
        }
      </Tabs>
    </div>
  )
}

export default Products
