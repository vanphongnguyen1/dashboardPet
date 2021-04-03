import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'

const ItemComment = ({ name, avarta, comment }) => {
  return (
    <li className="show-comments__item">
      <div className="show-comments__link">
        <div className="show-comments__link-box">
          <Avarta avarta={avarta} name={name} />

          <div className="show-content">
            <p className="show-content__name">{name}</p>

            <p className="show-content__text">{comment}</p>
          </div>
        </div>
      </div>
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
