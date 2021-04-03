import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsMenu } from '../rootReducers/menuAnimation'
import Avarta from './Avarta'
import PopuSubText from './PopuSubText'
import PoPoverHeader from './PoPoverHeader'
import LoadingBar from 'react-redux-loading-bar'

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

    const [scrollY,setScrollY] = useState({
      height: 0,
      status: false
    })

    // useEffect(() => {
    //   console.log(scrollY)
    // }, [scrollY])

    // window.addEventListener('scroll', () => {
    //   if (window.scrollY <= 80) {
    //     setScrollY({
    //       ...scrollY,
    //       status: false
    //     })
    //   } else if (scrollY.height <= window.scrollY) {
    //     setScrollY({
    //       ...scrollY,
    //       height: window.scrollY
    //     })
    //   } else {
    //     setScrollY({
    //       ...scrollY,
    //       status: true
    //     })
    //   }
    // })

  return (
    <>
      <LoadingBar className="loading-bar" scope="sectionBar"/>

      <div className={`header ${scrollY.status ? 'header-scroll' : ''}`}>
        <div className="header__box">
          <div className="header__sidebar" onClick={handleClickSidebar}>
            <span className="header__sidebar--icon far fa-bars"  ref={refSidebar}/>

            <span className="header__sidebar--sub-text">
              <PopuSubText title={ !stateIsMenu ? 'Open menu' : 'Close menu'}/>
            </span>
          </div>

          <div className="header__user" onClick={() => setIsPopover(true)}>
            <Avarta avarta="" name="Phong"/>

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
