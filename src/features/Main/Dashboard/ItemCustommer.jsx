import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { TITLE_MENU, EDIT} from '../../../dataDefault'
import { setUser } from '../../../rootReducers/userSlice'

const ItemCustommer = ({ name, avarta, data }) => {
  const dispatch = useDispatch()

  return (
    <li
      className="show-customer__item"
      onClick={() => dispatch(setUser(data))}
    >
      <Link
        className="show-customer__link"
        to={`${TITLE_MENU.USERS}/${EDIT.toLowerCase()}`}
      >
        <div className="show-customer__link-box">
          <Avarta name={name} avarta={avarta}/>

          <div className="show-content">
            <p className="show-content__user">
              { name }
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

ItemCustommer.propTypes = {
  name: PropTypes.string,
  avarta: PropTypes.string,
  data: PropTypes.object
}

ItemCustommer.defaultProps = {
  name: '',
  avarta: '',
  data: {}
}

export default ItemCustommer
