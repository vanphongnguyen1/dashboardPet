import { useSelector } from 'react-redux'
import { MENU } from '../../dataDefault'
import PupoSubText from '../../Components/PopuSubText'
import { NavLink, useHistory } from 'react-router-dom'
import { deleteTokenLogOut } from '../../rootReducers/loginSlice'
import { useDispatch } from 'react-redux'

const Sidebar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const stateIsMenu = useSelector((state) => state.stateIsMenu.isMenu)

  const handleLogOut = () => {
    dispatch(deleteTokenLogOut(false))
    sessionStorage.removeItem('id')
    history.replace('/')
  }

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {MENU.map((item, index) => {
          return (
            <li className="sidebar__item" key={index}>
              <NavLink
                to={`/${item.title.toLowerCase()}`}
                activeClassName="active-nav"
                className="sidebar__link"
              >
                <span className={`sidebar__link--icon ${item.icon}`} />
                {!stateIsMenu ? (
                  <span className="sidebar__link--title">{item.title}</span>
                ) : (
                  <span className="sidebar__link--sub-text">
                    <PupoSubText title={item.title} />
                  </span>
                )}
              </NavLink>
            </li>
          )
        })}

        <li className="sidebar__item" onClick={handleLogOut}>
          <div className="sidebar__link">
            <span className="sidebar__link--icon fas fa-sign-out-alt" />
            {!stateIsMenu ? (
              <span className="sidebar__link--title">logout</span>
            ) : (
              <span className="sidebar__link--sub-text">
                <PupoSubText title="logout" />
              </span>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
