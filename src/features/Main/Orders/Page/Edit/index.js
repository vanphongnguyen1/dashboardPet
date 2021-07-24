import { useEffect } from 'react'
import EditOrderContent from './EditOrderContent'
import { useHistory } from 'react-router-dom'

const EditOrder = () => {
  const history = useHistory()
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin) {
      history.replace('/')
    }
  }, [idLogin, history])

  return (
    <>
      <EditOrderContent />
    </>
  )
}

export default EditOrder
