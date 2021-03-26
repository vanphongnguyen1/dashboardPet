import ItemHistory from './ItemHistory'
import { useSelector } from 'react-redux'
import moment from 'moment'

const HistoryUser = () => {
  const user = useSelector(state => state.users.list)
  const userCreated = moment.utc(user.created_at).local()._d
  const userUpdated = moment.utc(user.updated_at).local()._d

  const textDateCreated = moment(userCreated).format("DD-MM-YYYY")
  const textDateUpdated =  moment(userUpdated).format("DD-MM-YYYY")

  return (
    <div className="history">
      <p className="history__title">
        History
      </p>

      <div className="box-row">
        <div className="box-6">
          <ItemHistory
            icon='far fa-clock'
            title='First seen'
            date={textDateCreated}
          />
        </div>

        <div className="box-6">
          <ItemHistory
            icon='far fa-clock'
            title='Last seen'
            date={textDateUpdated}
          />
        </div>

        <div className="box-12">
          <ItemHistory
            icon='far fa-dollar-sign'
            title='orders'
            lengthItem={3}
          />
        </div>
      </div>
    </div>
  )
}

export default HistoryUser
