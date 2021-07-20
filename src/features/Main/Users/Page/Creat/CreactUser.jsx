import { useEffect } from 'react'
import FormUser from '../Form/FormUser'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const CreactUser = ({ match }) => {
  const history = useHistory()

  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin) {
      history.replace("/")
    }
  }, [idLogin, history])

  return (
    <>
      <div className="edit-user">
        <div className="box-row">
          <div className="box-8 box-md-10 box-sm-12 mr-center">
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
