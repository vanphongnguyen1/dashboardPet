import { message } from 'antd'

const key = 'Success!'

export const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Success!', key, duration: 2 });
  }, 700);
}
