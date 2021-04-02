import { useSelector } from 'react-redux'
import moment from 'moment'
import ItemHistory from './ItemHistory'
import { HeadingBox } from '../../../../../Components/HeadingBox'

const HistoryUser = () => {
  const user = useSelector(state => state.users.user)

  const textDateCreated = moment(user.created_at).format("DD-MM-YYYY")
  const textDateUpdated =  moment(user.updated_at).format("DD-MM-YYYY")

  return (
    <div className="history">
      <HeadingBox title="History" />

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
