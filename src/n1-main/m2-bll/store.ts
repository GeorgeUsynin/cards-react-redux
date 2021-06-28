import {applyMiddleware, combineReducers, createStore} from "redux";
import  thunkMiddleware from "redux-thunk"
import { registerReducer } from '../m1-ui/Registration/r-2-bll/b-2-redux/registerReducer'
// import {signInReducer} from "../../neko-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signInReducer";
// import {forgotReducer} from "../../neko-2-features/f-1-authorization/a-3-forgot/f-2-bll/b-2-redux/forgotReducer";
// import {nekoReducer} from "../../neko-2-features/f-4-social/s-1-neko/n-2-bll/b-2-redux/nekoReducer";

const reducers = combineReducers({
    // signIn: signInReducer,
    register: registerReducer,
    // forgot: forgotReducer,
    
    // neko: nekoReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store

export type IAppStore = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
