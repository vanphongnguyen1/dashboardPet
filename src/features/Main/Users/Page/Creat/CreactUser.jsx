import FormUser from '../Form/FormUser'
import PropTypes from 'prop-types'

const CreactUser = ({ match }) => {
  return (
    <>
      <div className="edit-user">
        <div className="box-row">
          <div className="box-6 box-md-10 box-sm-12 mr-center">
            <FormUser url={match.url}/>
          </div>
        </div>
      </div>
    </>
  )
}

CreactUser.propTypes = {
  match: PropTypes.object
}

CreactUser.defaultProps = {
  match: {}
}

export default CreactUser
