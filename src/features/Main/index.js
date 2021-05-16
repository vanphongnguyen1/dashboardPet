import { useEffect } from 'react'
import Sidebar from './Sidebar'
import ScrollToTop from '../../Components/ScrollToTop'
import MyBackTop from '../../Components/MyBackTop'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { routes } from '../../routers'
import { fetchStatus } from '../../rootReducers/statusSlice'
import { fetchTrasport } from '../../rootReducers/trasportSlice'

const Main = () => {
  const dispatch = useDispatch()
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)
  const dataToken = useSelector(state => state.login.token)

  useEffect(() => {
    dispatch(fetchStatus())
    dispatch(fetchTrasport())
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
            { dataToken
              ? <Redirect exact from="/" to="/dashboard" />
              : <Redirect exact from="/" to="/login" />
            }

            {/* <Redirect exact from="/" to="/login" /> */}

            {
              routes.map((item, index) => {
                return <Route
                  path={item.path}
                  exact={item.exact}
                  component={item.main}
                  // render={() => {
                  //   return dataToken ? item.main : <Redirect exact to="/" />
                  // }}
                  key={index}
                />
              })
            }
          </Switch>
        </div>
      </div>

      <MyBackTop />
    </>
  )
}

export default Main
