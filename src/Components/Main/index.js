import { useContext } from 'react'
import Sidebar from './Sidebar'
// import Dashboard from './Dashboard/index'
// import Users from './Users'
import EditUser from './Users/EditUser'
import { ContextTasks } from '../Context'

const Main = () => {
  const valueContext = useContext(ContextTasks)
  const { unOutLine } = valueContext

  return (
    <div className="main">
      <div className={!unOutLine ?"main__width--sidebar-big" : 'main__width--sidebar-smell'}>
        <Sidebar />
      </div>

      <div className={!unOutLine ? "main__width--dashboard-smell" : 'main__width--dashboard-big'}>
        {/* <Dashboard /> */}
        {/* <Users /> */}
        <EditUser />
      </div>
    </div>
  )
}

export default Main
