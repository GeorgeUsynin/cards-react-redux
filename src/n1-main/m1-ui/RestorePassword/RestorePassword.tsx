import React from 'react'
import cls from './RestorePassword.module.scss'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CheckPassword} from "../CheckPassword/CheckPassword";
import {restorePassword, setRestorePasswordError} from "../../m2-bll/restorePasswordReducer";
import {useFormik} from "formik";
import {Preloader} from "../common/preloader/Preloader";

type FormikErrorType = {
    email?: string
}

export const RestorePassword = () => {

    const showEmailCheck = useSelector<AppRootStateType, boolean>(state => state.restorePassword.showEmailCheck)

    const error = useSelector<AppRootStateType, null | string>(state => state.restorePassword.error)

    const isFetching = useSelector<AppRootStateType, boolean>(state => state.restorePassword.isFetching)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(restorePassword(values.email))
        }
    })

    return (
        <div className={cls.restorePasswordContainer}>
            {
                isFetching
                    ?
                    <Preloader/>
                    :
                    showEmailCheck
                        ?
                        <CheckPassword email={formik.values.email}/>
                        :
                        <div className={cls.card}>
                            <h2 className={cls.title}>It-incubator</h2>
                            <h3 className={cls.subtitle}>Forgot your password?</h3>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={cls.inputContainer}>
                                    <SuperInputText
                                        {...formik.getFieldProps('email')}
                                        className={cls.inputEmail}
                                        type={"text"}
                                        onClick={() => dispatch(setRestorePasswordError(null))}
                                        // name={'email'}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.email}
                                    />
                                    {
                                        formik.touched.email &&
                                        formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> :
                                            <div style={{color: 'red'}}>{error}</div>
                                    }
                                </div>
                                <p className={cls.firstNote}>Enter your email address and we will send
                                    you further
                                    instructions</p>
                                <div className={cls.buttonContainer}>
                                    <SuperButton className={cls.button}
                                                 type={'submit'}><span>Send Instructions</span></SuperButton>
                                </div>
                            </form>
                            <p className={cls.secondNote}>Did you remember your password?</p>
                            <div className={cls.reLogin}>
                                <NavLink to={'/login'}>Try logging in</NavLink>
                            </div>
                        </div>
            }
        </div>
    )
}
