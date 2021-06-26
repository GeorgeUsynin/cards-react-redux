import React from 'react'
import cls from './Registration.module.css'


export const Registration = () => {
  return (
    <div className={cls.registrationContainer}>
      <div className={cls.content}>
        <h2 className={cls.title}>IT-Incubator</h2>
        <h2 className={cls.title}>Sign Up</h2>
        <div className={cls.form}>
          <label>
            <div className={cls.inputTitle}>Email</div>
            <input className={cls.input} type="email"/>
          </label>
          <label>
            <div className={cls.inputTitle}>Password</div>
            <input className={cls.input} type="password"/>
          </label>
          <label>
            <div className={cls.inputTitle}>Confirm Password</div>
            <input className={cls.input} type="password"/>
          </label>
        </div>
        <div className={cls.buttonsContainer}>
          <div>
            <button className={cls.cancelBtn}>Cancel</button>
          </div>
          <div>
            <button className={cls.registerBtn}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}