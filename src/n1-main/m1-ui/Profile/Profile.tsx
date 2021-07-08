import React, {useEffect} from 'react'
import cls from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {Redirect} from 'react-router-dom';
import {isLoggedInApp} from "../../m2-bll/authReducer";
import {UserInfo} from "./UserInfo/UserInfo";
import {UserInfoCards} from "./UserInfoCards/UserInfoCards";
import {Preloader} from "../common/preloader/Preloader";


export const Profile = () => {

    const dispatch = useDispatch()

    const isFetchingAUTH = useSelector<AppRootStateType, boolean>(state => state.auth.isFetching) //isFetching from AUTH reducer!!!
    const isFetchingPROFILE = useSelector<AppRootStateType, boolean>(state => state.profile.isFetching)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser.avatar)
    const name = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser.name)
    const publicCardPacksCount = useSelector<AppRootStateType, number>(state => state.profile.informationAboutUser.publicCardPacksCount)
    const id = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!id) {
            dispatch(isLoggedInApp())
        }
    }, [id,dispatch])

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
                            <UserInfo avatar={avatar} name={name}/>
                            <UserInfoCards publicCardPacksCount={publicCardPacksCount}/>
                        </div>
                    </div>
            }
        </div>
    )
}