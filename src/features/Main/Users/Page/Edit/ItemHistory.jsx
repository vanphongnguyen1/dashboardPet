import React from 'react'
import PropTypes from 'prop-types'

const ItemHistory = ({ icon, title, date, lengthItem }) => {

  return (
    <span className="history__box">
      <span className={`history__box--icon ${icon}`} />
      <span className="history__box-text">
        <span className="history__box-text--text">
          {
            lengthItem ? `${lengthItem} ${title}` : title
          }
        </span>

        {
          date ? (
            <span className="history__box-text--date">
              { date }
            </span>
          ) : ''
        }
      </span>
    </span>
  )
}

ItemHistory.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  lengthItem: PropTypes.number
}

ItemHistory.defaultProps = {
  icon: '',
  title: '',
  date: '',
  lengthItem: 0
}

export default ItemHistory
