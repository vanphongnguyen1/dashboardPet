import { useState, useEffect } from 'react'
import FormUser from '../Form/FormUser'
import HistoryUser from './HistoryUser'
import { Desktop } from '../../../../../Components/responsive'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUser } from '../../../../../rootReducers/userSlice'
import { fetchOrderFollowUser } from '../../../../../rootReducers/orderSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const EditUser = ({ match }) => {
  const dispatch = useDispatch()
  const { id } =  useParams()

  const [state, setState] = useState({})
  const [lengthOrderUser, setLengthOrderUser] = useState(0)

  useEffect (() => {
    if (id) {
      dispatch(showLoading('sectionBar'))
      dispatch(fetchUser(id))
      .then(data => setState(data.payload))

      dispatch(fetchOrderFollowUser(id))
      .then(data => {
        const lengthOrder = data.payload.length
        setLengthOrderUser(lengthOrder)
      })

      setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 1000)
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
              <HistoryUser data={state} lengthOrderUser={lengthOrderUser} />
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
