import { useEffect } from 'react'
import Form from '../Form'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const EditCreat = ({ match }) => {
  const { url } = match
  const history = useHistory()
  const dataToken = useSelector(state => state.login.token)

  useEffect(() => {
    if (!dataToken) {
      history.replace("/")
    }
  }, [dataToken, history])

  return (
    <>
      <div className="from-product box-7">
        <Form url={url} />
      </div>
    </>
  )
}

export default EditCreat
