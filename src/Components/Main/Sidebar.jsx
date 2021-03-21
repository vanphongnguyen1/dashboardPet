
import { useContext } from 'react'
import { ContextTasks } from '../Context'
import { MENU } from '../../dataDefault'
import PupoSubText from '../PopuSubText'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const valueContext = useContext(ContextTasks)
  const { unOutLine } = valueContext

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
                  exact
                >
                  <span className={`sidebar__link--icon ${item.icon}`} />
                  {
                    !unOutLine ? (
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
