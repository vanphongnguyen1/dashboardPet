import { useState } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'

const LoginIdentify = () => {
  const [state, setState] = useState('')
  const [validate, setValidate] = useState('')

  const handleOnBlur = e => {
    const { value } = e.target

    if ( !value ) {
      setValidate('Requite *')
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
        err = 'Requite *'
      }

    setValidate(err)

    if (err) {
      return false
    }

    return true
  }

  const handleSubmitEmail = () => {
    const isInputValida = checkValidated()

    if (isInputValida) {
      console.log('aaaaa', state);

      return
    }

    console.log('bbbbb', validate);

  }

  return (
    <div className = "login">
      <div className="modal-login">
        <h1 className="modal-login__heading">Forgot Password ?</h1>

        <div className="modal-login__box">
          <p className="modal-text">
            Please enter your email or mobile number to search for your account.
          </p>
        </div>


        <form action="" onSubmit={handleSubmitEmail}>
          <div className="box-input-identify">
            <GroupInput
              type="text"
              name="email"
              validateName={validate}
              value={state}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              titleLabel="email or Phone Number *"
            />

            <span
              className="box-input-identify__icon fas fa-paper-plane"
              onClick={handleSubmitEmail}
            />
          </div>
{/*
          <div className="modal-login__box">
            <span className="modal-text">Forgot Password?</span>&nbsp;
            <span className="modal-text link-text">Click here</span>
          </div> */}

          {/* <div onClick={handleSubmit}>
            <BtnLogin />
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default LoginIdentify
