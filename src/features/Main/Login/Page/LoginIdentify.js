import { useState } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import { useHistory } from 'react-router-dom'
import BoxTextLogin from './BoxTextLogin'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForgotPassword } from '../../../../rootReducers/forgotPassword'
import { STATUS_FETCH, NAME_URL_LOGIN } from '../../../../dataDefault'
import { REGEX } from '../../../../dataDefault'
import { TransverseLoading } from 'react-loadingg'
import { v4 as uuid } from 'uuid'

const LoginIdentify = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { login, securityCode } = NAME_URL_LOGIN

  const [state, setState] = useState('')
  const [validate, setValidate] = useState('')
  const isForgotPassword = useSelector(state => state.forgotPassword.loading)

  const handleOnBlur = e => {
    const { value } = e.target

    if ( !value ) {
      setValidate('This field is required to enter *')
    }
  }

  const handleOnChange = e => {
    const { value } = e.target

    setState(value)
    setValidate('')
  }

  const checkValidated = () => {
    let err = ''

    if (!REGEX.EMAIL.test(state)) {
      err = 'Please re-enter your email !'
    }

    if (!state) {
      err = 'This field is required to enter *'
    }

    setValidate(err)

    if (err) {
      return false
    }

    return true
  }

  const handleSubmitEmail = e => {
    e.preventDefault()
    const isInputValida = checkValidated()

    if (isInputValida) {
      const data = new FormData()
      data.append('email', state)

      dispatch(fetchForgotPassword(data))
      .then(data => {
        const { payload } = data

        if (typeof payload === 'string') {
          setValidate(payload)
          return
        }

        if (typeof payload === 'object') {
          history.replace(`/${login}/${securityCode}?smtp=${uuid()}`)
        }
      })
    }
  }

  return (
    <div className = "login">
      <div className="modal-login">
        <h1 className="modal-login__heading">
          Forgot Password ?
        </h1>

        <BoxTextLogin
          className="modal-text"
          text={`
            Please enter your email or mobile number
            to search for your account.
          `}
        />


        <form action="" onSubmit={handleSubmitEmail}>
          <div className="box-input-identify">
            <GroupInput
              login
              type="email"
              name="email"
              titleLabel="Enter email *"

              validateName={validate}
              value={state}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />

            <span
              className="box-input-identify__icon fas fa-paper-plane"
              onClick={handleSubmitEmail}
            />
          </div>
        </form>

        {
        isForgotPassword === STATUS_FETCH.LOADING &&
        (
          <div className="modal-login__loading">
            <TransverseLoading />
          </div>
        )
      }
      </div>
    </div>
  )
}

export default LoginIdentify
