import { useState } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import { setToken } from '../../../../rootReducers/loginSlice'
import { BtnLogin } from '../../../../Components/Btn'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const initialValue = {
    name: '',
    password: '',
  }

  const initialErMes = {
    name: '',
    password: ''
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

    for (let key in state) {
      if (!state[key]) {
        newValidate[key] = 'Requite *'
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
      console.log('aaaaa', state);
      dispatch(setToken(true))
      history.replace("/dashboard")
      return
    }

    console.log('bbbbb', validate);

  }

  return (
    <div className="login">
      <div className="modal-login">
        <h1 className="modal-login__heading">Login Now</h1>

        <form onSubmit={handleSubmit}>
          <GroupInput
            type="text"
            name="name"
            validateName={validate.name}
            value={state.name}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            titleLabel="UserName *"
          />

          <GroupInput
            type="password"
            name="password"
            validateName={validate.password}
            value={state.password}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            titleLabel="Password *"
          />

          <div className="modal-login__box">
            <span className="modal-text">Forgot Password?</span>&nbsp;
            <Link
              to="/login/identify"
              className="modal-text link-text">
                Click here
            </Link>
          </div>

          <div onClick={handleSubmit}>
            <BtnLogin />
          </div>
        </form>

        <div className="modal-login__box">
          <span className="modal-text">Or Login with</span>

          <span className="box-icon">
            <span className="login-icon icon-facebook fab fa-facebook-f" />
            <span className="login-icon icon-google fab fa-google" />
          </span>
        </div>

      </div>
    </div>
  )
}

export default Login
