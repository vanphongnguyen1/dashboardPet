import PropTypes from 'prop-types'
import Avarta from '../../../Components/Avarta'
import { Link } from 'react-router-dom'
import { TITLE_MENU } from '../../../dataDefault'
import { setDataComment } from '../../../rootReducers/commentSlice'
import { useDispatch } from 'react-redux'

// created: "2021-04-10T05:53:53.000000Z"
// id: 1
// nameProduct: "dog1"
// productsID: 1
// statusComments: "pending"
// statusCommentsID: 1
// title: "aaaaaaaaaaaaaaaaaa"
// updated: "2021-04-10T05:53:53.000000Z"
// userName: "phong12"
// usersID: 9

const ItemComment = ({ item }) => {
  const dispatch = useDispatch()
  const {
    id,
    products,
    status_comments,
    title,
    created_at,
    updated_at,
    users,
  } = item

  const newDataEdit = {
    id,
    nameProduct: products.name,
    productsID: products.id,
    statusComments: status_comments.name,
    statusCommentsID: status_comments.id,
    title,
    created: created_at,
    updated: updated_at,
    userName: users.name,
    usersID: users.id,
  }

  return (
    <li className="show-comments__item">
      <Link
        className="show-comments__link"
        onClick={() => dispatch(setDataComment(newDataEdit))}
        to={TITLE_MENU.COMMENTS}
      >
        <div className="show-comments__link-box">
          <Avarta avarta={users.avarta} name={users.name} />

          <div className="show-content">
            <p className="show-content__name">{users.name}</p>

            <p className="show-content__text">{title}</p>
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
