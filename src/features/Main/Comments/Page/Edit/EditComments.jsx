import { useState, useEffect } from 'react'
import { HeadingBox } from '../../../../../Components/HeadingBox'
import { Selector } from '../../../../../Components/Form/Selector'
import { Textarea } from '../../../../../Components/Form/Textarea'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { customAxiosApi } from '../../../../../customAxiosApi'
import PropTypes from 'prop-types'
import { openMessage } from '../../../../../Components/openMessage'
import { fetchComments } from '../../../../../rootReducers/commentSlice'

const EditComments = ({ url, isEditComments, setIsEditComments }) => {
  const initial = {
    statusCommentsID: '',
    title: ''
  }

  const dispatch = useDispatch()
  const dataStatus = useSelector(state => state.statusComments.list)
  const dataEdit = useSelector(state => state.comment.list)
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
    await customAxiosApi.put(`${url}/${dataEdit.id}`, newData)
    openMessage('edit success !')
    dispatch(fetchComments(url))
  }

  const handleDelete = async () => {
    await customAxiosApi.delete(`${url}/${dataEdit.id}`)
    setIsEditComments(false)
    dispatch(fetchComments(url))
  }

  return (
    <>
      <div className={`
        edit-comments
        ${isEditComments ? 'translateZero' : ''}
      `}>
        <HeadingBox title="Comments Detail" />

        <div className="edit-comments__box">
          <div className="box-row">
            <div className="box-6">
              <div className="box-info">
                <p className="box-info__title">Custommer</p>
                <p className="box-info__name">{dataEdit.userName}</p>
              </div>

              <div className="box-info">
                <p className="box-info__title">Date</p>
                <p className="box-info__date">
                  { moment(dataEdit.updated).format('DD-MM-YYYY') }
                </p>
              </div>
            </div>

            <div className="box-6">
              <div className="box-info">
                <p className="box-info__title">Product</p>
                <p className="box-info__name">{dataEdit.nameProduct}</p>
              </div>

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
  url: PropTypes.string,
  isEditComments: PropTypes.bool,
  setIsEditComments: PropTypes.func
}

EditComments.defaultProps = {
  url: '',
  isEditComments: false,
  setIsEditComments: () => {}
}

export default EditComments
