import { useState } from 'react'
import { Delete, Save } from '../../../../../Components/Btn'
import { useSelector } from 'react-redux'
import { customAxiosApi } from '../../../../../customAxiosApi'
import { REGEX } from '../../../../../dataDefault'
import { Input } from '../../../../../Components/Form/Input'
import { Lable } from '../../../../../Components/Form/Lable'
import { ValidaError } from '../../../../../Components/Form/ValidaError'
import { openMessage } from '../../../../../Components/openMessage'
import { Link } from 'react-router-dom'

const FormUser = ({ url }) => {
  const dataStore = useSelector(state => state.users)
  const urlConvert = url.split('/')

  const initialValue = {
    name: dataStore.loading === 'success' ? dataStore.list.name : '',
    email: dataStore.loading === 'success' ? dataStore.list.email : '',
    phone: dataStore.loading === 'success' ? dataStore.list.phone : '',
    address: dataStore.loading === 'success' ? dataStore.list.address : '',
    password: dataStore.loading === 'success' ? dataStore.list.password : '',
    confirmPassword: '',
    role: dataStore.loading === 'success' ? dataStore.list.role : 0,
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

    if (
      urlConvert[urlConvert.length - 1] === 'creat'
      && !(state.confirmPassword === state.password)
    ) {
      newValidate.confirmPassword = 'Bạn nhập sai Mật khẩu'
    }

    if (urlConvert[urlConvert.length - 1] === 'creat') {
      for (let key in state) {
        if (!state[key] && key !== 'address') {
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

    if (urlConvert[urlConvert.length - 1] === 'edit' && isInputValida) {
      customAxiosApi.put(`/users/${dataStore.list.id}`, state)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    if (urlConvert[urlConvert.length - 1] === 'creat' && isInputValida) {
      customAxiosApi.post(`/users`, state)
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
    customAxiosApi.delete(`/users/${dataStore.list.id}`)
      .then(function (response) {
        console.log(response);
      })
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
                <option value={0}>User</option>
                <option value={1}>Admin</option>
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
                urlConvert[urlConvert.length - 1] === 'creat'
                  ? handleOnBlur
                  : () => {}
              }
              onChange={handleOnChange}
            />

            <Lable
               text={`
                New password
                ${urlConvert[urlConvert.length - 1] === 'creat'
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
            urlConvert[urlConvert.length - 1] === 'creat'
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
                      urlConvert[urlConvert.length - 1] === 'creat'
                        ? handleOnBlur
                        : () => {}
                    }
                    onChange={handleOnChange}
                  />

                  <Lable
                    text={`
                      Confirm password
                      ${urlConvert[urlConvert.length - 1] === 'creat'
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
                urlConvert[urlConvert.length - 1] === 'edit'
                  ? (
                    <Link to='/users' className="box-submit__delete" onClick={handleDelete}>
                      <Delete />
                    </Link>
                  ) : ''
              }
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormUser
