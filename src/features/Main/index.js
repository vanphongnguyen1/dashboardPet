import { useEffect, useState } from 'react'
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
import { fetchCarts } from '../../rootReducers/cartSlice'
import { fetchProductInCart } from '../../rootReducers/productInCart'
import { fetchProductDetailOrderAll } from '../../rootReducers/productDetailOrderThunk'
import { SemipolarLoading } from 'react-loadingg'

const Main = () => {
  const dispatch = useDispatch()
  const [isStatus, setIsStatus] = useState(false)
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)
  const dataToken = useSelector(state => state.login.token)

  useEffect(() => {
    setTimeout(() => {
      setIsStatus(true)
    }, 3000)
  }, [])

  useEffect(() => {
    dispatch(fetchStatus())
    dispatch(fetchTrasport())
    dispatch(fetchCarts())
    dispatch(fetchProductInCart())
    dispatch(fetchProductDetailOrderAll())
  }, [dispatch])

  return (
    <>
      <ScrollToTop />
      {
        isStatus ? (
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
        ) : (
          <div className="owverlay">
            <SemipolarLoading />
          </div>
        )
      }
      <MyBackTop />
    </>
  )
}

export default Main
