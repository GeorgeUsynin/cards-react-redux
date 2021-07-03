import React from 'react';
import {Route} from 'react-router-dom';
import './App.scss';
import {Header} from './Header/Header';
import {Login} from "./Login/Login";
import {Profile} from "./Profile/Profile";
import {PageNotFound} from "./PageNotFound/PageNotFound";
import {RestorePassword} from "./RestorePassword/RestorePassword";
import {NewPassword} from "./NewPassword/NewPassword";
import {TestComponents} from "./TestComponents/TestComponents";
import {PersonalInfo} from "./Profile/PersonalInfo/PersonalInfo";
import {Register} from "./Registration/Register";
import {HeaderMain} from "./HeaderMain/HeaderMain";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";


export const PATH = {
    PROFILE: '/profile',
    PACKS_LIST: '/packsList',
    USER_INFO: '/information_about_user',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    TEST_COMPONENTS: '/test_components',
    PAGE_NOT_FOUND: '/404',
    RESTORE_PASSWORD: '/restore_password',
    NEW_PASSWORD: "/new_password/:token?"
}

const App = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    return (
        <div className='app-wrapper'>
            <Header/>
            {isLoggedIn && <HeaderMain/>}
            <div className='app-wrapper-content'>
                <Route exact path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACKS_LIST} render={() => <Profile/>}/>
                <Route path={PATH.USER_INFO} render={() => <PersonalInfo/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Register/>}/>
                <Route path={PATH.TEST_COMPONENTS} render={() => <TestComponents/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} render={() => <PageNotFound/>}/>
                <Route path={PATH.RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
                <Route path={PATH.NEW_PASSWORD}
                       render={() => <NewPassword/>}/> {/* для отображения <NewPassword/> после token стоит "?" */}
            </div>
        </div>
    )
}

export default App;