import moment from 'moment'
import PropTypes from 'prop-types'

export const date = date => {
  return moment(date).format('DD-MM-YYYY')
}

export const dateTime = date => {
  return moment(date).format('DD-MM-YYYY, LTS')
}

date.propTypes = {
  date: PropTypes.string
}
date.propTypes = {
  date: ''
}

dateTime.propTypes = {
  date: PropTypes.string
}
dateTime.propTypes = {
  date: ''
}
