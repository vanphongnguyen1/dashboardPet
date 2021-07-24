import { useState, useEffect } from 'react'
import { HeadingBox } from '../../../../../Components/HeadingBox'
import { Selector } from '../../../../../Components/Form/Selector'
import { Textarea } from '../../../../../Components/Form/Textarea'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import { date } from '../../../../../Components/myMonment'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { openMessage } from '../../../../../Components/openMessage'
import { fetchComments } from '../../../../../rootReducers/commentSlice'
import { defaultDataComment } from '../../../../../rootReducers/commentSlice'
import BoxInfo from './BoxInfo'
import { API_NAME } from '../../../../../dataDefault'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const EditComments = () => {
  const initial = {
    statusCommentsID: '',
    title: '',
  }

  const dispatch = useDispatch()
  const dataStatus = useSelector((state) => state.statusComments.list)
  const dataEdit = useSelector((state) => state.comments.dataEdit)
  const { comment, isEdit } = dataEdit
  const [newData, setNewData] = useState(initial)

  useEffect(() => {
    setNewData({
      statusCommentsID: comment.statusCommentsID,
      title: comment.title,
    })
  }, [comment])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setNewData({
      ...newData,
      [name]: value,
    })
  }

  const handleSave = async () => {
    dispatch(showLoading('sectionBar'))

    await customAxiosApi.put(`${API_NAME.COMMENTS}/${comment.id}`, newData)

    openMessage('Edit Success !')

    await dispatch(fetchComments())
    await dispatch(defaultDataComment())
    await dispatch(hideLoading('sectionBar'))
  }

  const handleDelete = async () => {
    dispatch(showLoading('sectionBar'))

    await customAxiosApi.delete(`${API_NAME.COMMENTS}/${comment.id}`)

    openMessage('Delete Success !')

    await dispatch(fetchComments())
    await dispatch(defaultDataComment())
    await dispatch(hideLoading('sectionBar'))
  }

  return (
    <>
      <div
        className={`
        edit-comments
        ${isEdit ? 'translateZero' : ''}
      `}
      >
        <div className="box-row justify-between">
          <HeadingBox title="Comments Detail" />

          <span
            className="close-icon far fa-times"
            onClick={() => dispatch(defaultDataComment())}
          />
        </div>

        <div className="edit-comments__box">
          <div className="box-row">
            <div className="box-6">
              <BoxInfo title="Custommer" info={comment.userName} />

              <BoxInfo title="Date" info={date(comment.updated)} />
            </div>

            <div className="box-6">
              <BoxInfo title="Product" info={comment.nameProduct} />

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
            title="Comments"
            name="title"
            value={newData.title}
            onChange={handleOnChange}
          />
        </div>

        <div className="box-submit">
          <div className="box-row justify-between">
            <div className="box-submit__save" onClick={handleSave}>
              <Save />
            </div>

            <div className="box-submit__delete" onClick={handleDelete}>
              <Delete />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditComments
