// import { useState } from 'react'
import FormUser from '../Form/FormUser'
// import HistoryUser from './HistoryUser'

const CreactUser = ({ match }) => {

  return (
    <>
      <div className="edit-user">
        <div className="box-row">
          <div className="box-6 box-md-10 box-sm-12">
            <FormUser url={match.url}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreactUser
