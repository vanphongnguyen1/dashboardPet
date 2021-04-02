import Sidebar from './Sidebar'
import ScrollToTop from '../../Components/ScrollToTop'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { routes } from '../../routers'

const Main = () => {
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)

  return (
    <Router>
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
    </Router>
  )
}

export default Main
