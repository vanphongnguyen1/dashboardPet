import { message } from 'antd'

const key = 'Success!'

export const openMessage = text => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: text, key, duration: 2 });
  }, 700);
}

export const messageError = text => {
  message.error(text);
}
