import React from 'react'
import cls from './CheckPassword.module.scss'
import letter from '../../../assets/images/letter.svg'

type CheckPasswordType = {
    email: string
}

export const CheckPassword: React.FC<CheckPasswordType> = ({email}) => {
    return (
        <div className={cls.checkPasswordContainer}>
            <div className={cls.card}>
                <h2 className={cls.title}>It-incubator</h2>

                <div className={cls.imgContainer}>
                    <img src={letter} alt="picture"/>
                </div>

                <h3 className={cls.subtitle}>Check email</h3>

                <p className={cls.note}>{`We've sent an Email with instructions to `}<span>{email}</span></p>
            </div>
        </div>
    )
}