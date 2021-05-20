import { ValidaError } from './ValidaError'
import { Lable } from './Lable'
import PropTypes from 'prop-types'

const GroupInput = props => {
  const {
    type,
    name,
    validateName,
    value,
    onBlur,
    onChange,
    titleLabel,
    login
  } = props

  return (
    <div className="group">
      <input
        type={type}
        name={name}
        className={`
          group__input
          ${validateName
            ? 'valide-input'
            : ''
          }
          ${login ? 'input-login' : ''}
        `}
        value={ value }
        onBlur={onBlur}
        onChange={onChange}
      />

      <Lable
        text={titleLabel}
        className={`
          group__label
          ${
            value && validateName
            ? 'label-input-value valide-label'
            : value
            ? 'label-input-value'
            : validateName
            ? 'valide-label'
            : ''
          }
        `}
      />

      {
        validateName ? (
          <ValidaError
            className="group__valide"
            text={validateName}
          />
        ) : (
          <span className="pseudo-input" />
        )
      }
    </div>
  )
}

GroupInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  validateName: PropTypes.string,
  titleLabel: PropTypes.string,
  login: PropTypes.bool,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  onBlur: PropTypes.func,
  onChange: PropTypes.func
}

GroupInput.defaultProps = {
  type: '',
  name: '',
  validateName: '',
  value: '',
  titleLabel: '',
  login: false,

  onBlur: () => {},
  onChange: () => {}
}

export default GroupInput
