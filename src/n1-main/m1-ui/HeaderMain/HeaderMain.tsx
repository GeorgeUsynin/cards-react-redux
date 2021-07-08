import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import cls from "./HeaderMain.module.scss"
import {PATH} from "../../App";
import SuperButton from "../common/SuperButton/SuperButton";
import {logoutTC, setPath} from "../../m2-bll/authReducer";
import {useDispatch} from "react-redux";


export const HeaderMain = () => {

    const dispatch = useDispatch()

    const [finalClass, setFinalClass] = useState(cls.active)


    let location = useLocation()

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={cls.headerContainer}>
            <div className={cls.wrapper}>
                <h1 className={cls.logo}>It-incubator</h1>
                <div className={cls.linksContainer}>
                    <div className={cls.linkContainer}>
                        <NavLink to={PATH.PACKS_LIST}
                                 className={location.pathname === PATH.PACKS_LIST ? finalClass : ""}
                                 onMouseEnter={() => setFinalClass("")}
                                 onMouseOut={() => setFinalClass(cls.active)}
                                 tabIndex={1}>Packs
                            list</NavLink>
                    </div>
                    <div className={cls.linkContainer}>
                        <NavLink to={PATH.PROFILE} tabIndex={2}
                                 className={location.pathname === PATH.PROFILE ? finalClass : ""}
                                 onMouseEnter={() => setFinalClass("")}
                                 onMouseOut={() => setFinalClass(cls.active)}
                        >Profile</NavLink>
                    </div>
                </div>
                <div className={cls.buttonContainer}>
                    <SuperButton onClick={onClickHandler} className={cls.logoutBtn}><span>Logout</span></SuperButton>
                </div>
            </div>
        </div>
    )
}