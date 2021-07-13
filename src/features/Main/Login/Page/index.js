import { useState, useEffect } from 'react'
import GroupInput from '../../../../Components/Form/GroupInput'
import { setToken, fetchLogin, setError, defaulrError } from '../../../../rootReducers/loginSlice'
import { fetchCarts } from '../../../../rootReducers/cartSlice'
import { BtnLogin } from '../../../../Components/Btn'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { REGEX, NAME_URL_LOGIN, TITLE_MENU } from '../../../../dataDefault'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { login, identify } = NAME_URL_LOGIN
  const { DASHBOARD } = TITLE_MENU

  const initialValue = {
    email: '',
    password: '',
    title: 'dashboard'
  }

  const initialErMes = {
    email: '',
    password: ''
  }


  const [state, setState] = useState(initialValue)
  const [validate, setValidate] = useState(initialErMes)
  const dataError = useSelector(state => state.login.error)
  const idLogin = sessionStorage.getItem('id')

  useEffect(() => {
    if (idLogin) {
      history.replace(`/${DASHBOARD}`)
    }
  }, [idLogin, history, DASHBOARD])

  const handleOnBlur = e => {
    const { value, name } = e.target

    if ( !value ) {
      setValidate({
        ...validate,
        [name]: 'This field is required to enter *'
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

    dispatch(defaulrError(''))
  }

  const checkValidated = () => {
    const { ...newValidate } = validate

    if (!REGEX.EMAIL.test(state.email)) {
      newValidate.email = 'Please re-enter your email !'
    }

    for (let key in state) {
      if (!state[key]) {
        newValidate[key] = 'This field is required to enter *'
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
      const data = new FormData()
      data.append('email', state.email)
      data.append('password', state.password)
      data.append('title', state.title)

      dispatch(fetchLogin(data))
      .then(data => {
        const { payload } = data

        if (typeof payload === 'object') {
          dispatch(setToken(payload.id))
          dispatch(fetchCarts())

          sessionStorage.setItem('id', payload.id)
          history.replace("/dashboard")
          return
        }

        dispatch(setError(payload))
      })
    }
  }

  return (
    <div className="login">
      <div className="modal-login">
        <h1
          className={`
            modal-login__heading
            ${dataError ? 'mb-1' : 'mb-3'}
          `}
        >
          Login Now
        </h1>

        <p className="valide-label modal-login__text-err">
          { dataError }
        </p>

        <form onSubmit={handleSubmit}>
          <GroupInput
            login
            type="email"
            name="email"
            titleLabel="Email *"

            validateName={validate.email}
            value={state.email}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />

          <GroupInput
            login
            type="password"
            name="password"
            titleLabel="Password *"

            validateName={validate.password}
            value={state.password}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />

          <div className="modal-login__box">
            <span className="modal-text">
              Forgot Password?
            </span>&nbsp;

            <Link
              to={`${login}/${identify}`}
              className="modal-text link-text">
                Click here
            </Link>
          </div>

          <div onClick={handleSubmit}>
            <BtnLogin />
          </div>
        </form>

        {/* <div className="modal-login__box">
          <span className="modal-text">Or Login with</span>

          <span className="box-icon">
            <span className="login-icon icon-facebook fab fa-facebook-f" />
            <span className="login-icon icon-google fab fa-google" />
          </span>
        </div> */}

      </div>
    </div>
  )
}

export default Login
