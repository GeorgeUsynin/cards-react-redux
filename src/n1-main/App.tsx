import React from 'react';
import {Route} from 'react-router-dom';
import mainStyles from './App.module.scss';
import {Header} from './m1-ui/Header/Header';
import {Login} from "./m1-ui/Login/Login";
import {Profile} from "./m1-ui/Profile/Profile";
import {PageNotFound} from "./m1-ui/PageNotFound/PageNotFound";
import {RestorePassword} from "./m1-ui/RestorePassword/RestorePassword";
import {NewPassword} from "./m1-ui/NewPassword/NewPassword";
import {TestComponents} from "./m1-ui/TestComponents/TestComponents";
import {PersonalInfo} from "./m1-ui/Profile/PersonalInfo/PersonalInfo";
import {Register} from "./m1-ui/Registration/Register";
import {HeaderMain} from "./m1-ui/HeaderMain/HeaderMain";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./m2-bll/store";
import {PacksList} from "./m1-ui/PacksList/PacksList";
import {Redirect} from "react-router";
import {Preloader} from "./m1-ui/common/preloader/Preloader";
import {CardsList} from "./m1-ui/CardsList/CardsList";

export const PATH = {
    PROFILE: '/profile',
    PACKS_LIST: '/packslist',
    CARDS_LIST: '/cardslist/:packId?',
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
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.auth.isFetching)

    return (
        isFetching
            ?
            <Preloader/>
            :
            <div className={mainStyles.appWrapper}>
                {/*<Header/>*/}
                {isLoggedIn && <HeaderMain/>}
                <div className={mainStyles.appWrapperContent}>
                    <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE}/>}/>
                    <Route exact path={PATH.LOGIN} render={() => <Login/>}/>
                    <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                    <Route path={PATH.PACKS_LIST} render={() => <PacksList/>}/>
                    <Route path={PATH.CARDS_LIST} render={() => <CardsList/>}/>
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