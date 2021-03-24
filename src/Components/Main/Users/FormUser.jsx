import { useState } from 'react'
import { Delete, Save } from '../../Btn'
import { useSelector } from 'react-redux'
import { customAxiosApi } from '../../../customAxiosApi'
import { REGEX } from '../../../dataDefault'

const FormUser = () => {
  const data = useSelector(state => state.users)

  const init = {
    name: {
      value: data.loading === 'success' ? data.list.name : '',
      isInputValida: false,
      errorMessage: ''
    },
    email: {
      value: data.loading === 'success' ? data.list.email : '',
      isInputValida: false,
      errorMessage: ''
    },
    phone: {
      value: data.loading === 'success' ? data.list.phone : '',
      isInputValida: false,
      errorMessage: ''
    },
    address: {
      value: data.loading === 'success' ? data.list.address : '',
      isInputValida: false,
      errorMessage: ''
    },
    password: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    },
    confirmPassword: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    },
    role: {
      value: 0
    }
  }

  const [state, setState] = useState(init)

  const handleOnBlur = e => {
    const ele = e.target
    const { value, name } = ele

    if ( value ) {
      setState({
        ...state,
        [name]: {
          ...state[name],
          isInputValida: false,
          errorMessage: ''
        }
      })
    } else {
      setState({
        ...state,
        [name]: {
          ...state[name],
          isInputValida: true,
          errorMessage: 'Requite *'
        }
      })
    }
  }

  const handleOnChange = e => {
    const { value, name } = e.target

    setState({
      ...state,
      [name]: {
        ...state[name],
        value,
        errorMessage: '',
        isInputValida: false,
      }
    })
  }

  const handleSubmit = () => {
    if ( !REGEX.EMAIL.test(state.email.value) ) {
      setState({
        ...state,
        email: {
          ...state.email,
          errorMessage: 'Bạn nhập sai Email !',
          isInputValida: true,
        }
      })

      return
    }

    if ( !REGEX.PHONE.test(state.phone.value) ) {
      setState({
        ...state,
        phone: {
          ...state.phone,
          errorMessage: 'Số điện thoại gồm 10 số và đầu là 09|03|08|05|07',
          isInputValida: true,
        }
      })

      return
    }

    if ( !(state.confirmPassword.value === state.password.value) ) {
      setState({
        ...state,
        confirmPassword: {
          ...state.confirmPassword,
          errorMessage: 'Bạn nhập sai mật khẩu',
          isInputValida: true,
        }
      })

      return
    }

    // for ( let key in state) {
    //   if (key.isInputValida) return
    // }

    console.log(state)

    // customAxiosApi.post('/users', {
    //   name: 'Fred',
    //   email: 'vanpoasn@gmail.com',
    //   phone: '033451321',
    //   address: 'Ca Mau',
    //   password: '123',
    //   role: 0
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  }

  return (
    <div className="info-user">
      <form className="info-user__form" onSubmit={ handleSubmit }>
        <div className="identity">
          <p className="identity__title">identity</p>

          <div className="group">
            <input
              type="text"
              name="name"
              className={`
                group__input
                ${
                  state.name.isInputValida
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.name.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={`
                group__label
                ${
                  state.name.value
                  ? 'label-input-value'
                  : state.name.isInputValida
                  ? 'valide-label'
                  : ''
                }
              `}
            >
              UserName *
            </label>

            {
              state.name.isInputValida ? (
                <span className="group__valide" >
                  { state.name.errorMessage}
                </span>
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>

          <div className="group">
            <input
              type="text"
              name="email"
              className={`
                group__input
                ${
                  state.email.isInputValida
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.email.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={`
                group__label
                ${
                  state.email.value && state.email.isInputValida
                  ? 'label-input-value valide-label'
                  : state.email.value
                  ? 'label-input-value'
                  : state.email.isInputValida
                  ? 'valide-label'
                  : ''
                }
              `}
            >
              Email *
            </label>

            {
              state.email.isInputValida ? (
                <span className="group__valide" >
                  { state.email.errorMessage }
                </span>
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>

          <div className="group">
            <input
              type="text"
              name="phone"
              className={`
                group__input
                ${
                  state.phone.isInputValida
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.phone.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={`
                group__label
                ${
                  state.phone.value && state.phone.isInputValida
                  ? 'label-input-value valide-label'
                  : state.phone.value
                  ? 'label-input-value'
                  : state.phone.isInputValida
                  ? 'valide-label'
                  : ''
                }
              `}
            >
              Phone Number *
            </label>

            {
              state.phone.isInputValida ? (
                <span className="group__valide" >
                  { state.phone.errorMessage}
                </span>
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>
        </div>

        <div className="identity">
          <p className="identity__title">Address</p>

          <div className="group">
            <input
              type="text"
              name="address"
              className={`
                group__input
                ${
                  state.address.isInputValida
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.address.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={`
                group__label
                ${
                  state.address.value
                  ? 'label-input-value'
                  : state.address.isInputValida
                  ? 'valide-label'
                  : ''
                }
              `}
            >
              Street Address *
            </label>

            {
              state.address.isInputValida ? (
                <span className="group__valide" >
                  { state.address.errorMessage}
                </span>
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>
        </div>

        <div className="identity">
          <p className="identity__title"> New PassWord</p>

          <div className="group">
            <input
              type="password"
              name="password"
              className={`
                group__input
                ${
                  state.password.isInputValida
                  ? 'valide-input'
                  : ''
                }
              `}
              value={ state.password.value }
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={`
                group__label
                ${
                  state.password.value
                  ? 'label-input-value'
                  : state.password.isInputValida
                  ? 'valide-label'
                  : ''
                }
              `}
            >
              New password
            </label>

            {
              state.password.isInputValida ? (
                <span className="group__valide" >
                  { state.password.errorMessage}
                </span>
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>

          <div className="group">
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword.value}
              className={`
                group__input
                ${
                  state.confirmPassword.isInputValida
                  ? 'valide-input'
                  : ''
                }
              `}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={`
                group__label
                ${
                  state.confirmPassword.value && state.confirmPassword.isInputValida
                  ? 'label-input-value valide-label'
                  : state.confirmPassword.value
                  ? 'label-input-value'
                  : state.confirmPassword.isInputValida
                  ? 'valide-label'
                  : ''
                }
              `}
            >
              Confirm password
            </label>

            {
              state.confirmPassword.isInputValida ? (
                <span className="group__valide" >
                  { state.confirmPassword.errorMessage}
                </span>
              ) : (
                <span className="pseudo-input" />
              )
            }
          </div>
        </div>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save" onClick={ handleSubmit }>
              <Save />
            </div>
            <div className="box-submit__delete">
              <Delete />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormUser
