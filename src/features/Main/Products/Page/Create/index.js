import PropTypes from 'prop-types'
import CreateForm from './CreateForm'

const CreateProduct = ({ match }) => {
  const { url } = match

  return (
    <div>
      <CreateForm url={url} />
    </div>
  )
}

CreateProduct.propTypes = {
  match: PropTypes.object
}

export default CreateProduct
