import { Spin } from 'antd'

const Loading = () => {
  return (
    <div className="loading">
      <Spin tip="Loading..." />
    </div>
  )
}

export default Loading
