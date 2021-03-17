import { useState } from 'react'
import { ContextTasks } from './Components/Context'
import Header from './Components/Header'
import Main from './Components/Main'
import './Components/style.scss'

const App = () => {
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

export default App;
