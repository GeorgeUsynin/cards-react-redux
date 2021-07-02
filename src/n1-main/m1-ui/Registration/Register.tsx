import React, {ChangeEvent, useEffect, useState} from 'react'
import cls from './Register.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {register, setRegisterError, setRegisterLoading} from '../../m2-bll/registerReducer'
import {AppRootStateType} from '../../m2-bll/store'
import preloader from '../common/preloader/Spinner-2.gif'
import SuperInputText from '../common/SuperInput/SuperInputText'
import {Redirect} from "react-router";
import eye from "../../../assets/images/eye.svg";
import {InputTypeType} from "../NewPassword/NewPassword";
import closedEye from "../../../assets/images/closedEye.svg";

export const Register: React.FC = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.register.error)
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.register.isFetching)

    const [type, setType] = useState<InputTypeType>("password")
    let [email, setEmail] = useState<string>('')
    let [password, setPassword] = useState<string>('')
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
        setPassword(value)
        if (value.length < 8 || value.length > 15) {
            setValidatePasswordError('invalid password length')
        } else {
            setValidatePasswordError('')
        }
    }

    const cancelHandler = () => {
        setEmail('')
        setPassword('')
        setConfirmPass('')
    }

    const changeTypeHandler = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    const registerHandler = () => {
        dispatch(setRegisterLoading(true))
        if (password === confirmPass) {
            dispatch(register(email, password))
        } else {
            dispatch(setRegisterLoading(false))
            dispatch(setRegisterError('password don\'t match'))
        }
    }
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    // redirect logic
    if (isRegistered) return <Redirect to={'/login'}/>


    return (
        <div className={cls.registrationContainer}>
            <div className={cls.card}>
                <h2 className={cls.title}>IT-Incubator</h2>
                <h3 className={cls.subtitle}>Sign Up</h3>
                <p className={cls.titleEmail}>Email</p>
                <div className={cls.inputContainer}>
                    <SuperInputText
                        className={cls.inputEmailPassword}
                        value={email}
                        type={"text"}
                        onChange={changeEmailHandler}
                        // error={errorEmail}
                        spanClassName={cls.spanErrorEmail}
                    />
                </div>
                <p className={cls.titlePassword}>Password</p>
                <div className={cls.inputContainer}>
                    <div className={cls.eye} onClick={changeTypeHandler}><img src={type === 'password' ? closedEye : eye} alt="eye"/></div>
                    <SuperInputText
                        className={cls.inputEmailPassword}
                        value={password}
                        type={type}
                        onChange={changePasswordHandler}
                        // error={errorPassword}
                        spanClassName={cls.spanErrorPassword}
                    />
                </div>
                <p className={cls.titlePassword}>Confirm Password</p>
                <div className={cls.inputContainer}>
                    <div className={cls.eye} onClick={changeTypeHandler}><img src={type === 'password' ? closedEye : eye} alt="eye"/></div>
                    <SuperInputText
                        className={cls.inputEmailPassword}
                        value={confirmPass}
                        type={type}
                        onChange={(e) => setConfirmPass(e.currentTarget.value)}
                        // error={errorPassword}
                        spanClassName={cls.spanErrorPassword}
                    />
                </div>
                {/*<div className={cls.info}>*/}
                {/*  {*/}
                {/*    isFetching ?*/}
                {/*      <div>*/}
                {/*        <img className={cls.loader} src={preloader} alt="preloader"/>*/}
                {/*      </div>*/}
                {/*      : error && <div className={cls.error}>{error}</div>}*/}
                {/*</div>*/}
                <div className={cls.buttonContainer}>
                    <button 
                        className={cls.cancelButton}
                        onClick={cancelHandler}>
                        <span>Cancel</span>
                    </button>
                    <button
                        className={cls.registerButton}
                        onClick={registerHandler}
                    >
                        <span>Register</span>
                    </button>
                </div>
            </div>
        </div>
    )
}