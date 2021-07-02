import React, {useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import cls from './NewPassword.module.scss'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {setNewPassword} from "../../m2-bll/restorePasswordReducer";
import eye from "../../../assets/images/eye.svg";
import closedEye from "../../../assets/images/closedEye.svg";

export type InputTypeType = "password" | "text" | "checkbox"

export const NewPassword = () => {

    const [type, setType] = useState<InputTypeType>("password")

    const isNewPasswordCreated = useSelector<AppRootStateType, boolean>(state => state.restorePassword.isNewPasswordCreated)

    const error = useSelector<AppRootStateType, null | string>(state => state.restorePassword.error)

    const dispatch = useDispatch()

    const {token} = useParams<{ token: string }>();

    const [password, setPassword] = useState('')

    const onChangePassword = (password: string) => {
        setPassword(password)
    }

    const onClickSend = () => {
        if (token)
            dispatch(setNewPassword(password, token))
    }

    const changeTypeHandler = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    if (isNewPasswordCreated) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={cls.newPasswordContainer}>
            <div className={cls.card}>
                <h2 className={cls.title}>It-incubator</h2>

                <h3 className={cls.subtitle}>Create new Password</h3>

                <div className={cls.inputContainer}>
                    <div className={cls.eye} onClick={changeTypeHandler}><img
                        src={type === 'password' ? closedEye : eye} alt="eye"/></div>
                    <SuperInputText
                        className={cls.inputPassword}
                        type={type}
                        placeholder={'Password'}
                        value={password}
                        onChangeText={onChangePassword}/>
                </div>


                <p>{error}</p>

                <p className={cls.note}>Create new password and we will send you further instructions to email</p>

                <div className={cls.buttonContainer}>
                    <SuperButton
                        onClick={onClickSend}
                        className={cls.button}
                    >
                        <span>Send instructions</span>
                    </SuperButton>
                </div>

            </div>

        </div>
    )
}