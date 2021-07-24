import { message } from 'antd'
import PropTypes from 'prop-types'

const key = 'Success!'

export const openMessage = (text) => {
  message.loading({ content: 'Loading...', key })
  setTimeout(() => {
    message.success({ content: text, key, duration: 2 })
  }, 700)
}

export const messageError = (text) => {
  message.error(text)
}

openMessage.propTypes = {
  text: PropTypes.string,
}
openMessage.defaultProps = {
  text: '',
}

messageError.propTypes = {
  text: PropTypes.string,
}
messageError.defaultProps = {
  text: '',
}
