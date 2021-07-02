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

const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <div className='app-wrapper-content'>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/registration'} render={() => <Register/>}/>
                <Route exact path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/404'} render={() => <PageNotFound/>}/>
                <Route path={'/restore_password'} render={() => <RestorePassword/>}/>
                <Route path={'/new_password/:token?'}
                       render={() => <NewPassword/>}/> {/* для отображения <NewPassword/> после token стоит "?" */}
                <Route path={'/test_components'} render={() => <TestComponents/>}/>
                <Route path={'/profile/information_about_user'} render={() => <PersonalInfo/>}/>
            </div>
        </div>
    );
}

export default App;
