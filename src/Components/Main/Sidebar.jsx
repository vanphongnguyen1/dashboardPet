
import { useContext } from 'react'
import { ContextTasks } from '../Context'
import { MENU } from '../../dataDefault'
import PupoSubText from '../PopuSubText'

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
                <a href="#a" className="sidebar__link">
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
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar
