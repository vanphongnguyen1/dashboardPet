import PropTypes from 'prop-types'

export const Lable = ({ text, className, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {text}
    </label>
  )
}

Lable.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
}

Lable.defaultProps = {
  text: '',
  className: '',
  htmlFor: '',
}
