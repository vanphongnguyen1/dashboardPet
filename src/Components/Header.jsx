import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsMenu } from '../rootReducers/menuAnimation'
import Avarta from './Avarta'
import PopuSubText from './PopuSubText'
import PoPoverHeader from './PoPoverHeader'

const Header = () => {
  const dispatch = useDispatch()
  const refSidebar = useRef(null)
  const [isPopover, setIsPopover] = useState(false)
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)

  const handleClickSidebar = () => {
    refSidebar.current.classList.toggle('active-rotatez')
    dispatch(setIsMenu(!stateIsMenu))
  }

  const handleOnClickOverflow = e => {
    setIsPopover(false)
    e.stopPropagation()
  }

  return (
    <>
      <div className="header">
        <div className="header__box">
          <div className="header__sidebar" onClick={handleClickSidebar}>
            <span className="header__sidebar--icon far fa-bars"  ref={refSidebar}/>

            <span className="header__sidebar--sub-text">
              <PopuSubText title={ !stateIsMenu ? 'Open menu' : 'Close menu'}/>
            </span>
          </div>

          <div className="header__user" onClick={() => setIsPopover(true)}>
            <Avarta/>
            <span className="header__user--username">Phong</span>

            <PoPoverHeader isPopover={isPopover}/>

            {
              isPopover
               ? <div className="overflow-trasperent" onClick={handleOnClickOverflow}/>
               : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
