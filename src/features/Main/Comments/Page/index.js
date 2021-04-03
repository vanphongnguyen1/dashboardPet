import { Tabs } from 'antd'
import { BtnCreatExport } from '../../../../Components/Btn'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import TableContentTab from './TableContentTab'
import { sectionData } from './sectionData'

const Comments = ({ match }) => {
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
        <div className="box-btn--link">
          <BtnCreatExport
            icon="fas fa-arrow-alt-to-bottom"
            title="Export"
          />
        </div>
      </div>

      <Tabs type="card">
        <TabPane tab="Pending" key="1">
          <TableContentTab data={dataPending} />
        </TabPane>

        <TabPane tab="Accepted" key="2">
          <TableContentTab data={dataAccepted} />
        </TabPane>

        <TabPane tab="Rejected" key="3">
          <TableContentTab data={dataRejected} />
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
