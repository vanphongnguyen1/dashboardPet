import { useEffect } from 'react'
import PropTypes from 'prop-types'
import BoxForm from './BoxForm'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CreateProduct = ({ match }) => {
  const { url } = match
  const history = useHistory()

  const dataToken = useSelector(state => state.login.token)

  useEffect(() => {
    if (!dataToken) {
      history.replace("/")
    }
  }, [dataToken, history])

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
