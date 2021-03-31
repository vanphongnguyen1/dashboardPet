import { ValidaError } from './ValidaError'
import { Lable } from './Lable'

const GroupInput = props => {
  const {
    type,
    name,
    validateName,
    value,
    onBlur,
    onChange,
    titleLabel
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

export default GroupInput
