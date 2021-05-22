import { useEffect } from 'react'
import { Tabs } from 'antd'
import { BtnCreatExport } from '../../../../Components/Btn'
import { useDispatch, useSelector } from 'react-redux'
import TableContentTab from './TableContentTab'
import { sectionData } from './sectionData'
import { fetchComments } from '../../../../rootReducers/commentSlice'
import { fetchStatusComments } from '../../../../rootReducers/statusCommentsSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { STATUS_FETCH } from '../../../../dataDefault'
import { useHistory } from 'react-router-dom'

const Comments = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { TabPane } = Tabs

  const dataComment = useSelector(state => state.comments)
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (!idLogin) {
      history.replace("/")
    }
  }, [history, idLogin])

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchStatusComments())
    dispatch(fetchComments())
  }, [dispatch])

  useEffect(() => {
    if (dataComment.loading === STATUS_FETCH.SUCCESS) {
      setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 500)
    }
  }, [dispatch, dataComment.loading])

  const [
    dataPending,
    dataAccepted,
    dataRejected
  ] = sectionData(dataComment.list)

  return (
    <div className="posi-relative comments">
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

export default Comments
