import React, {ChangeEvent, useState} from 'react'
import cls from './Login.module.css'
import {loginTC} from "../../m2-bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {NavLink, Redirect} from 'react-router-dom';
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";


export const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const errorEmail = email ? '' : 'write your email';
    const errorPassword = password ? '' : 'write your password';
    const [check, setCheck] = useState<boolean>(false)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()



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
            <h1 className={cls.titleLogin}>Login</h1>
            <div className={cls.card}>
                <span className={cls.title}>It-incubator</span>
                <span className={cls.subtitle}>Sign In</span>
                <div>
                    <span className={cls.titleEmail}>Email</span>
                    <SuperInputText
                        className={cls.inputEmail}
                        value={email}
                        type={"text"}
                        onChangeText={setEmail}
                        error={errorEmail}
                        spanClassName={cls.spanErrorEmail}
                    />
                </div>
                <div>
                    <span className={cls.titlePassword}>Password</span>
                    <SuperInputText
                        className={cls.inputPassword}
                        value={password}
                        type={"password"}
                        onChangeText={setPassword}
                        error={errorPassword}
                        spanClassName={cls.spanErrorPassword}
                    />
                </div>
                <div className={cls.checkbox}>
                    <input type={"checkbox"} checked={check} name={"RememberMe"} onChange={onChangeCheck}/>
                    <span>Remember me</span>
                </div>
                <NavLink to={'/restore_password'} className={cls.restorePassword}>Forgot Password</NavLink>
                <SuperButton className={cls.button} onClick={sentData}>Login</SuperButton>
                <span className={cls.newAccount}>Don't have an account</span>
                <NavLink to={'/registration'} className={cls.signUp}>Sign Up</NavLink>
            </div>
        </div>
    )
}