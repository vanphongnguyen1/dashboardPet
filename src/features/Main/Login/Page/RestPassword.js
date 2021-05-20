import { useState } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import BoxTextLogin from './BoxTextLogin'

const RestPassword = () => {
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

    if (isInputValida) {
      console.log('aaaaa', state);

      return
    }

    console.log('bbbbb', validate);

  }

  return (
    <div className = "login">
      <div className="modal-login login__security-modal">
        <h1 className="modal-login__heading login__security-heading">
          Choose a new password
        </h1>

        <BoxTextLogin
          className="modal-text login__security-text"
          text={`
            Create a password of at least 6 characters.
            A strong password is a combination of letters,
            numbers, and punctuation marks.
          `}
        />


        <div className="box-form">
          <form action="" onSubmit={handleSubmitEmail} style={{width: '100%'}}>
            <div className="box-input-identify">
              <GroupInput
                login
                type="password"
                name="password"
                validateName={validate}
                value={state}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="New password"
              />

              <span
                className="box-input-identify__icon fas fa-paper-plane"
                onClick={handleSubmitEmail}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RestPassword
