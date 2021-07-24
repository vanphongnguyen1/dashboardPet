import { Lable } from './Lable'
import { ValidaError } from './ValidaError'
import PropTypes from 'prop-types'

export const Selector = (props) => {
  const {
    name,
    title,
    onChange,
    value,
    options,
    disabled,
    validateName,
  } = props
  return (
    <div className="group">
      <select
        name={name}
        className={`group__select ${disabled ? 'disabled' : ''}`}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {name === 'lineageID' ? <option>Select...</option> : ''}

        {options.length > 0
          ? options.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              )
            })
          : ''}
      </select>

      <Lable text={title} className="group__label label-input-value" />

      {validateName ? (
        <ValidaError className="group__valide" text={validateName} />
      ) : (
        <span className="pseudo-input" />
      )}
    </div>
  )
}

Selector.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  validateName: PropTypes.string,

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  onChange: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
}

Selector.defaultProps = {
  name: '',
  title: '',
  validateName: '',
  value: '',

  onChange: () => {},
  options: [],
  disabled: false,
}
