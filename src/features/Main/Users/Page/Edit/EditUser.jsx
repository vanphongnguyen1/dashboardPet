// import { useState } from 'react'
import FormUser from '../Form/FormUser'
import HistoryUser from './HistoryUser'
import { Desktop } from '../../../../../Components/responsive'
import PropTypes from 'prop-types'

const EditUser = ({ match }) => {
  return (
    <>
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
