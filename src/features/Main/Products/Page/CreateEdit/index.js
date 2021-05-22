import { useEffect } from 'react'
import PropTypes from 'prop-types'
import BoxForm from './BoxForm'
import { useHistory } from 'react-router-dom'

const CreateProduct = ({ match }) => {
  const { url } = match
  const history = useHistory()

  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin) {
      history.replace("/")
    }
  }, [idLogin, history])

  return (
    <div>
      <BoxForm url={url} />
    </div>
  )
}

CreateProduct.propTypes = {
  match: PropTypes.object
}

export default CreateProduct
