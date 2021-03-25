import PropTypes from 'prop-types';

export const Lable = ({ text, className }) => {

  return (
    <label
      htmlFor=""
      className={className}
    >
      { text }
    </label>
  )
}

Lable.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
}

Lable.defaultProps = {
  text: '',
  className: ''
}
