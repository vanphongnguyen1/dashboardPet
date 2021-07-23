import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { EDIT, CREAT, API_NAME } from '../../../../../dataDefault'
import { fetchGender } from '../../../../../rootReducers/genderSlice'
import { Cancell, Save } from '../../../../../Components/Btn'
import { fetchUsers } from '../../../../../rootReducers/userSlice'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { REGEX } from '../../../../../dataDefault'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Lable } from '../../../../../Components/Form/Lable'
import { Selector } from '../../../../../Components/Form/Selector'
import { messageError, openMessage } from '../../../../../Components/openMessage'
import { HeadingBox } from '../../../../../Components/HeadingBox'
import { resetScroll } from '../../../../../Components/access/logic/resetScroll'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { Prompt, useHistory } from 'react-router-dom'

const FormUser = ({ url, data }) => {
  const dispatch = useDispatch()
  const history =  useHistory()

  const urlConvert = url.split('/')
  const isRequitEdit = urlConvert[urlConvert.length - 1] === EDIT
  const isRequitCreat = urlConvert[urlConvert.length - 1] === CREAT
  const textUsers = API_NAME.USERS

  const initialValue = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: '0',
    genderID: '1',
  }

  const initialErMes = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  }

  const [state, setState] = useState(initialValue)
  const [validate, setValidate] = useState(initialErMes)
  const [isLocalPath, setIsLocalPath] = useState(false)
  const dataGender = useSelector(state => state.gender.list)

  useEffect (() => {
    if (isRequitEdit) {
      setState(data)
    }
  }, [data, isRequitEdit])

  useEffect (() => {
    dispatch(fetchGender())
  }, [dispatch])

  const handleOnBlur = e => {
    const { value, name } = e.target
    setIsLocalPath(true)

    if ( !value ) {
      setValidate({
        ...validate,
        [name]: 'Trường này bắt buộc phải nhập *'
      })
    }
  }

  const handleOnChange = e => {
    const { value, name } = e.target
    setIsLocalPath(true)

    setState({
      ...state,
      [name]:  value
    })

    setValidate({
      ...validate,
      [name]:  ''
    })
  }

  const checkValidated = () => {
    const { ...newValidate } = validate

    if (!REGEX.EMAIL.test(state.email)) {
      newValidate.email = 'Bạn nhập sai Email !'
    }

    if (!REGEX.PHONE.test(state.phone)) {
      newValidate.phone = 'Đầu số 09|03|08|05|07 gồm 10 số !'
    }
    if (!REGEX.PASSWORD.test(state.password)) {
      newValidate.password = 'Tối thiểu 8 ký tự, ít nhất một chữ cái và một số!'
    }

    if (isRequitCreat && !(state.confirmPassword === state.password)) {
      newValidate.confirmPassword = 'Bạn nhập sai Mật khẩu'
    }

    if (isRequitCreat) {
      for (let key in state) {
        if (!state[key] && key !== 'address' && key !== 'role') {
          newValidate[key] = 'This field is required to enter *'
        }
      }
    }

    setValidate(newValidate)

    for (let key in newValidate) {
      if (newValidate[key]) {
        return false
      }
    }
    return true
  }

  const handleSubmit = async () => {
    const isInputValida = checkValidated()

    if (isInputValida) {
      resetScroll()
    }

    if (isRequitEdit && isInputValida) {
      if (isLocalPath) {
        setIsLocalPath(false)
      }

      dispatch(showLoading('sectionBar'))

      customAxiosApi.put(`${textUsers}/${state.id}`, state)
      .then(async () => {
        setValidate(initialErMes)
        await dispatch(fetchUsers())

        openMessage('Update Success !')
      })
      .catch(error => {
        messageError(error.message)
      })

      await setTimeout(() => {
        dispatch(hideLoading('sectionBar'))
      }, 500)
    }

    if (isRequitCreat && isInputValida) {
      if (isLocalPath) {
        setIsLocalPath(false)
      }

      customAxiosApi.post(textUsers, state)
      .then(response => {
        const { data } = response

        if (typeof data === 'string') {
            setValidate({
              ...initialErMes,
              email: 'Email đã tồn tại !'
            })
            return
        }
        customAxiosApi.post(`${API_NAME.CARTS}`, {
          totalCount: 0,
          usersID: data.id
        })
        .then((res) => {
          openMessage('Created Success!')
          setValidate(initialErMes)
          setState(initialValue)
          resetScroll()
        })
        .catch(() => {
          messageError('An error occurred!')
        })
      })
      .catch(() => {
        messageError('An error occurred!')
      })
    }
  }

  return (
    <>
      <div className="info-user">
        <form className="info-user__form" onSubmit={handleSubmit} autoComplete="off">
          <div className="identity">
            <HeadingBox title="identity" />

            <div className="info-user__box">
              <GroupInput
                type="text"
                name="name"
                validateName={validate.name}
                value={state.name}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="UserName *"
              />
            </div>

            <div className="info-user__box">
              <GroupInput
                type="text"
                name="email"
                validateName={validate.email}
                value={state.email}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Email *"
              />
            </div>

            <div className="box-group info-user__box">
              <GroupInput
                type="text"
                name="phone"
                validateName={validate.phone}
                value={state.phone}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Phone *"
              />

              <div className="group">
                <select
                  name="role"
                  className="group__select"
                  onChange={handleOnChange}
                  value={state.role}
                >
                  <option value='0'>User</option>
                  <option value='1'>Admin</option>
                </select>

                <Lable
                  text="Role"
                  className='group__label label-input-value'
                />
              </div>
            </div>

            <div className="info-user__box">
              <Selector
                name="genderID"
                title="Gender"
                value={ state.genderID }
                validateName={ validate.genderID }
                onChange={ handleOnChange }
                options={ dataGender }
              />
            </div>
          </div>

          <div className="identity">
            <HeadingBox title="Address" />

            <div className="info-user__box">
              <GroupInput
                type="text"
                name="address"
                validateName={validate.address}
                value={state.address}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Address *"
              />
            </div>
          </div>

          <div className="identity">
            <HeadingBox title="New PassWord" />

            <div className="info-user__box">
              <GroupInput
                type="password"
                name="password"
                validateName={validate.password}
                value={state.password}
                onBlur={
                  isRequitCreat
                    ? handleOnBlur
                    : () => {}
                }
                onChange={handleOnChange}
                titleLabel={`New password ${isRequitCreat ? '*' : ''}`}
              />
            </div>

            {
              isRequitCreat
                ? (
                  <div className="info-user__box">
                    <GroupInput
                      type="password"
                      name="confirmPassword"
                      validateName={validate.confirmPassword}
                      value={state.confirmPassword}
                      onBlur={
                        isRequitCreat
                          ? handleOnBlur
                          : () => {}
                      }
                      onChange={handleOnChange}
                      titleLabel={`Confirm password ${isRequitCreat ? '*' : ''}`}
                    />
                  </div>
                ) : ''
            }
          </div>

          <div className="box-submit">
            <div className="box-row justify-between">
              <div className="box-submit__save" onClick={handleSubmit}>
                <Save />
              </div>
                {
                  isRequitEdit
                    ? (
                        <div
                          className="box-submit__cancell"
                          onClick={() => history.push(`/${API_NAME.USERS}`)}
                        >
                          <Cancell/>
                        </div>
                    ) : ''
                }
            </div>
          </div>
        </form>
      </div>

      <Prompt
        when={isLocalPath}
        message={location => (`Bạn có muốn đến ${location.pathname}`)}
      />
    </>
  )
}

FormUser.propTypes = {
  url: PropTypes.string,
  data: PropTypes.object
}

FormUser.defaultProps = {
  url: '',
  data: {}
}

export default FormUser
