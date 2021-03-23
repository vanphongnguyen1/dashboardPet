// import { useState } from 'react'
import FormUser from './FormUser'
import HistoryUser from './HistoryUser'
import { useSelector } from 'react-redux'

const EditUser = () => {
  const data = useSelector(state => state.users.list)

  return (
    <>
      <div className="edit-user">
        <div className="box-row">
          <div className="box-8">
            <FormUser user={data} />
          </div>

          <div className="box-4">
            <HistoryUser />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser
