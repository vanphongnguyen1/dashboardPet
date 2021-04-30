import { useEffect } from 'react'
import Form from '../Form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { fetchGroup } from '../../../../../rootReducers/groupSlice'
import PropTypes from 'prop-types'

const CreateForm = ({ url }) => {
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
      <Form url={url} />
    </div>
  )
}

CreateForm.propTypes = {
  url: PropTypes.string
}
CreateForm.defaultProps = {
  url: ''
}

export default CreateForm
