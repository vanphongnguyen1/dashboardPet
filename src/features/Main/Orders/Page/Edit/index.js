import { useEffect } from 'react'
import EditOrderContent from './EditOrderContent'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const EditOrder = () => {
  const history = useHistory()
  const dataToken = useSelector(state => state.login.token)

  useEffect(() => {
    if (!dataToken) {
      history.replace("/")
    }
  }, [dataToken, history])

  return (
    <>
      <EditOrderContent/>
    </>
  )
}

export default EditOrder
