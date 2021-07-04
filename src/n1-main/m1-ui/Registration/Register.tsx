import React, {useState} from 'react'
import cls from './Register.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {register, setRegisterError} from '../../m2-bll/registerReducer'
import {AppRootStateType} from '../../m2-bll/store'
import SuperInputText from '../common/SuperInput/SuperInputText'
import {Redirect} from "react-router";
import eye from "../../../assets/images/eye.svg";
import {InputTypeType} from "../NewPassword/NewPassword";
import closedEye from "../../../assets/images/closedEye.svg";
import {PATH} from "../App";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {Preloader} from "../common/preloader/Preloader";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Register: React.FC = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must contain from 8 to 15 characters';
            } else if (values.password.length > 15) {
                errors.password = 'Password must contain from 8 to 15 characters';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.password.length !== values.confirmPassword.length) {
                errors.confirmPassword = "Passwords don't match";
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(register(values.email, values.password))
        }
    })

    const error = useSelector<AppRootStateType, string | null>(state => state.register.error)
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.register.isFetching)
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)

    const history = useHistory()

    const [type, setType] = useState<InputTypeType>("password")

    const cancelHandler = () => {
        history.push(PATH.LOGIN)
    }

    const changeTypeHandler = () => {
        type === 'text' ? setType('password') : setType('text')
    }


    // redirect logic
    if (isRegistered) return <Redirect to={PATH.LOGIN}/>

    return (
        <div className={cls.registrationContainer}>
            {
                isFetching
                    ?
                    <Preloader/>
                    :
                    <div className={cls.card}>
                        <h2 className={cls.title}>IT-Incubator</h2>
                        <h3 className={cls.subtitle}>Sign Up</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <label>
                                <p className={cls.titleEmail}>Email</p>
                                <div className={cls.inputContainer}>
                                    <SuperInputText
                                        {...formik.getFieldProps('email')}
                                        className={cls.inputEmailPassword}
                                        type={"text"}
                                        onClick={() => dispatch(setRegisterError(null))}
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
                            </label>
                            <label>
                                <p className={cls.titlePassword}>Password</p>
                                <div className={cls.inputContainer}>
                                    <div className={cls.eye} onClick={changeTypeHandler}><img
                                        src={type === 'password' ? closedEye : eye} alt="eye"/></div>
                                    <SuperInputText
                                        {...formik.getFieldProps('password')}
                                        className={cls.inputEmailPassword}
                                        type={type}
                                        // name={'password'}
                                        // onBlur={formik.handleBlur}
                                        // onChange={formik.handleChange}
                                        // value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ?
                                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null
                                    }
                                </div>
                            </label>
                            <label>
                                <p className={cls.titlePassword}>Confirm Password</p>
                                <div className={cls.inputContainer}>
                                    <div className={cls.eye} onClick={changeTypeHandler}><img
                                        src={type === 'password' ? closedEye : eye} alt="eye"/></div>
                                    <SuperInputText
                                        {...formik.getFieldProps('confirmPassword')}
                                        className={cls.inputEmailPassword}
                                        type={type}
                                        // name={'confirmPassword'}
                                        // onBlur={formik.handleBlur}
                                        // onChange={formik.handleChange}
                                        // value={formik.values.confirmPassword}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                        <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                                </div>
                            </label>

                            <div className={cls.buttonContainer}>
                                <button
                                    className={cls.cancelButton}
                                    onClick={cancelHandler}>
                                    <span>Cancel</span>
                                </button>
                                <button type={"submit"}
                                        className={cls.registerButton}
                                >
                                    <span>Register</span>
                                </button>
                            </div>
                        </form>
                    </div>
            }

        </div>
    )
}