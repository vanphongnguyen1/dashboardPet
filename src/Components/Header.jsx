import { useContext, useRef } from 'react'
import Avarta from './Avarta'
import { ContextTasks } from './Context'
import PopuSubText from './PopuSubText'

const Header = () => {
  const refSidebar = useRef(null)
  const valueContext = useContext(ContextTasks)
  const { unOutLine, setUnOutLine } = valueContext

  const handleClickSidebar = () => {
    refSidebar.current.classList.toggle('active-rotatez')
    setUnOutLine(!unOutLine)
  }

  return (
    <>
      <div className="header">
        <div className="header__box">
          <div className="header__sidebar" onClick={handleClickSidebar}>
            <span className="header__sidebar--icon far fa-bars"  ref={refSidebar}/>

            <span className="header__sidebar--sub-text">
              <PopuSubText title={ !unOutLine ? 'Open menu' : 'Close menu'}/>
            </span>
          </div>
          <div className="header__user">
            <Avarta/>
            <span className="header__user--username">Phong</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
