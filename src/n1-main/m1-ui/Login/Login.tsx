import React, {useState} from 'react'
import cls from './Login.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../m2-bll/store';
import {NavLink, Redirect} from 'react-router-dom';
import SuperInputText from '../common/SuperInput/SuperInputText';
import SuperButton from '../common/SuperButton/SuperButton';
import eye from '../../../assets/images/eye.svg'
import {InputTypeType} from '../NewPassword/NewPassword';
import closedEye from '../../../assets/images/closedEye.svg';
import {PATH} from '../../App';
import {FormikHelpers, useFormik} from 'formik';
import {loginTC, setLoginError} from '../../m2-bll/authReducer';
import {Preloader} from '../common/preloader/Preloader';

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()

    const error = useSelector<AppRootStateType, string | null>(state => state.auth.error)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const isFetching = useSelector<AppRootStateType, boolean>(state => state.auth.isFetching)

    const [type, setType] = useState<InputTypeType>('password')


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {email: 'Required'}
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                return {email: 'Invalid email address'}
            }
            if (!values.password) {
                return {password: 'Required'}
            } else if (values.password.length < 8) {
                return {password: 'Password must contain from 8 to 15 characters'}
            } else if (values.password.length > 15) {
                return {password: 'Password must contain from 8 to 15 characters'}
            }
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.error.match(/user/)) {
                    debugger
                    formikHelpers.setFieldError('email', action.payload?.error)
                } else if (action.payload?.error.match(/password/)) {
                    formikHelpers.setFieldError('password', action.payload?.error)
                }
            }
        }
    })

    const changeTypeHandler = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={cls.loginContainer}>
            {
                isFetching
                    ?
                    <Preloader/>
                    :
                    <div className={cls.card}>
                        <h2 className={cls.title}>It-incubator</h2>
                        <h3 className={cls.subtitle}>Sign In</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <label>
                                <p className={cls.titleEmail}>Email</p>
                                <div className={cls.inputContainer}>
                                    <SuperInputText
                                        {...formik.getFieldProps('email')}
                                        className={cls.inputEmailPassword}
                                        type={'text'}
                                        onClick={() => dispatch(setLoginError(null))}
                                        // name={'email'}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.email}
                                    />
                                    {
                                        formik.touched.email &&
                                        formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> :
                                            <div style={{color: 'red'}}>{error?.match(/user/) ? error : ''}</div>
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
                                        onClick={() => dispatch(setLoginError(null))}
                                        type={type}
                                        // name={'password'}
                                        // onBlur={formik.handleBlur}
                                        // onChange={formik.handleChange}
                                        // value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ?
                                        <div style={{color: 'red'}}>{formik.errors.password}</div> :
                                        <div style={{color: 'red'}}>{error?.match(/password/) ? error : ''}</div>
                                    }
                                </div>
                            </label>
                            <div className={cls.checkbox}>
                                <label>
                                    <SuperInputText
                                        {...formik.getFieldProps('rememberMe')}
                                        type={'checkbox'}
                                        // name={'rememberMe'}
                                        // onChange={formik.handleChange}
                                        // checked={formik.values.rememberMe}
                                    />
                                    <span className={cls.rememberMe}>Remember me</span>
                                </label>
                            </div>
                            <NavLink to={'/restore_password'} className={cls.restorePassword}>Forgot Password</NavLink>
                            <div className={cls.buttonContainer}>
                                <SuperButton className={cls.button} type={'submit'}><span>Login</span></SuperButton>
                            </div>
                        </form>
                        <p className={cls.newAccount}>Don't have an account</p>
                        <div className={cls.signUp}>
                            <NavLink to={'/registration'}>Sign Up</NavLink>
                        </div>
                    </div>
            }
        </div>
    )
}