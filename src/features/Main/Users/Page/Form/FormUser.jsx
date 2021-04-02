import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { TITLE_MENU, EDIT, CREAT } from '../../../../../dataDefault'
import { Delete, Save } from '../../../../../Components/Btn'
import { defaultUser } from '../../../../../rootReducers/userSlice'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { REGEX } from '../../../../../dataDefault'
import GroupInput from '../../../../../Components/Form/GroupInput'
import { Lable } from '../../../../../Components/Form/Lable'
import { openMessage, messageError } from '../../../../../Components/openMessage'
import DelayLink from '../../../../../Components/DelayLink'
import { HeadingBox } from '../../../../../Components/HeadingBox'

const FormUser = ({ url }) => {
  const dispatch = useDispatch()
  const dataUsers = useSelector(state => state.users.user)
  const textUsers = TITLE_MENU.USERS.toLowerCase()
  const urlConvert = url.split('/')
  const isRequitEdit = urlConvert[urlConvert.length - 1] === EDIT
  const isRequitCreat = urlConvert[urlConvert.length - 1] === CREAT

  const initialValue = {
    name: isRequitEdit ? dataUsers.name : '',
    email: isRequitEdit ? dataUsers.email : '',
    phone: isRequitEdit ? dataUsers.phone : '',
    address: isRequitEdit ? dataUsers.address : '',
    password: isRequitEdit ? dataUsers.password : '',
    confirmPassword: '',
    role: isRequitEdit ? dataUsers.role : '0',
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

  const handleOnBlur = e => {
    const { value, name } = e.target

    if ( !value ) {
      setValidate({
        ...validate,
        [name]: 'Requite *'
      })
    }
  }

  const handleOnChange = e => {
    const { value, name } = e.target

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
      newValidate.phone = 'Số điện thoại gồm 10 số và đầu là 09|03|08|05|07'
    }

    if (isRequitCreat && !(state.confirmPassword === state.password)) {
      newValidate.confirmPassword = 'Bạn nhập sai Mật khẩu'
    }

    if (isRequitCreat) {
      for (let key in state) {
        if (!state[key] && key !== 'address' && key !== 'role') {
          newValidate[key] = 'Requite *'
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

  const handleSubmit = () => {
    const isInputValida = checkValidated()

    if (isRequitEdit && isInputValida) {
      customAxiosApi.put(`${textUsers}/${dataUsers.id}`, state)
      .then(() => {
        openMessage('Update Success !')
      })
      .catch(error => {
        messageError(error.message)
      })

      setState(initialValue)
      setValidate(initialErMes)
    }

    if (isRequitCreat && isInputValida) {
      customAxiosApi.post(textUsers, state)
      .then(() => {
        openMessage('Add Success !')
      })
      .catch(error => {
        messageError(error.message)
      })

      setState(initialValue)
      setValidate(initialErMes)
    }
  }

  const handleDelete = async () => {
    await customAxiosApi.delete(`${textUsers}/${dataUsers.id}`)

    dispatch(defaultUser())
  }

  return (
    <div className="info-user">
      <form className="info-user__form" onSubmit={ handleSubmit }>
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
          <div className="box-row">
            <div className="box-submit__save" onClick={handleSubmit}>
              <Save />
            </div>
              {
                isRequitEdit
                  ? (
                      <DelayLink
                        to={`/${textUsers}`}
                        className="box-submit__delete"
                        onClick={handleDelete}
                        delay={1000}
                        children={<Delete/>}
                      />
                  ) : ''
              }
          </div>
        </div>
      </form>
    </div>
  )
}

FormUser.propTypes = {
  url: PropTypes.string
}

FormUser.defaultProps = {
  url: ''
}

export default FormUser
