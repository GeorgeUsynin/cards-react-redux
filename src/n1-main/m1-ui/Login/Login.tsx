import React, {ChangeEvent, useState} from 'react'
import cls from './Login.module.scss'
import {loginTC} from "../../m2-bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {NavLink, Redirect} from 'react-router-dom';
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import eye from '../../../assets/images/eye.svg'
import {InputTypeType} from "../NewPassword/NewPassword";
import closedEye from "../../../assets/images/closedEye.svg";


export const Login = () => {

    const [type, setType] = useState<InputTypeType>("password")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const errorEmail = email ? '' : 'write your email';
    const errorPassword = password ? '' : 'write your password';
    const [check, setCheck] = useState<boolean>(false)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const changeTypeHandler = () => {
        type === 'text' ? setType('password') : setType('text')
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
            <div className={cls.card}>
                <h2 className={cls.title}>It-incubator</h2>
                <h3 className={cls.subtitle}>Sign In</h3>
                <p className={cls.titleEmail}>Email</p>
                <div className={cls.inputContainer}>
                    <SuperInputText
                        className={cls.inputEmailPassword}
                        value={email}
                        type={"text"}
                        onChangeText={setEmail}
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
                        onChangeText={setPassword}
                        // error={errorPassword}
                        spanClassName={cls.spanErrorPassword}
                    />
                </div>
                <div className={cls.checkbox}>
                    <input type={"checkbox"} checked={check} name={"RememberMe"} onChange={onChangeCheck}/>
                    <span className={cls.rememberMe}>Remember me</span>
                </div>
                <NavLink to={'/restore_password'} className={cls.restorePassword}>Forgot Password</NavLink>
                <div className={cls.buttonContainer}>
                    <SuperButton className={cls.button} onClick={sentData}><span>Login</span></SuperButton>
                </div>
                <p className={cls.newAccount}>Don't have an account</p>
                <div className={cls.signUp}>
                    <NavLink to={'/registration'}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}