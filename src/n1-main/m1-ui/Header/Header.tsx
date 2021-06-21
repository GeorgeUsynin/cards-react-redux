import React from 'react'
import {NavLink} from 'react-router-dom'
import cls from './Header.module.css'


export const Header = () => {
    return (
        <div className={cls.header}>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/registration'}>Registration</NavLink>
            <NavLink to={'/profile'}>Profile</NavLink>
            <NavLink to={'/404'}>404</NavLink>
            <NavLink to={'/restore_password'}>Restore password</NavLink>
            <NavLink to={'/new_password'}>New password</NavLink>
            <NavLink to={'/test_components'}>Test components</NavLink>
        </div>
    )
}