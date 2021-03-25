import React from 'react'
import PropTypes from 'prop-types';

export const Input = props => {
  const {
    onChange,
    onBlur,
    value,
    className,
    name,
    type
  } = props

  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,

  onChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),

  onBlur: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
}

Input.defaultProps = {
  type: 'text',
  name: '',
  value: '',

  className: '',
  onBlur: () => {},
  onChange: {}
}
