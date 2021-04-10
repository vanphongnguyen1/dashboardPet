import { useSelector } from 'react-redux'
import { MENU } from '../../dataDefault'
import PupoSubText from '../../Components/PopuSubText'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)

  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        {
          MENU.map((item, index) => {
            return (
              <li className="sidebar__item" key={index}>
                <NavLink
                  to={`/${item.title.toLowerCase()}`}
                  activeClassName="active-nav"
                  className="sidebar__link"
                >
                  <span className={`sidebar__link--icon ${item.icon}`} />
                  {
                    !stateIsMenu ? (
                      <span className="sidebar__link--title">
                        { item.title }
                      </span>
                    ): (
                      <span className="sidebar__link--sub-text">
                        <PupoSubText title={ item.title }/>
                      </span>
                    )
                  }
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar
