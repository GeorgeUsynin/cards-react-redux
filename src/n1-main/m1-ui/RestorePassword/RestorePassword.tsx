import React, {useState} from 'react'
import cls from './RestorePassword.module.css'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CheckPassword} from "../CheckPassword/CheckPassword";
import {restorePassword} from "../../m2-bll/restorePasswordReducer";


export const RestorePassword = () => {

    const showEmailCheck = useSelector<AppRootStateType, boolean>(state => state.restorePassword.showEmailCheck)

    const error = useSelector<AppRootStateType, null | string>(state => state.restorePassword.error)

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

    const onChangeEmail = (email: string) => {
        setEmail(email)
    }

    const onClickSend = () => {
        dispatch(restorePassword(email))
    }

    return (
        <div className={cls.restorePasswordContainer}>
            {
                showEmailCheck
                    ?
                    <CheckPassword email={email}/>
                    :
                    <div>

                        <h2>It-incubator</h2>

                        <h3>Forgot your password?</h3>

                        <SuperInputText value={email} onChangeText={onChangeEmail}/>

                        <p>{error}</p>

                        <p>Enter your email address and we will send you further instructions</p>

                        <SuperButton onClick={onClickSend}>Send instructions</SuperButton>

                        <p>Did you remember your password?</p>

                        <NavLink to={'/login'}>Try logging in</NavLink>

                    </div>
            }

        </div>
    )
}