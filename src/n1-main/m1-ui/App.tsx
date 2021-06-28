import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Header} from './Header/Header';
import {Login} from "./Login/Login";
import {Register} from "./Registration/Register";
import {Profile} from "./Profile/Profile";
import {PageNotFound} from "./PageNotFound/PageNotFound";
import {RestorePassword} from "./RestorePassword/RestorePassword";
import {NewPassword} from "./NewPassword/NewPassword";
import {TestComponents} from "./TestComponents/TestComponents";
import RegisterPage from './Registration/RegisterPage'

const App = () => {
    return (
        <div className='app-wrapper'>

            <Header/>
            <div className='app-wrapper-content'>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/registration'} render={() => <RegisterPage/>}/>
                <Route path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/404'} render={() => <PageNotFound/>}/>
                <Route path={'/restore_password'} render={() => <RestorePassword/>}/>
                <Route path={'/new_password:token'} render={() => <NewPassword/>}/>
                <Route path={'/test_components'} render={() => <TestComponents/>}/>
            </div>
        </div>
    );
}

export default App;
