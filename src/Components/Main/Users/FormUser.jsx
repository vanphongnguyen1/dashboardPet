import { useState } from 'react'
import { Delete, Save } from '../../Btn'

const FormUser = () => {
  // const { user } = props

  const init = {
    name: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    },
    email: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    },
    phone: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    },
    address: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    },
    password: {
      value: '',
      isInputValida: false,
      errorMessage: ''
    }
  }

  // if (init) {
  //   console.log('aaa')
  // } else

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

  console.log(state)

  return (
    <div className="info-user">
      <form action="" className="info-user__form">
        <div className="identity">
          <p className="identity__title">identity</p>

          <div className="group">
            <input
              type="text"
              name="name"
              className={ state.name.isInputValida
                ? 'group__input valide-input'
                : 'group__input'
              }
              value={ state.name.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={
                state.name.value
                ? 'group__label label-input-value'
                : state.name.isInputValida
                ? 'group__label valide-label'
                : 'group__label'
              }
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
              className={ state.email.isInputValida
                ? 'group__input valide-input'
                : 'group__input'
              }
              value={ state.email.value.trim() }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={
                state.email.value
                ? 'group__label label-input-value'
                : state.email.isInputValida
                ? 'group__label valide-label'
                : 'group__label'
              }
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
              className={ state.phone.isInputValida
                ? 'group__input valide-input'
                : 'group__input'
              }
              value={ state.phone.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={
                state.phone.value
                ? 'group__label label-input-value'
                : state.phone.isInputValida
                ? 'group__label valide-label'
                : 'group__label'
              }
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
              className={ state.address.isInputValida
                ? 'group__input valide-input'
                : 'group__input'
              }
              value={ state.address.value }
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={
                state.address.value
                ? 'group__label label-input-value'
                : state.address.isInputValida
                ? 'group__label valide-label'
                : 'group__label'
              }
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
              className='group__input'
              value={ state.password.value }
              onChange={handleOnChange}
            />

            <label
              htmlFor=""
              className={
                state.password.value
                ? 'group__label label-input-value'
                : 'group__label'
              }
            >
              New password
            </label>

            <span className="pseudo-input" />
          </div>

          <div className="group">
            <input type="text" className="group__input"/>
            <label htmlFor="" className="group__label">Confirm password</label>
            <span className="pseudo-input" />
          </div>
        </div>

        <div className="box-submit">
          <div className="box-row">
            <div className="box-submit__save">
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
