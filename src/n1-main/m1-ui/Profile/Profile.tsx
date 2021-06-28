import React from 'react'
import cls from './Profile.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {LoginResponseType} from "../../m3-dal/API";
import {Redirect} from "react-router-dom";


export const Profile = () => {
    const info = useSelector<AppRootStateType, LoginResponseType>(state => state.profile.informationAboutUser)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div className={cls.profileContainer}>
            <h1>Profile</h1>
            <div className={cls.card}>
                <div className={cls.infoCards}>
                    <div className={cls.infoUser}>
                        <img className={cls.userPhoto} src={info.avatar ? info.avatar : ""}/>
                        <span className={cls.userName}>{info.name}</span>
                    </div>
                    <span className={cls.userCards}>Number of cards: {info.publicCardPacksCount}</span>
                </div>
            </div>
        </div>
    )
}