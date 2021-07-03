import {authAPI, LoginParamsType} from "../m3-dal/API";
import {setInformationAboutUserAC} from "./profileReducer";
import {AppThunkType} from "./store";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
        case 'logout/SET-IS-LOGGED-OUT':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsLoggedOutAC = (value: boolean) =>
    ({type: 'logout/SET-IS-LOGGED-OUT', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch) => {
    authAPI.login(data)
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

export const logoutTC = (): AppThunkType => (dispatch) => {
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoggedOutAC(false))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.messages + ', more details in the console')
            console.log('Error: ', {...e})
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


export type AuthActionsType = ReturnType<typeof setIsLoggedInAC | typeof setInformationAboutUserAC | typeof setIsLoggedOutAC> // изменили запись в одну строчку !!