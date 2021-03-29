import { useContext } from 'react'
import Sidebar from './Sidebar'
import ScrollToTop from '../../Components/ScrollToTop'
import { ContextTasks } from '../../Components/Context'
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Redirect
} from "react-router-dom"
// import { routes } from '../../routers'

// import Orders from './Orders/Page'
import EditOrder from './Orders/Page/Edit/EditOrder'

const Main = () => {
  const valueContext = useContext(ContextTasks)
  const { unOutLine } = valueContext

  return (
    <Router>
      <ScrollToTop />

      <div className="main">
        <div className={!unOutLine ?"main__width--sidebar-big" : 'main__width--sidebar-smell'}>
          <Sidebar />
        </div>

        <div className={!unOutLine ? "main__width--dashboard-smell" : 'main__width--dashboard-big'}>
          {/* <Switch>
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
          </Switch> */}
          {/* <Orders /> */}
          <EditOrder />
        </div>
      </div>
    </Router>
  )
}

export default Main
