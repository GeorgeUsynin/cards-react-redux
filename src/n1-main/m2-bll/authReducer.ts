import {authAPI, LoginParamsType} from "../m3-dal/API";
import {setInformationAboutUserAC} from "./profileReducer";
import {AppThunkType} from "./store";
import {REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS} from "./registerReducer";

type InitialStateType = {
    isFetching: boolean
    isLoggedIn: boolean
    error: string | null
}

const initialState: InitialStateType = {
    isFetching: false,
    isLoggedIn: false,
    error: null
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsLoggedOutAC = (value: boolean) =>
    ({type: 'logout/SET-IS-LOGGED-OUT', value} as const)

export const setLoginError = (error: string | null) => {
    return {
        type: REGISTER_ERROR,
        error,
    } as const
}

//reducer

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
        case 'logout/SET-IS-LOGGED-OUT':
            return {...state, isLoggedIn: action.value}
        case "REGISTER/ERROR":
            return {...state, error: action.error}
        case "REGISTER/LOADING":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}


export const setLoginLoading = (isFetching: boolean) => {
    return {
        type: REGISTER_LOADING,
        isFetching,
    } as const
}

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch) => {
    dispatch(setLoginLoading(true))
    authAPI.login(data)
        .then(res => {
            dispatch(setInformationAboutUserAC(res.data))
            dispatch(setIsLoggedInAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.messages + ', more details in the console')
            dispatch(setLoginError(error))
        })
        .finally(() => {
            dispatch(setLoginLoading(false))
        })
}

export const logoutTC = (): AppThunkType => (dispatch) => {
    dispatch(setLoginLoading(true))
    debugger
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoggedOutAC(false))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.messages + ', more details in the console')
        })
        .finally(() => {
            dispatch(setLoginLoading(false))
        })
}

export const isLoggedInApp = (): AppThunkType => (dispatch) => {
    authAPI.isAuthorized()
        .then(res => {
            dispatch(setInformationAboutUserAC(res.data))
            dispatch(setIsLoggedInAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.messages + ', more details in the console')
            console.log('Error: ', {...e})
        })
}


export type AuthActionsType = ReturnType<typeof setIsLoggedInAC
    | typeof setInformationAboutUserAC
    | typeof setIsLoggedOutAC
    | typeof setLoginError
    | typeof setLoginLoading> // изменили запись в одну строчку !!