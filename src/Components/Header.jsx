import { useRef, useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsMenu } from '../rootReducers/menuAnimation'
import Avarta from './Avarta'
import PopuSubText from './PopuSubText'
import PoPoverHeader from './PoPoverHeader'
import LoadingBar from 'react-redux-loading-bar'
import { useThrottledCallback } from 'use-debounce'
import { setIsNavberScroll } from '../rootReducers/navbarScrolled'
import { fetchUser } from '../rootReducers/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  const refSidebar = useRef(null)
  const [isPopover, setIsPopover] = useState(false)
  const [dataUser, setDataUser] = useState({})

  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)
  const isNavbarScroll = useSelector(state => state.navbarScrolled)
  const dataToken = useSelector(state => state.login.token)
  const idLogin = sessionStorage.getItem('id')

  const myThrottled = useThrottledCallback(() => {
    handleScrolled(window.scrollY)
  }, 250)

  const handleScrolled = scrollY => {
    if (isPopover) {
      setIsPopover(false)
    }

    if (!scrollY) {
      dispatch(setIsNavberScroll({
        max: scrollY,
        status: false
      }))

      return
    }

    if (scrollY >= isNavbarScroll.max) {
      dispatch(setIsNavberScroll({
        max: scrollY,
        status: true
      }))

    } else {
      dispatch(setIsNavberScroll({
        max: scrollY,
        status: false
      }))
    }
  }

  useMemo(() => {
    if (idLogin || dataToken) {
      dispatch(fetchUser(idLogin || dataToken))
      .then (data => {
        const { payload } = data
        setDataUser(payload)
      })
    }
  }, [idLogin, dispatch, dataToken])

  useEffect(() => {
    window.addEventListener('scroll', myThrottled)
  }, [myThrottled])

  const handleClickSidebar = () => {
    refSidebar.current.classList.toggle('active-rotatez')
    dispatch(setIsMenu(!stateIsMenu))
  }

  const handleOnClickOverflow = e => {
    e.stopPropagation()
    setIsPopover(false)
  }

  return (
    <>
      <LoadingBar className="loading-bar" scope="sectionBar"/>

      <div className={`header ${isNavbarScroll.status ? 'header-scroll' : ''}`}>
        <div className="header__box">
          <div
            className="header__sidebar"
            onClick={handleClickSidebar}
          >
            <span
              className="header__sidebar--icon far fa-bars"
              ref={refSidebar}
            />

            <span className="header__sidebar--sub-text">
              <PopuSubText title={ stateIsMenu ? 'Open menu' : 'Close menu'}/>
            </span>
          </div>

          <div
            className="header__user"
            onClick={() => setIsPopover(true)}
          >
            <Avarta avarta={dataUser.avarta} name={dataUser.name}/>

            <span className="header__user--username">
              {dataUser.name}
            </span>

            <PoPoverHeader
              isPopover={isPopover}
              handleClosePopover={handleOnClickOverflow}
            />

            {
              isPopover
               ? <div
                  className="overflow-trasperent"
                  onClick={handleOnClickOverflow}
                />
               : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
