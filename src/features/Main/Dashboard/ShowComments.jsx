import PropTypes from 'prop-types'
import ItemComment from './ItemComment'
import { Link } from 'react-router-dom'
import { TITLE_MENU } from '../../../dataDefault'

const ShowComments = ({ data }) => {
  const [...newData] = data
  const dataShow = newData.reverse().slice(0, 15)
  return (
    <>
      <div className="show-comments">
        <ul className="show-comments__list">
          {dataShow.map((item) => {
            return (
              <ItemComment
                key={item.id}
                name={item.users.name}
                comment={item.title}
                avarta={item.users.avarta}
                item={item}
              />
            )
          })}
        </ul>
        {newData.length > 15 && (
          <Link className="show-comments__all" to={TITLE_MENU.COMMENTS}>
            Show All
          </Link>
        )}
      </div>
    </>
  )
}

ShowComments.propTypes = {
  data: PropTypes.array,
}

ShowComments.defaultProps = {
  data: [],
}

export default ShowComments
