import React, { useState } from 'react'
import cls from './Register.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { register, setRegisterError, setRegisterLoading } from '../../m2-bll/registerReducer'
import { AppRootStateType } from '../../m2-bll/store'
import preloader from '../common/preloader/Spinner-2.gif'
import SuperInputText from '../common/SuperInput/SuperInputText'

export const Register: React.FC = () => {
  const dispatch = useDispatch()
  const error = useSelector<AppRootStateType, string | null>(state => state.register.error)
  const isFetching = useSelector<AppRootStateType, boolean>(state => state.register.isFetching)

  let [email, setEmail] = useState<string>('')
  let [pass, setPass] = useState<string>('')
  let [confirmPass, setConfirmPass] = useState<string>('')
  let [validateEmailError, setValidateError] = useState<string>('')
  let [validatePasswordError, setValidatePasswordError] = useState<string>('')

  useEffect(() => {
    const error = null
    dispatch(setRegisterError(error))
  }, [dispatch])

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setEmail(value)
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setValidateError('invalid email')
    } else {
      setValidateError('')
    }
  }
  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setPass(value)
    if (value.length < 8 || value.length > 15) {
      setValidatePasswordError('invalid password length')
    } else {
      setValidatePasswordError('')
    }
  }

  const cancelHandler = () => {
    setEmail('')
    setPass('')
    setConfirmPass('')
  }
  const registerHandler = () => {
    dispatch(setRegisterLoading(true))
    if (pass === confirmPass) {
      dispatch(register(email, pass))
    } else {
      dispatch(setRegisterLoading(false))
      dispatch(setRegisterError('password don\'t match'))
    }
  }

  return (
    <div className={cls.registrationContainer}>
      <div className={cls.content}>
        <h2 className={cls.title}>IT-Incubator</h2>
        <h2 className={cls.title}>Sign Up</h2>
        <div className={cls.form}>
          <label>
            <div className={cls.inputTitle}>Email</div>
            <div className={cls.inputContainer}>
              <SuperInputText
                className={cls.input}
                value={email}
                type="email"
                error={validateEmailError}
                onChange={changeEmailHandler}
              />
            </div>
          </label>
          <label>
            <div className={cls.inputTitle}>Password</div>
            <div className={cls.inputContainer}>
              <SuperInputText
                className={cls.input}
                value={pass}
                type="password"
                error={validatePasswordError}
                onChange={changePasswordHandler}
              />
            </div>
          </label>
          <label>
            <div className={cls.inputTitle}>Confirm Password</div>
            <div className={cls.inputContainer}>
              <SuperInputText
                className={cls.input}
                value={confirmPass}
                type="password"
                onChange={(e) => setConfirmPass(e.currentTarget.value)}
              />
            </div>
          </label>
        </div>
        <div className={cls.info}>
          {
            isFetching ?
              <div>
                <img className={cls.loader} src={preloader} alt="preloader"/>
              </div>
              : error && <div className={cls.error}>{error}</div>}
        </div>
        <div className={cls.buttonsContainer}>
          <button className={cls.cancelBtn} onClick={cancelHandler}>Cancel
          </button>
          <button
            className={isFetching ? `${cls.registerBtn} ${cls.disable}` : cls.registerBtn}
            disabled={isFetching}
            onClick={registerHandler}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}