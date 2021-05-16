import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import MenuProduct from './MenuProduct'
import { BtnCreatExport } from '../../../../Components/Btn'
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

  const dataToken = useSelector(state => state.login.token)

  useEffect(() => {
    if (!dataToken) {
      history.replace("/")
    }
  }, [dataToken, history])

  useEffect (() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchGroup())
    dispatch(fetchLineage())
    dispatch(fetchProducts())
  }, [dispatch])

  const dataGroup = useSelector(state => state.groups.list)
  const dataProducts = useSelector(state => state.products.loading)

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

  return (
    <div className="product">
      <div className="box-btn">
        <Link
          to={`/${url}/${CREAT.toLowerCase()}`}
          className="box-btn--link"
        >
          <BtnCreatExport icon="fas fa-plus" title="Create"/>
        </Link>

        <div className="box-btn--link">
          <BtnCreatExport
            icon="fas fa-arrow-alt-to-bottom"
            title="Export"
          />
        </div>
      </div>

      <Tabs type="card" onChange={handleChangeTabs} >
        {
          dataGroup.length
            ? dataGroup.map(item => (
                <TabPane tab={ item.name.toUpperCase() } key={ item.id }>
                  <div className="box-products">
                    <div className="box-row">
                      <div className="box-3">
                        <MenuProduct id={ item.id } />
                      </div>

                      <div className="box-9">
                        <ShowProducts id={ item.id } url={url} />
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
