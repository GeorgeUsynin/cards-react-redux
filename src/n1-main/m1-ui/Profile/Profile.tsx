import React, {useEffect} from 'react'
import cls from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {LoginResponseType} from "../../m3-dal/API";
import {Redirect} from 'react-router-dom';
import {isLoggedInApp} from "../../m2-bll/authReducer";
import {UserInfo} from "./UserInfo/UserInfo";
import {UserInfoCards} from "./UserInfoCards/UserInfoCards";
import {Preloader} from "../common/preloader/Preloader";


export const Profile = () => {

    const dispatch = useDispatch()

    const isFetchingAUTH = useSelector<AppRootStateType, boolean>(state => state.auth.isFetching) //isFetching from AUTH reducer!!!
    const isFetchingPROFILE = useSelector<AppRootStateType, boolean>(state => state.profile.isFetching)
    const info = useSelector<AppRootStateType, LoginResponseType>(state => state.profile.informationAboutUser)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!info._id) {
            debugger
            dispatch(isLoggedInApp())
        }
    }, [info._id])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={cls.profileContainer}>
            {
                isFetchingAUTH || isFetchingPROFILE
                    ?
                    <Preloader/>
                    :
                    <div className={cls.card}>
                        <div className={cls.info}>
                            <UserInfo avatar={info.avatar} name={info.name}/>
                            <UserInfoCards publicCardPacksCount={info.publicCardPacksCount}/>
                        </div>
                    </div>
            }
        </div>
    )
}