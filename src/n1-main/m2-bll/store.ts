import {applyMiddleware} from "redux";
import {combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import {RestorePasswordActionsType, restorePasswordReducer} from "./restorePasswordReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    restorePassword: restorePasswordReducer
})

export type AppActionsType = RestorePasswordActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store