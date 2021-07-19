import {authAPI, LoginParamsType} from '../m3-dal/apiLogin';
import {setInformationAboutUserAC} from './profileReducer';
import {AppThunkType} from './store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
        setLoginError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setLoginLoading(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        }
    }
})

//reducer
export const authReducer = slice.reducer

//actions
export const {setIsLoggedIn, setLoginError, setLoginLoading} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch) => {
    dispatch(setLoginLoading(true))
    authAPI.login(data)
        .then(res => {
            dispatch(setInformationAboutUserAC(res.data))
            dispatch(setIsLoggedIn(true))
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
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoggedIn(false))
            dispatch(setLoginError('logout'))//why this dispatch in then ????? may be in catch
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
    dispatch(setLoginLoading(true))
    authAPI.isAuthorized()
        .then(res => {
            dispatch(setInformationAboutUserAC(res.data))
            dispatch(setIsLoggedIn(true))
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

export type AuthActionsType = ReturnType<
    | typeof setIsLoggedIn
    | typeof setLoginError
    | typeof setLoginLoading> // изменили запись в одну строчку !!