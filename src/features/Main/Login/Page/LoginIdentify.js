import { useState } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import { useHistory } from 'react-router-dom'
import BoxTextLogin from './BoxTextLogin'

const LoginIdentify = () => {
  const history = useHistory()
  const [state, setState] = useState('')
  const [validate, setValidate] = useState('')

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

      if (!validate) {
        err = 'This field is required to enter *'
      }

    setValidate(err)

    if (err) {
      return false
    }

    return true
  }

  const handleSubmitEmail = () => {
    const isInputValida = checkValidated()

    history.replace('/login/security-code')

    if (isInputValida) {
      console.log('aaaaa', state);

      return
    }

    console.log('bbbbb', validate);

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
              type="text"
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
      </div>
    </div>
  )
}

export default LoginIdentify
