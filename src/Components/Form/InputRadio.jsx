import PropTypes from 'prop-types'
import { Lable } from './Lable'

const InputRadio = props => {
  const {
    name,
    id,
    onChange,
    checked,
    value,
    lable
  } = props

  return (
    <div className="box-radio">
      <input
        type="radio"
        name={name}
        className="group__radio"
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />

      <Lable
        htmlFor={id}
        text={lable}
        className="group__radio--title"
      />
    </div>
  )
}

InputRadio.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  lable: PropTypes.string,

  onChange: PropTypes.func,
  checked: PropTypes.bool,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

InputRadio.defaultProps = {
  name: '',
  id: '',
  lable: '',
  onChange: () => {},
  checked: false,
  value: ''
}

export default InputRadio
