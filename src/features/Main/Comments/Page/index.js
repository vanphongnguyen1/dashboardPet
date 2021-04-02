import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { Create } from '../../../../Components/Btn'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import TableContentTab from './TableContentTab'
import { sectionData } from './sectionData'

const Comments = ({ match }) => {
  const url = match.url.slice(1)
  const { TabPane } = Tabs
  const dataComment = useSelector(state => state.comments)

  const [
    dataPending,
    dataAccepted,
    dataRejected
  ] = sectionData(dataComment.list)

  return (
    <div className="posi-relative">
      <div className="box-btn">
        <Link
          to={`/${url}`}
          className="box-btn--link"
        >
          <Create />
        </Link>
      </div>

      <Tabs type="card">
        <TabPane tab="Pending" key="1">
          <TableContentTab data={dataPending} url={url} />
        </TabPane>

        <TabPane tab="Accepted" key="2">
          <TableContentTab data={dataAccepted} url={url} />
        </TabPane>

        <TabPane tab="Rejected" key="3">
          <TableContentTab data={dataRejected} url={url} />
        </TabPane>
      </Tabs>
    </div>
  )
}

Comments.propTypes = {
  match: PropTypes.object
}

Comments.defaultProps = {
  match: {}
}

export default Comments
