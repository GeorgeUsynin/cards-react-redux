import React, {useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import cls from './NewPassword.module.scss'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {restorePassword, setNewPassword, setRestorePasswordError} from "../../m2-bll/restorePasswordReducer";
import eye from "../../../assets/images/eye.svg";
import closedEye from "../../../assets/images/closedEye.svg";
import {PATH} from "../../App";
import {useFormik} from "formik";
import {setLoginError} from "../../m2-bll/authReducer";
import {Preloader} from "../common/preloader/Preloader";

export type InputTypeType = "password" | "text" | "checkbox"


type FormikErrorType = {
    password?: string
}

export const NewPassword = () => {

    const dispatch = useDispatch()

    const [type, setType] = useState<InputTypeType>("password")

    const isNewPasswordCreated = useSelector<AppRootStateType, boolean>(state => state.restorePassword.isNewPasswordCreated)

    const isFetching = useSelector<AppRootStateType, boolean>(state => state.restorePassword.isFetching)

    const error = useSelector<AppRootStateType,string | null>(state=>state.restorePassword.error)

    const {token} = useParams<{ token: string }>();

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must contain from 8 to 15 characters';
            } else if (values.password.length > 15) {
                errors.password = 'Password must contain from 8 to 15 characters';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setNewPassword(values.password, token))
        }
    })

    const changeTypeHandler = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    if (isNewPasswordCreated) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={cls.newPasswordContainer}>
            {
                isFetching
                    ?
                    <Preloader/>
                    :
                    <div className={cls.card}>
                        <h2 className={cls.title}>It-incubator</h2>
                        <h3 className={cls.subtitle}>Create new Password</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={cls.inputContainer}>
                                <div className={cls.eye} onClick={changeTypeHandler}><img
                                    src={type === 'password' ? closedEye : eye} alt="eye"/></div>
                                <SuperInputText
                                    {...formik.getFieldProps('password')}
                                    className={cls.inputPassword}
                                    onClick={() => dispatch(setRestorePasswordError(null))}
                                    type={type}
                                    placeholder={'Password'}
                                    // name={'password'}
                                    // onBlur={formik.handleBlur}
                                    // onChange={formik.handleChange}
                                    // value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ?
                                    <div style={{color: 'red'}}>{formik.errors.password}</div> : <div style={{color: 'red', margin:'0px 30px'}}>{error}</div>
                                }
                            </div>
                            <p className={cls.note}>Create new password and press the button below</p>

                            <div className={cls.buttonContainer}>
                                <SuperButton
                                    className={cls.button}
                                    type={'submit'}
                                >
                                    <span>Create</span>
                                </SuperButton>
                            </div>
                        </form>
                    </div>
            }
        </div>
    )
}