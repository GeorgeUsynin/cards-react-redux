import React, { useEffect, useState } from 'react'
import cls from './Register.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { register, setRegisterError, setRegisterLoading } from '../../m2-bll/registerReducer'
import { AppRootStateType } from '../../m2-bll/store'
import preloader from '../common/preloader/Spinner-2.gif'

export const Register: React.FC = () => {
  const dispatch = useDispatch()
  const error = useSelector<AppRootStateType, string | null>(state => state.register.error)
  const isFetching = useSelector<AppRootStateType, boolean>(state => state.register.isFetching)
  
  let [email, setEmail] = useState<string>('')
  let [pass, setPass] = useState<string>('')
  let [confirmPass, setConfirmPass] = useState<string>('')
  
  useEffect(() => {
    const error = null
    dispatch(setRegisterError(error))
  }, [dispatch])
  
  const cancelHandler = () => {
    console.log('cancel')
  }
  const registerHandler = () => {
    dispatch(setRegisterLoading(true))
    if (pass === confirmPass) {
      dispatch(register(email, pass))
    } else {
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
            <input className={cls.input} type="email" value={email}
                   onChange={(e) => setEmail(e.currentTarget.value)}/>
          </label>
          <label>
            <div className={cls.inputTitle}>Password</div>
            <input className={cls.input} type="password" value={pass}
                   onChange={(e) => setPass(e.currentTarget.value)}/>
          </label>
          <label>
            <div className={cls.inputTitle}>Confirm Password</div>
            <input className={cls.input} type="password" value={confirmPass}
                   onChange={(e) => setConfirmPass(e.currentTarget.value)}/>
          </label>
        </div>
        <div className={cls.info}>
          {
            isFetching ?
              <div>
                <img className={cls.loader} src={preloader} alt='preloader'/>
              </div>
              : error ? <div className={cls.error}>{error}</div> : null}
        </div>
        <div className={cls.buttonsContainer}>
          <button className={cls.cancelBtn} onClick={cancelHandler}>Cancel
          </button>
          <button className={cls.registerBtn} onClick={registerHandler}>Register</button>
        </div>
      </div>
    </div>
  )
}