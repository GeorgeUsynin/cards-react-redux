import React, {useEffect} from 'react'
import cls from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {LoginResponseType} from "../../m3-dal/API";
import {Redirect} from 'react-router-dom';
import {isLoggedInApp} from "../../m2-bll/authReducer";
import {UserInfo} from "./UserInfo/UserInfo";
import {UserInfoCards} from "./UserInfoCards/UserInfoCards";


export const Profile = () => {

    const dispatch = useDispatch()

    const info = useSelector<AppRootStateType, LoginResponseType>(state => state.profile.informationAboutUser)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!info._id) {
            dispatch(isLoggedInApp())
        }
    }, [info._id])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={cls.profileContainer}>
            <div className={cls.card}>
                <div className={cls.info}>
                    <UserInfo avatar={info.avatar} name={info.name}/>
                    <UserInfoCards publicCardPacksCount={info.publicCardPacksCount}/>
                </div>
            </div>
        </div>
    )
}