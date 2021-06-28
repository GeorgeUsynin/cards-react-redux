//types

import {AppThunkType} from "./store";
import {authApi} from "../m3-dal/apiRestore";

type InitialStateType = {
    showEmailCheck: boolean
    error: string | null
    isNewPasswordCreated: boolean
}

export type RestorePasswordActionsType =

    | ReturnType<typeof setShowEmailCheck>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsNewPasswordCreated>

//actions

const setShowEmailCheck = (showEmailCheck: boolean) => {
    return {
        type: 'cards/restorePassword/setShowEmailCheck',
        payload: {
            showEmailCheck
        }
    } as const
}

const setError = (error: string | null) => {
    return {
        type: 'cards/restorePassword/setError',
        payload: {
            error
        }
    } as const
}
const setIsNewPasswordCreated = (isNewPasswordCreated: boolean) => {
    return {
        type: 'cards/restorePassword/setIsNewPasswordCreated',
        payload: {
            isNewPasswordCreated
        }
    } as const
}

const initialState: InitialStateType = {
    showEmailCheck: false,
    error: null,
    isNewPasswordCreated: false
}

export const restorePasswordReducer = (state: InitialStateType = initialState, action: RestorePasswordActionsType): InitialStateType => {
    switch (action.type) {
        case "cards/restorePassword/setShowEmailCheck":
        case "cards/restorePassword/setError":
        case "cards/restorePassword/setIsNewPasswordCreated":
            return {
                ...state,
                ...action.payload
            }
        default:
            return {...state}
    }
}

//thunk

export const restorePassword = (email: string): AppThunkType => (dispatch) => {
    authApi.restorePassword(email)
        .then(res => {
            dispatch(setShowEmailCheck(true))
        })
        .catch(err => {
            const error = err.response
                ?
                err.response.data.error
                :
                (err.message + ', more details in the console')
            debugger
            dispatch(setError(error))
        })
}

export const setNewPassword = (password: string, resetPasswordToken: string): AppThunkType => (dispatch) => {
    authApi.setNewPassword(password, resetPasswordToken)
        .then(res => {
            debugger
            dispatch(setIsNewPasswordCreated(true))
        })
        .catch(err => {
            const error = err.response
                ?
                err.response.data.error
                :
                (err.message + ', more details in the console')
            dispatch(setError(error))
        })
}