import WebDashboard from './Components/index'
import store from './app/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <WebDashboard />
      </Provider>
    </>
  )
}

export default App
