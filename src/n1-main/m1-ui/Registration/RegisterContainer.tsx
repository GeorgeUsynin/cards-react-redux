import React from 'react'
import {Redirect} from 'react-router'
import {Register} from './Register'
import {useSelector} from 'react-redux'
import {AppRootStateType} from "../../m2-bll/store";

const RegisterContainer: React.FC = () => {
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    // redirect logic
    if (isRegistered) return <Redirect to={'/login'}/>

    return (
        <Register/>
    )
}

export default RegisterContainer