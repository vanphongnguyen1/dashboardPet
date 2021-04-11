import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'
import { Link } from 'react-router-dom'
import { TITLE_MENU } from '../../../dataDefault'

const ItemComment = ({ name, avarta, comment }) => {
  return (
    <li className="show-comments__item">
      <Link
        className="show-comments__link"
        to={TITLE_MENU.COMMENTS}
      >
        <div className="show-comments__link-box">
          <Avarta avarta={avarta} name={name} />

          <div className="show-content">
            <p className="show-content__name">{name}</p>

            <p className="show-content__text">{comment}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

ItemComment.propTypes = {
  name: PropTypes.string,
  avarta: PropTypes.string,
  comment: PropTypes.string,
}

ItemComment.defaultProps = {
  name: '',
  avarta: '',
  comment: '',
}

export default ItemComment
