import { useState, useEffect } from 'react'
import FormUser from '../Form/FormUser'
import HistoryUser from './HistoryUser'
import { Desktop } from '../../../../../Components/responsive'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUser } from '../../../../../rootReducers/userSlice'

const EditUser = ({ match }) => {
  const dispatch = useDispatch()
  const { id } =  useParams()

  const [state, setState] = useState({})

  useEffect (() => {
    if (id) {
      dispatch(fetchUser(id))
      .then(data => setState(data.payload))
    }
  }, [dispatch, id])

  return (
    <>
      <div className="edit-user">
        <div className="box-row">
          <div className="box-8 box-md-10 box-sm-12">
            <FormUser url={match.url} data={state} />
          </div>

          <Desktop>
            <div className="box-4">
              <HistoryUser data={state} />
            </div>
          </Desktop>
        </div>
      </div>
    </>
  )
}

EditUser.propTypes = {
  match: PropTypes.object
}

EditUser.defaultProps = {
  match: {}
}

export default EditUser
