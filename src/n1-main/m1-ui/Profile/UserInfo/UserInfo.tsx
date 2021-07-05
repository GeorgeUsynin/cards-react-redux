import React from "react";
import cls from "./UserInfo.module.scss"
import defaultAvatar from "../../../../assets/images/avatar.png";
import {NavLink} from "react-router-dom";


type UserInfoType = {
    avatar?: string
    name: string
}

export const UserInfo: React.FC<UserInfoType> = ({avatar, name}) => {
    return (
        <div className={cls.infoUser}>
            <img className={cls.userPhoto} src={avatar ? avatar : defaultAvatar} alt={""}/>
            <p className={cls.userName}>{name}</p>
            <div className={cls.editProfileWrapper}>
                <NavLink to={'/information_about_user'}>Edit
                    profile</NavLink>
            </div>
        </div>
    )
}