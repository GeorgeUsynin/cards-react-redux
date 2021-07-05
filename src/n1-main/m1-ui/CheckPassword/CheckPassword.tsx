import React from 'react'
import cls from './CheckPassword.module.scss'
import letter from '../../../assets/images/letter.svg'
import { NavLink } from 'react-router-dom'
import {PATH} from "../../App";
import {useDispatch} from "react-redux";
import {setShowEmailCheck} from "../../m2-bll/restorePasswordReducer";

type CheckPasswordType = {
    email: string
}

export const CheckPassword: React.FC<CheckPasswordType> = ({email}) => {

   const dispatch = useDispatch()

    return (
        <div className={cls.checkPasswordContainer}>
            <div className={cls.card}>
                <h2 className={cls.title}>It-incubator</h2>

                <div className={cls.imgContainer}>
                    <img src={letter} alt=""/>
                </div>

                <h3 className={cls.subtitle}>Check email</h3>

                <p className={cls.firstNote}>{`We've sent an Email with instructions to `}<span>{email}</span></p>
                <p className={cls.secondNote}><NavLink to={PATH.LOGIN} onClick={()=>dispatch(setShowEmailCheck(false))}>Try logging in</NavLink> again when you change your password</p>
            </div>
        </div>
    )
}