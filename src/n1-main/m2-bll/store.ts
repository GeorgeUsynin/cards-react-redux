import {applyMiddleware} from "redux";
import {combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import { registerReducer } from '../m1-ui/Registration/r-2-bll/b-2-redux/registerReducer'
import {RestorePasswordActionsType, restorePasswordReducer} from "./restorePasswordReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    restorePassword: restorePasswordReducer,
    register: registerReducer
})

export type AppActionsType = RestorePasswordActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store