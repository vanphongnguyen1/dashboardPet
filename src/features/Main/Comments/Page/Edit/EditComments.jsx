import { useState, useEffect } from 'react'
import { HeadingBox } from '../../../../../Components/HeadingBox'
import { Selector } from '../../../../../Components/Form/Selector'
import { Textarea } from '../../../../../Components/Form/Textarea'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import { date } from '../../../../../Components/myMonment'
import { customAxiosApi } from '../../../../../customAxiosApi'
import PropTypes from 'prop-types'
import { openMessage } from '../../../../../Components/openMessage'
import { fetchComments } from '../../../../../rootReducers/commentSlice'
import BoxInfo from './BoxInfo'
import { API_NAME } from '../../../../../dataDefault'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const EditComments = ({ isEditComments, handleCloseEdit }) => {
  const initial = {
    statusCommentsID: '',
    title: ''
  }

  const dispatch = useDispatch()
  const dataStatus = useSelector(state => state.statusComments.list)
  const dataEdit = useSelector(state => state.comments.comment)
  const [newData, setNewData] = useState(initial)

  useEffect(() => {
    setNewData({
      statusCommentsID: dataEdit.statusCommentsID ,
      title: dataEdit.title
    })
  }, [dataEdit])

  const handleOnChange = e => {
    const { name, value } = e.target

    setNewData({
      ...newData,
      [name]: value
    })
  }

  const handleSave = async () => {
    dispatch(showLoading('sectionBar'))

    customAxiosApi.put(`${API_NAME.COMMENTS}/${dataEdit.id}`, newData)

    openMessage('Edit Success !')

    await setTimeout(() => {
      dispatch(fetchComments())
      dispatch(hideLoading('sectionBar'))
    }, 500)
  }

  const handleDelete = async () => {
    dispatch(showLoading('sectionBar'))

    customAxiosApi.delete(`${API_NAME.COMMENTS}/${dataEdit.id}`)

    openMessage('Delete Success !')

    await setTimeout(() => {
      dispatch(fetchComments())
      handleCloseEdit()
      dispatch(hideLoading('sectionBar'))
    }, 500)
  }

  return (
    <>
      <div className={`
        edit-comments
        ${isEditComments ? 'translateZero' : ''}
      `}>
        <div className="box-row">
          <HeadingBox title="Comments Detail" />

          <span
            className="close-icon far fa-times"
            onClick={handleCloseEdit}
          />
        </div>

        <div className="edit-comments__box">
          <div className="box-row">
            <div className="box-6">
              <BoxInfo title="Custommer" info={dataEdit.userName} />

              <BoxInfo title="Date" info={date(dataEdit.updated)} />
            </div>

            <div className="box-6">
              <BoxInfo title="Product" info={dataEdit.nameProduct} />

              <div className="box-info">
                <Selector
                  title="Status"
                  name="statusCommentsID"
                  onChange={handleOnChange}
                  value={newData.statusCommentsID}
                  options={dataStatus}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="edit-comments__box">
          <Textarea
            title='Comments'
            name="title"
            value={newData.title}
            onChange={handleOnChange}
          />
        </div>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save" onClick={handleSave}>
              <Save />
            </div >

            <div className="box-submit__delete" onClick={handleDelete}>
              <Delete/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

EditComments.propTypes = {
  isEditComments: PropTypes.bool,
  handleCloseEdit: PropTypes.func
}

EditComments.defaultProps = {
  isEditComments: false,
  handleCloseEdit: () => {}
}

export default EditComments
