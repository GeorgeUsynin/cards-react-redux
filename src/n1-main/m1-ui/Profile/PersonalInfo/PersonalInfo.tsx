import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cls from './PersonalInfo.module.scss'
import {editUserProfileTC} from "../../../m2-bll/profileReducer";
import {PATH} from "../../../App";
import {AppRootStateType} from "../../../m2-bll/store";
import defaultAvatar from '../../../../assets/images/avatar.png'
import SuperInputText from "../../common/SuperInput/SuperInputText";
import {isLoggedInApp} from "../../../m2-bll/authReducer";
import {useHistory} from 'react-router-dom';
import {Preloader} from "../../common/preloader/Preloader";

export const PersonalInfo: React.FC = () => {
    const dispatch = useDispatch()

    let history = useHistory()

    const id = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const name = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser.name)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser.avatar)


    useEffect(() => {
        if (!id) {
            dispatch(isLoggedInApp())
        }
    }, [])

    let [ava, setAva] = useState<string>('')
    let [nickname, setNickname] = useState<string>(name)

    const cancelHandler = () => {
        history.push(PATH.PROFILE)
    }
    const saveHandler = () => {
        dispatch(editUserProfileTC(nickname, ava))
        history.push(PATH.PROFILE)
    }

    return (
            <div className={cls.infoContainer}>
                <div className={cls.card}>
                    <h2 className={cls.title}>Personal Inforamtion</h2>
                    <div className={cls.imgWrapper}>
                        <img src={avatar ? avatar : defaultAvatar} alt='profile_photo'/>
                    </div>
                    <label>
                        <p className={cls.titleEmail}>Nickname</p>
                        <div className={cls.inputContainer}>
                            <SuperInputText
                                className={cls.inputNicknameAvatar}
                                value={nickname}
                                type={"text"}
                                onChangeText={setNickname}
                                // error={errorEmail}
                            />
                        </div>
                    </label>
                    <label>
                        <p className={cls.titleEmail}>Avatar</p>
                        <div className={cls.inputContainer}>
                            <SuperInputText
                                className={cls.inputNicknameAvatar}
                                value={ava}
                                type={"text"}
                                onChangeText={setAva}
                                // error={errorEmail}
                            />
                        </div>
                    </label>
                    <div className={cls.buttonContainer}>
                        <button
                            className={cls.cancelButton}
                            onClick={cancelHandler}>
                            <span>Cancel</span>
                        </button>
                        <button
                            className={cls.registerButton}
                            onClick={saveHandler}
                        >
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
    )
}