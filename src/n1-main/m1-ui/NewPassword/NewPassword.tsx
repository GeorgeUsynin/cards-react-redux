import React, {useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import cls from './NewPassword.module.css'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {setNewPassword} from "../../m2-bll/restorePasswordReducer";


export const NewPassword = () => {

    const isNewPasswordCreated = useSelector<AppRootStateType, boolean>(state => state.restorePassword.isNewPasswordCreated)

    const error = useSelector<AppRootStateType, null | string>(state => state.restorePassword.error)

    const dispatch = useDispatch()

    const {token} = useParams<{ token?: string }>();

    const [password, setPassword] = useState('')

    const onChangePassword = (password: string) => {
        setPassword(password)
    }

    const onClickSend = () => {
        if (token)
            dispatch(setNewPassword(password, token))
    }

    if (isNewPasswordCreated) {
        return <Redirect to={'/login'}/>
    }


    return (
        <div className={cls.newPasswordContainer}>

            <h2>It-incubator</h2>

            <h3>Create new Password</h3>

            <SuperInputText value={password} onChangeText={onChangePassword}/>

            <p>{error}</p>

            <p>Create new password and we will send you further instructions to email</p>

            <SuperButton onClick={onClickSend}>Send instructions</SuperButton>

        </div>
    )
}