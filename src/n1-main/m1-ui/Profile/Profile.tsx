import React, {useEffect} from 'react'
import cls from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {LoginResponseType} from "../../m3-dal/API";
import {NavLink, Redirect} from 'react-router-dom';
import SuperButton from "../common/SuperButton/SuperButton";
import {isLoggedInApp, logoutTC} from "../../m2-bll/authReducer";



export const Profile = () => {

    const dispatch = useDispatch()

    const info = useSelector<AppRootStateType, LoginResponseType>(state => state.profile.informationAboutUser)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!info._id) {
            dispatch(isLoggedInApp())
        }
    })

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

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
                        <div>
                            <SuperButton onClick={onClickHandler} className={cls.logoutBtn}>Logout</SuperButton>
                        </div>
                        <div>
                            <NavLink to={'/profile/information_about_user'} className={cls.editProfile}>Edit Profile</NavLink>
                        </div>
                    </div>
                    <span className={cls.userCards}>Number of cards: {info.publicCardPacksCount}</span>
                </div>
            </div>
        </div>
    )
}