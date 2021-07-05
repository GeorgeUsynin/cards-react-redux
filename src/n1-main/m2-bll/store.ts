import {applyMiddleware} from "redux";
import {combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {AuthActionsType, authReducer} from "./authReducer";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {RegisterActions, registerReducer} from './registerReducer'
import {RestorePasswordActionsType, restorePasswordReducer} from "./restorePasswordReducer";
import {SearchingActionsType, searchReducer} from "./searchReducer";
import {PaginatorActionsType, paginatorReducer} from "./paginatorReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    restorePassword: restorePasswordReducer,
    register: registerReducer,
    search: searchReducer,
    paginator: paginatorReducer
})

export type AppActionsType =
    RestorePasswordActionsType
    | RegisterActions
    | AuthActionsType
    | ProfileActionsType
    | SearchingActionsType
    | PaginatorActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store