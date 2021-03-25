import { useState } from 'react'
import { ContextTasks } from './Context'
import Header from './Header'
import Main from '../features/Main/index'
import 'antd/dist/antd.css'
import './style.scss'

const WebDashboard = () => {
  const [unOutLine, setUnOutLine] = useState(true)

  return (
    <>
      <ContextTasks.Provider value={{unOutLine, setUnOutLine}}>
        <Header />
        <Main />
      </ContextTasks.Provider>
    </>
  )
}

export default WebDashboard;
