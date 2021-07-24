import { date } from '../../../../../Components/myMonment'
import ItemHistory from './ItemHistory'
import { HeadingBox } from '../../../../../Components/HeadingBox'
import PropTypes from 'prop-types'

const HistoryUser = ({ data, lengthOrderUser }) => {
  return (
    <div className="history">
      <HeadingBox title="History" />

      <div className="box-row">
        <div className="box-6">
          <ItemHistory
            icon="far fa-clock"
            title="First seen"
            date={date(data.created_at)}
          />
        </div>

        <div className="box-6">
          <ItemHistory
            icon="far fa-clock"
            title="Last seen"
            date={date(data.updated_at)}
          />
        </div>

        <div className="box-12">
          <ItemHistory
            icon="far fa-dollar-sign"
            title="orders"
            lengthItem={lengthOrderUser}
          />
        </div>
      </div>
    </div>
  )
}

HistoryUser.propTypes = {
  data: PropTypes.object,
  lengthOrderUser: PropTypes.number,
}

HistoryUser.defaultProps = {
  data: {},
  lengthOrderUser: 0,
}

export default HistoryUser
