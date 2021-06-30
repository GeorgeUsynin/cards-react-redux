import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import styles from './PersonalInfo.module.css'
import {editUserNameTC} from "../../../m2-bll/profileReducer";

export const PersonalInfo: React.FC = () => {
    const dispatch = useDispatch()

    let [email, setEmail] = useState<string>('')
    let [nickname, setNickname] = useState<string>('')
    // let [error, setError] = useState<string | null>(null)

    const cancelHandler = () => {
        console.log('cancel')
    }
    const saveHandler = () => {
        dispatch(editUserNameTC(nickname))
        //     debugger
        console.log('save')
        //     if (pass === confirmPass) {
        //         dispatch(register(email, pass))
        //         setError(null)
        //     } else {
        //         setError('password don\'t match')
        //     }
    }

    return (
        <div className={styles.infoContainer}>
            <div>
                <h2>Personal Inforamtion</h2>
                <div>
                    <img src={''} alt='profile_photo'/>
                </div>
                <div className={styles.form}>
                    <label>
                        <div className={styles.inputTitle}>Nickname</div>
                        <input className={styles.input} type="text" value={nickname}
                               onChange={(e) => setNickname(e.currentTarget.value)}/>
                    </label>
                    <label>
                        <div className={styles.inputTitle}>Email</div>
                        <input className={styles.input} type="password" value={email}
                               onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </label>
                </div>
                {/*<div className={cls.info}>*/}
                {/*    {error && <div className={cls.error}>{error}</div>}*/}
                {/*</div>*/}
                <div className={styles.buttonsContainer}>
                    <button className={styles.cancelBtn} onClick={cancelHandler}>Cancel
                    </button>
                    <button className={styles.saveBtn} onClick={saveHandler}>Save</button>
                </div>
            </div>
        </div>
    )
}