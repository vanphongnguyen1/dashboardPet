// import { useState } from 'react'
import FormUser from './FormUser'
import HistoryUser from './HistoryUser'

const EditUser = () => {

  return (
    <>
      <div className="edit-user">
        <div className="box-row">
          <div className="box-8">
            <FormUser />
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
