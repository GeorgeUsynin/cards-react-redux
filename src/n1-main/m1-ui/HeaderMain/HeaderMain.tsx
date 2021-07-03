import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import cls from "./HeaderMain.module.scss"
import {PATH} from "../App";


export const HeaderMain = () => {

    let location = useLocation()

    const activeNavLinkClass = location.pathname === PATH.PROFILE ? cls.active : ""

    return (
        <div className={cls.headerContainer}>
            <div className={cls.wrapper}>
                <h1 className={cls.logo}>It-incubator</h1>
                <div className={cls.linksContainer}>
                    <div className={cls.linkContainer}>
                        <NavLink to={PATH.PACKS_LIST} tabIndex={1}>Packs list</NavLink>
                    </div>
                    <div className={cls.linkContainer}>
                        <NavLink to={PATH.PROFILE} tabIndex={2} className={activeNavLinkClass}>Profile</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}