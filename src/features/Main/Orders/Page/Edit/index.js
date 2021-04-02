import EditOrderContent from './EditOrderContent'
import PropTypes from 'prop-types'

const EditOrder = ({ match }) => {
  return (
    <>
      <EditOrderContent url={match.url}/>
    </>
  )
}

EditOrder.propTypes = {
  match: PropTypes.object
}
EditOrder.defaultProps = {
  match: {}
}

export default EditOrder
