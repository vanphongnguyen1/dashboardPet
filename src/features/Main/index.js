import { useEffect } from 'react'
import Sidebar from './Sidebar'
import ScrollToTop from '../../Components/ScrollToTop'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { routes } from '../../routers'
import { fetchOrders } from '../../rootReducers/orderSlice'
import { fetchUsers } from '../../rootReducers/userSlice'
import { fetchComments } from '../../rootReducers/commentSlice'
import { fetchProductDetailOrder } from '../../rootReducers/productDetailOrderThunk'
import { fetchStatus } from '../../rootReducers/statusSlice'
import { fetchTrasport } from '../../rootReducers/trasportSlice'
import { fetchStatusComments } from '../../rootReducers/statusCommentsSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const Main = () => {
  const dispatch = useDispatch()
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)
  const isHideLoading = useSelector(state => state.statusComments.loading)

  useEffect(() => {
    dispatch(showLoading('sectionBar'))

    dispatch(fetchOrders())
    dispatch(fetchUsers())
    dispatch(fetchComments())
    dispatch(fetchProductDetailOrder())
    dispatch(fetchStatus())
    dispatch(fetchTrasport())
    dispatch(fetchStatusComments())
  }, [dispatch])

  useEffect(() => {
    if (isHideLoading === 'success') {
      dispatch(hideLoading('sectionBar'))
    }
  }, [isHideLoading, dispatch])

  return (
    <>
      <ScrollToTop />
      <div className="main">
        <div
          className={
            !stateIsMenu
              ? "main__width--sidebar-big"
              : 'main__width--sidebar-smell'
          }
        >
          <Sidebar />
        </div>

        <div
          className={
            !stateIsMenu
              ? "main__width--dashboard-smell"
              : 'main__width--dashboard-big'
          }
        >
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            {
              routes.map((item, index) => {
                return <Route
                  path={item.path}
                  exact={item.exact}
                  component={item.main}
                  key={index}
                />
              })
            }
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Main
