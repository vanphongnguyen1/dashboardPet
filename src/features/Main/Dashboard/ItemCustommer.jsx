import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'
import { Link } from 'react-router-dom'
import { TITLE_MENU, EDIT } from '../../../dataDefault'

const ItemCustommer = ({ name, avarta, data }) => {
  return (
    <li className="show-customer__item">
      <Link
        className="show-customer__link"
        to={`${TITLE_MENU.USERS}/${data.id}/${EDIT.toLowerCase()}`}
      >
        <div className="show-customer__link-box">
          <Avarta name={name} avarta={avarta} />

          <div className="show-content">
            <p className="show-content__user">{name}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

ItemCustommer.propTypes = {
  name: PropTypes.string,
  avarta: PropTypes.string,
  data: PropTypes.object,
}

ItemCustommer.defaultProps = {
  name: '',
  avarta: '',
  data: {},
}

export default ItemCustommer
