import { useEffect } from 'react'
import Form from '../Form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { fetchGroup } from '../../../../../rootReducers/groupSlice'

const EditForm = () => {
  const dispatch = useDispatch()
  const isHideLoading = useSelector(state => state.groups.loading)

  useEffect(() => {
    dispatch(showLoading('sectionBar'))
    dispatch(fetchGroup())
  }, [dispatch])

  useEffect(() => {
    if (isHideLoading === 'success') {
      dispatch(hideLoading('sectionBar'))
    }
  }, [isHideLoading, dispatch])

  return (
    <div className="from-product box-7">
      <Form />
    </div>
  )
}

export default EditForm
