import {ApiRegister} from '../m3-dal/apiRegister'
import {AppThunkType} from './store'
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialStateType = {
    isRegistered: boolean,
    error: string | null,
    isFetching: boolean
}

export const initialState: InitialStateType = {
    isRegistered: false,
    error: null,
    isFetching: false,
}

const slice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        setRegisterSuccess(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload
        },
        setRegisterError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
        setRegisterLoading(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        }
    }

})

//reducer
export const registerReducer = slice.reducer

//actions
export const {setRegisterError, setRegisterLoading, setRegisterSuccess} = slice.actions


export const register = (email: string, password: string): AppThunkType => async (dispatch) => {
    dispatch(setRegisterLoading(true))
    try {
        await ApiRegister.register(email, password)
        dispatch(setRegisterSuccess(true))
    } catch (e) {
        const error = e.response.data.error
        dispatch(setRegisterError(error))
    } finally {
        dispatch(setRegisterLoading(false))
    }
}

export type RegisterActions = ReturnType<typeof setRegisterSuccess
    | typeof setRegisterError
    | typeof setRegisterLoading>;
