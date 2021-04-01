import PropTypes from 'prop-types'
import { Lable } from './Lable'

export const Textarea = props => {
  const {
    name,
    title,
    onChange,
    value
  } = props
  return (
    <div className="group">
      <textarea
        name={name}
        className="group__input"
        value={value}
        onChange={onChange}
        rows="13"
      >
      </textarea>

      <Lable
        text={title}
        className='group__label label-input-value'
      />

      <span className="pseudo-input" />
    </div>
  )
}

Textarea.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

Textarea.defaultProps = {
  name: '',
  title: '',
  onChange: () => {},
  value: ''
}
