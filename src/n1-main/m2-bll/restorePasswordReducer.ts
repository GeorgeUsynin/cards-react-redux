//types

import {AppThunkType} from "./store";
import {authApi} from "../m3-dal/apiRestore";

type InitialStateType = {
    showEmailCheck: boolean
    error: string | null
    isNewPasswordCreated: boolean
    isFetching: boolean
}

export type RestorePasswordActionsType =

    | ReturnType<typeof setShowEmailCheck>
    | ReturnType<typeof setRestorePasswordError>
    | ReturnType<typeof setIsNewPasswordCreated>
    | ReturnType<typeof setRestorePasswordLoading>

//actions

export const setShowEmailCheck = (showEmailCheck: boolean) => {
    return {
        type: 'cards/restorePassword/setShowEmailCheck',
        payload: {
            showEmailCheck
        }
    } as const
}

export const setRestorePasswordError = (error: string | null) => {
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

export const setRestorePasswordLoading = (isFetching: boolean) => {
    return {
        type: 'cards/restorePassword/setRestorePasswordLoading',
        payload: {
            isFetching
        }
    } as const
}

const initialState: InitialStateType = {
    showEmailCheck: false,
    error: null,
    isNewPasswordCreated: false,
    isFetching: false
}

export const restorePasswordReducer = (state: InitialStateType = initialState, action: RestorePasswordActionsType): InitialStateType => {
    switch (action.type) {
        case "cards/restorePassword/setShowEmailCheck":
        case "cards/restorePassword/setError":
        case "cards/restorePassword/setIsNewPasswordCreated":
        case 'cards/restorePassword/setRestorePasswordLoading':
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
    dispatch(setRestorePasswordLoading(true))
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
            dispatch(setRestorePasswordError(error))
        })
        .finally(()=>{
            dispatch(setRestorePasswordLoading(false))
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
            dispatch(setRestorePasswordError(error))
        })
}