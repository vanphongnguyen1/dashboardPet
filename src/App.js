import { useState } from 'react'
import { ContextTasks } from './Components/Context'
import Header from './Components/Header'
import Main from './Components/Main'
// import Dashboard from './Components/Main/Dashboard'
import 'antd/dist/antd.css'
import './Components/style.scss'
// import { Admin, Resource, ListGuesser } from 'react-admin';
// import dataProvider fro./Components/Main/Users/dataProviderdex'

const App = () => {
  const [unOutLine, setUnOutLine] = useState(true)

  return (
    <>
      <ContextTasks.Provider value={{unOutLine, setUnOutLine}}>
        <Header />
        <Main />
      </ContextTasks.Provider>
      {/* <Admin dataProvider={dataProvider}>
        <Resource name="Dashboard" list={Dashboard} />
        <Resource name="users" list={ListGuesser} />
        <Resource name="products" list={ListGuesser} />
      </Admin> */}

    </>
  )
}

export default App;
