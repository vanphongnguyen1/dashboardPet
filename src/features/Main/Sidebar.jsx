
import { useContext } from 'react'
import { ContextTasks } from '../../Components/Context'
import { MENU } from '../../dataDefault'
import PupoSubText from '../../Components/PopuSubText'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { defaultState } from '../../features/Main/Users/userSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
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
                  onClick={ () => dispatch(defaultState()) }
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
