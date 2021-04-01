// import { useState } from 'react'
import FormUser from '../Form/FormUser'
import HistoryUser from './HistoryUser'
import Loading from '../../../../../Components/Loading'
import { useSelector } from 'react-redux'
import { Desktop } from '../../../../../Components/responsive'

const EditUser = ({ match }) => {
  const isLoading = useSelector(state => state.users.loading)

  return (
    <>
      {
        isLoading === 'success'
          ? (
            <div className="edit-user">
              <div className="box-row">
                <div className="box-8 box-md-10 box-sm-12">
                  <FormUser url={match.url} />
                </div>

                <Desktop>
                  <div className="box-4">
                    <HistoryUser />
                  </div>
                </Desktop>
              </div>
            </div>
          ) : <Loading />
      }
    </>
  )
}

export default EditUser