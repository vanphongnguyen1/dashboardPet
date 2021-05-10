import PropTypes from 'prop-types'
import BoxForm from './BoxForm'

const CreateProduct = ({ match }) => {
  const { url } = match

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
