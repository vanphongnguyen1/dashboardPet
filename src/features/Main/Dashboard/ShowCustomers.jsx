import ItemCustommer from './ItemCustommer'
import { Link } from 'react-router-dom'
import { TITLE_MENU } from '../../../dataDefault'
import PropTypes from 'prop-types'

const ShowCustomers = ({ data }) => {
  return (
    <>
      <div className="show-customer">
        <ul className="show-customer__list">
          {
            data.map(item => {
              return (
                <ItemCustommer
                  name={item.name}
                  avarta={item.avarta}
                  key={item.id}
                  data={item}
                />
              )
            })
          }
        </ul>

        <Link className="show-comments__all" to={TITLE_MENU.USERS}>
          Show All
        </Link>
      </div>
    </>
  )
}

ShowCustomers.propTypes = {
  data: PropTypes.array
}

ShowCustomers.defaultProps = {
  data: []
}

export default ShowCustomers
