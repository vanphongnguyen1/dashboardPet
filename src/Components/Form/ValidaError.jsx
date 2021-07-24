import PropTypes from 'prop-types'

export const ValidaError = ({ className, text }) => {
  return <span className={className}>{text}</span>
}

ValidaError.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
}

ValidaError.defaultProps = {
  className: '',
  text: '',
}
