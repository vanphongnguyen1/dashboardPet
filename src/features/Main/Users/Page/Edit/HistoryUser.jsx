import { useSelector } from 'react-redux'
import { date } from '../../../../../Components/myMonment'
import ItemHistory from './ItemHistory'
import { HeadingBox } from '../../../../../Components/HeadingBox'

const HistoryUser = () => {
  const user = useSelector(state => state.users.user)

  return (
    <div className="history">
      <HeadingBox title="History" />

      <div className="box-row">
        <div className="box-6">
          <ItemHistory
            icon='far fa-clock'
            title='First seen'
            date={date(user.created_at)}
          />
        </div>

        <div className="box-6">
          <ItemHistory
            icon='far fa-clock'
            title='Last seen'
            date={date(user.updated_at)}
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
