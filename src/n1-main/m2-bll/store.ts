import {applyMiddleware} from "redux";
import {combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store