import { Lable } from './Lable'
import PropTypes from 'prop-types'

export const Selector = props => {
  const {
    name,
    title,
    onChange,
    value,
    options,
    disabled
  } = props
  return (
    <div className="group">
      <select
        name={name}
        className="group__select"
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {
          options.length > 0
            ? options.map(item => {
              return (
                <option
                  value={item.id}
                  key={item.id}
                  >
                    { item.name }
                </option>
              )
            })
            : ''
        }
      </select>

      <Lable
        text={title}
        className='group__label label-input-value'
      />
    </div>
  )
}

Selector.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.array,
  disabled: PropTypes.bool
}

Selector.defaultProps = {
  name: '',
  title: '',
  onChange: () => {},
  value: '',
  options: [],
  disabled: false
}
