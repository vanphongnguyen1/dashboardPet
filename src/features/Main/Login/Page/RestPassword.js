import { useState, useEffect } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import BoxTextLogin from './BoxTextLogin'
import { useSelector } from 'react-redux'
import { useHistory, Prompt } from 'react-router-dom'
import { API_NAME } from '../../../../dataDefault'
import { customAxiosApi } from '../../../../customAxiosApi'
import { NAME_URL_LOGIN } from '../../../../dataDefault'

const RestPassword = () => {
  const history = useHistory()
  const { login, identify } = NAME_URL_LOGIN

  const [state, setState] = useState('')
  const [validate, setValidate] = useState('')
  const [isLocalPath, setIsLocalPath] = useState(false)
  const dataCheckCode = useSelector(state => state.forgotPassword.data)

  useEffect(() => {
    if (!dataCheckCode.hasOwnProperty('code')) {
      history.replace(`/${login}/${identify}`)
    }
  }, [dataCheckCode, history, login, identify])

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
    setIsLocalPath(true)
  }

  const checkValidated = () => {
    let err = ''

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
      setIsLocalPath(false)
      customAxiosApi.put(`${API_NAME.USERS}/${dataCheckCode.id}`, {password: state})
      .then (() => {
        history.replace(`/${login}`)
      })
      .catch(rej => {
        setValidate(rej.message)
      })
    }
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

      <Prompt
        when={isLocalPath}
        message={location => (`Bạn có muốn đến ${location.pathname}`)}
      />
    </div>
  )
}

export default RestPassword
