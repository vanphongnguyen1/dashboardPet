import { useState } from 'react'
import { TITLE_MENU, EDIT, CREAT } from '../../../../../dataDefault'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector, useDispatch } from 'react-redux'
import { defaultUsers } from '../../asyncThunk/userSlice'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { REGEX } from '../../../../../dataDefault'
import { Input } from '../../../../../Components/Form/Input'
import { Lable } from '../../../../../Components/Form/Lable'
import { ValidaError } from '../../../../../Components/Form/ValidaError'
import { openMessage } from '../../../../../Components/openMessage'
import DelayLink from '../../../../../Components/DelayLink'

const FormUser = ({ url }) => {
  const dispatch = useDispatch()
  const dataUsers = useSelector(state => state.users)
  const textUsers = TITLE_MENU.USERS.toLowerCase()

  const urlConvert = url.split('/')
  const isRequitEdit = urlConvert[urlConvert.length - 1] === EDIT
  const isRequitCreat = urlConvert[urlConvert.length - 1] === CREAT

  const initialValue = {
    name: isRequitEdit ? dataUsers.list.name : '',
    email: isRequitEdit ? dataUsers.list.email : '',
    phone: isRequitEdit ? dataUsers.list.phone : '',
    address: isRequitEdit ? dataUsers.list.address : '',
    password: isRequitEdit ? dataUsers.list.password : '',
    confirmPassword: '',
    role: isRequitEdit ? dataUsers.list.role : '0',
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

    if (isInputValida) {
      openMessage()

      setState(initialValue)
      setValidate(isInputValida)
    }

    if (isRequitEdit && isInputValida) {
      customAxiosApi.put(`${textUsers}/${dataUsers.list.id}`, state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    if (isRequitCreat && isInputValida) {
      customAxiosApi.post(textUsers, state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    console.log(isInputValida)
  }

  const handleDelete = () => {
    customAxiosApi.delete(`${textUsers}/${dataUsers.list.id}`)
      .then(response => {
        console.log(response)
      })

    dispatch(defaultUsers())
  }

  return (
    <div className="info-user">
      <form className="info-user__form" onSubmit={ handleSubmit }>
        <div className="identity">
          <p className="identity__title">identity</p>

          <div className="group">
            <Input
              type="text"
              name="name"
              className={`
                group__input
                ${
                  validate.name
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.name }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <Lable
              text="UserName *"
              className={`
                group__label
                ${
                  state.name
                  ? 'label-input-value'
                  : validate.name
                  ? 'valide-label'
                  : ''
                }
              `}
            />

            {
              validate.name ? (
                <ValidaError
                  className="group__valide"
                  text={validate.name}
                />

              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>

          <div className="group">
            <Input
              type="text"
              name="email"
              className={`
                group__input
                ${
                  validate.email
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.email }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <Lable
              text="Email *"
              className={`
                group__label
                ${
                  state.email && validate.email
                  ? 'label-input-value valide-label'
                  : state.email
                  ? 'label-input-value'
                  : validate.email
                  ? 'valide-label'
                  : ''
                }
              `}
            />

            {
              validate.email ? (
                <ValidaError
                  className="group__valide"
                  text={validate.email}
                />

              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>

          <div className="box-group">
            <div className="group">
              <Input
                type="text"
                name="phone"
                className={`
                  group__input
                  ${
                    validate.phone
                    ? 'valide-input'
                    : ''
                  }
                `}
                value={ state.phone }
                onBlur={handleOnBlur}
                onChange={handleOnChange}
              />

              <Lable
                text="Phone Number *"
                className={`
                  group__label
                  ${
                    state.phone && validate.phone
                    ? 'label-input-value valide-label'
                    : state.phone
                    ? 'label-input-value'
                    : validate.phone
                    ? 'valide-label'
                    : ''
                  }
                `}
              />

              {
                validate.phone ? (
                  <ValidaError
                    className="group__valide"
                    text={validate.phone}
                  />

                ) : (
                  <span className="pseudo-input" />
                )
              }
            </div>

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
          <p className="identity__title">Address</p>

          <div className="group">
            <Input
              type="text"
              name="address"
              className={`
                group__input
                ${
                  validate.address
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.address }
              onChange={handleOnChange}
            />

            <Lable
              text="Street Address"
              className={`
                group__label
                ${
                  state.address
                  ? 'label-input-value'
                  : validate.address
                  ? 'valide-label'
                  : ''
                }
              `}
            />

            {
              validate.address ? (
                <ValidaError
                  className="group__valide"
                  text={validate.address}
                />

              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>
        </div>

        <div className="identity">
          <p className="identity__title"> New PassWord</p>

          <div className="group">
            <Input
              type="password"
              name="password"
              className={`
                group__input
                ${
                  validate.password
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.password }
              onBlur={
                isRequitCreat
                  ? handleOnBlur
                  : () => {}
              }
              onChange={handleOnChange}
            />

            <Lable
               text={`
                New password
                ${isRequitCreat
                  ? '*'
                  : ''
                }
              `}
              className={`
                group__label
                ${
                  state.password
                  ? 'label-input-value'
                  : validate.password
                  ? 'valide-label'
                  : ''
                }
              `}
            />

            {
              validate.password ? (
                <ValidaError
                  className="group__valide"
                  text={validate.password}
                />
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>

          {
            isRequitCreat
              ? (
                <div className="group">
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    className={`
                      group__input
                      ${
                        validate.confirmPassword
                        ? 'valide-input'
                        : ''
                      }
                    `}
                    onBlur={
                      isRequitCreat
                        ? handleOnBlur
                        : () => {}
                    }
                    onChange={handleOnChange}
                  />

                  <Lable
                    text={`
                      Confirm password
                      ${isRequitCreat
                        ? '*'
                        : ''
                      }
                    `}
                    className={`
                      group__label
                      ${
                        state.confirmPassword && validate.confirmPassword
                        ? 'label-input-value valide-label'
                        : state.confirmPassword
                        ? 'label-input-value'
                        : validate.confirmPassword
                        ? 'valide-label'
                        : ''
                      }
                    `}
                  />

                  {
                    validate.confirmPassword ? (
                      <ValidaError
                        className="group__valide"
                        text={validate.confirmPassword}
                      />

                    ) : (
                      <span className="pseudo-input" />
                    )
                  }
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

export default FormUser
