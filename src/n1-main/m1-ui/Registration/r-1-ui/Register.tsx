import React, { useState } from 'react'
import cls from './Register.module.css'
import { register } from '../r-2-bll/registerThunk'
import { useDispatch } from 'react-redux'

interface IRegisterProps {

}

export const Register: React.FC<IRegisterProps> = ({}) => {
  // const emailInputRef = React.useRef<HTMLInputElement>(null)
  // const passwordInputRef = React.useRef<HTMLInputElement>(null)
  // const confirmPassInputRef = React.useRef<HTMLInputElement>(null)
  
  const dispatch = useDispatch()
  
  let [email, setEmail] = useState<string>('')
  let [pass, setPass] = useState<string>('')
  let [confirmPass, setConfirmPass] = useState<string>('')
  let [error, setError] = useState<string | null>(null)
  
  const cancelHandler = () => {
    console.log('cancel')
  }
  const registerHandler = () => {
    debugger
    console.log('register')
    if (pass === confirmPass) {
      dispatch(register(email, pass))
      setError(null)
    } else {
      setError('password don\'t match')
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
            <input className={cls.input} type="email"  value={email}
                   onChange={(e) => setEmail(e.currentTarget.value)}/>
          </label>
          <label>
            <div className={cls.inputTitle}>Password</div>
            <input className={cls.input} type="password"  value={pass}
                   onChange={(e) => setPass(e.currentTarget.value)}/>
          </label>
          <label>
            <div className={cls.inputTitle}>Confirm Password</div>
            <input className={cls.input} type="password"  value={confirmPass}
                   onChange={(e) => setConfirmPass(e.currentTarget.value)}/>
          </label>
        </div>
        <div className={cls.info}>
          {error && <div className={cls.error}>{error}</div>}
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