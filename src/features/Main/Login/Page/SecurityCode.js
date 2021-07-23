import { useState, useEffect } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import { useHistory, Prompt } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { NAME_URL_LOGIN } from '../../../../dataDefault'
import { setDataForgotPassword } from '../../../../rootReducers/forgotPassword'
import { useDispatch } from 'react-redux'
import { customAxiosApi } from '../../../../customAxiosApi'
import { TransverseLoading } from 'react-loadingg'

const SecurityCode = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { login, identify, resetPassword } = NAME_URL_LOGIN

  const [state, setState] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [validate, setValidate] = useState('')
  const [isLocalPath, setIsLocalPath] = useState(false)
  const dataCheckCode = useSelector((state) => state.forgotPassword.data)

  useEffect(() => {
    if (!dataCheckCode.hasOwnProperty('code')) {
      history.replace(`/${login}/${identify}`)
    }
  }, [history, dataCheckCode, login, identify])

  const handleOnBlur = (e) => {
    const { value } = e.target

    if (!value) {
      setValidate('This field is required to enter *')
    }
  }

  const handleOnChange = (e) => {
    const { value } = e.target

    setState(value)

    setValidate('')
    setIsLocalPath(true)
  }

  const checkValidated = () => {
    let err = ''
    const status = true

    if (dataCheckCode.code !== state) {
      err = 'Bạn nhập sai Code !'
    }

    if (!state) {
      err = 'This field is required to enter *'
    }

    setValidate(err)

    if (err) {
      return !status
    }

    return status
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    const isInputValida = checkValidated()

    if (isInputValida) {
      setIsLocalPath(false)
      history.replace(`/${login}/${resetPassword}?ph?=${uuid()}?pass=${uuid()}`)
    }
  }

  const CodeComfirm = () => {
    setIsLoading(true)
    const data = new FormData()
    data.append('email', dataCheckCode.email)

    customAxiosApi
      .post('auth/forgotPassword', data)
      .then((response) => {
        const fetchData = response.data
        dispatch(setDataForgotPassword(fetchData))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  return (
    <div className="login">
      <div className="modal-login login__security-modal">
        <h1 className="modal-login__heading login__security-heading">
          Enter the security code
        </h1>

        <div className="modal-login__box">
          <p className="modal-text login__security-text">
            You must have received a text message with a code on your phone.
            This code contains 6 characters.
          </p>
        </div>

        <div className="box-form">
          <form action="" onSubmit={handleSubmitEmail} autoComplete="off">
            <div className="box-input-identify">
              <GroupInput
                login
                type="text"
                name="code"
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
            <p className="info-title">We have sent your code to:</p>
            <p className="info-gmail">{dataCheckCode.email}</p>
          </div>
        </div>

        <div className="box-received">
          <p className="received-link" onClick={CodeComfirm}>
            Code not received?
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="modal-login__loading">
          <TransverseLoading />
        </div>
      )}

      <Prompt
        when={isLocalPath}
        message={(location) => `Bạn có muốn đến ${location.pathname}`}
      />
    </div>
  )
}

export default SecurityCode
