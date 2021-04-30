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
import { fetchStatus } from '../../rootReducers/statusSlice'
import { fetchTrasport } from '../../rootReducers/trasportSlice'
import { fetchStatusComments } from '../../rootReducers/statusCommentsSlice'

const Main = () => {
  const dispatch = useDispatch()
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)

  useEffect(() => {
    dispatch(fetchStatus())
    dispatch(fetchTrasport())
    dispatch(fetchStatusComments())
  }, [dispatch])

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
