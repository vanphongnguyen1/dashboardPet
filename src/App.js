// import WebDashboard from './Components/index'
import {Counter } from './features/counter/Counter'
import store from './app/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Counter />
        {/* <WebDashboard /> */}
      </Provider>
    </>
  )
}

export default App;
