
import { useSelector } from 'react-redux'
import { MENU } from '../../dataDefault'
import PupoSubText from '../../Components/PopuSubText'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { defaultState as defaultStateUsers} from '../../rootReducers/userSlice'
import { defaultState as defaultStateOrders} from '../../rootReducers/orderSlice'
import { defaultState as defaultStateTrasport} from '../../rootReducers/trasportSlice'
import { defaultState as defaultStateStatus} from '../../rootReducers/statusSlice'
import { defaultState as defaultStateProductDetailOrder} from '../../rootReducers/productDetailOrderThunk'
import { defaultState as defaultStateComments} from '../../rootReducers/commentSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const stateIsMenu = useSelector(state => state.stateIsMenu.isMenu)

  const handleOnClickNav = () => {
    dispatch(defaultStateUsers())
    dispatch(defaultStateOrders())
    dispatch(defaultStateTrasport())
    dispatch(defaultStateStatus())
    dispatch(defaultStateProductDetailOrder())
    dispatch(defaultStateComments())
  }

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
                  onClick={handleOnClickNav}
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
