import { useState } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import { useHistory } from 'react-router-dom'

const SecurityCode = () => {
  const history = useHistory()
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
    history.replace('/login/passs')
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
          Enter the security code
        </h1>

        <div className="modal-login__box">
          <p className="modal-text login__security-text">
            You must have received a text message with a code on your phone. This code contains 6 characters.
          </p>
        </div>


        <div className="box-form">
          <form action="" onSubmit={handleSubmitEmail}>
            <div className="box-input-identify">
              <GroupInput
                login
                type="text"
                name="email"
                validateName={validate}
                value={state}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                titleLabel="Enter code"
              />

              <span
                className="box-input-identify__icon fas fa-paper-plane"
                onClick={handleSubmitEmail}
              />
            </div>
          </form>

          <div className="box-info">
            <p className="info-title">
              We have sent your code to:
            </p>
            <p className="info-gmail">a@gmail.com</p>
          </div>
        </div>

        <div className="box-received">
          <p className="received-link">
            Code not received?
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecurityCode
