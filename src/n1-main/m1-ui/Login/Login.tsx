import React, {ChangeEvent, FormEvent, useState} from 'react'
import cls from './Login.module.css'
import {loginTC} from "../../m2-bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {NavLink, Redirect} from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [check, setCheck] = useState<boolean>(false)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setCheck(e.currentTarget.checked)
    }

    const sentData = () => {
        dispatch(loginTC({email, password, check}))
        setEmail("")
        setPassword("")
        setCheck(false)
    }
    if (isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={cls.loginContainer}>
            <h1>Login</h1>
            <div className={cls.card}>
                <span className={cls.title}>It-incubator</span>
                <span className={cls.subtitle}>Sign In</span>
                <div>
                    <span className={cls.titleEmail}>Email</span>
                    <input className={cls.inputEmail} type={"text"} value={email} onChange={onChangeEmail}/>
                </div>
                <div>
                    <span className={cls.titlePassword}>Password</span>
                    <input className={cls.inputPassword} type={"password"} value={password}
                           onChange={onChangePassword}/>
                </div>
                <div className={cls.checkbox}>
                    <input type={"checkbox"} checked={check} name={"RememberMe"} onChange={onChangeCheck}/>
                    <span>Remember me</span>
                </div>
                <NavLink to={'/restore_password'} className={cls.restorePassword}>Forgot Password</NavLink>
                <button className={cls.button} onClick={sentData}>Login</button>
                <span className={cls.newAccount}>Don't have an account</span>
                <NavLink to={'/registration'} className={cls.signUp}>Sign Up</NavLink>
            </div>
        </div>
    )
}