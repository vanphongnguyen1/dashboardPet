import Header from './Header'
import Main from '../features/Main/index'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import './style.scss'

const WebDashboard = () => {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  )
}

export default WebDashboard
