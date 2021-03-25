// import { useState } from 'react'
import FormUser from '../Form/FormUser'
import HistoryUser from './HistoryUser'
import Loading from '../../../../../Components/Loading'
import { useSelector } from 'react-redux'

const EditUser = ({ match }) => {
  const isLoading = useSelector(state => state.users.loading)

  return (
    <>
      {
        isLoading === 'success'
          ? (
            <div className="edit-user">
              <div className="box-row">
                <div className="box-8">
                  <FormUser url={match.url} />
                </div>

                <div className="box-4">
                  <HistoryUser />
                </div>
              </div>
            </div>
          ) : <Loading />
      }
    </>
  )
}

export default EditUser
