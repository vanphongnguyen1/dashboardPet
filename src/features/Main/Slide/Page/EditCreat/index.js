import { useEffect } from 'react'
import Form from '../Form'
import { useHistory } from 'react-router-dom'

const EditCreat = ({ match }) => {
  const { url } = match
  const history = useHistory()
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin) {
      history.replace("/")
    }
  }, [idLogin, history])

  return (
    <>
      <div className="from-product box-7">
        <Form url={url} />
      </div>
    </>
  )
}

export default EditCreat
