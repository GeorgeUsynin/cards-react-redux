import {authAPI, LoginParamsType} from '../m3-dal/apiLogin';
import {setInformationAboutUserAC} from './profileReducer';
import {AppRootDispatch, AppThunkType} from './store';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

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

export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, {
    dispatch: AppRootDispatch, rejectValue: { error: string }
}>('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setLoginLoading(true))
    try {
        const res = (await authAPI.login(param)).data
        thunkAPI.dispatch(setInformationAboutUserAC(res))
        return {isLoggedIn: true}
    } catch (e) {
        const error: string = e.response
            ? e.response.data.error
            : (e.messages + ', more details in the console')
        return thunkAPI.rejectWithValue({error})
    } finally {
        thunkAPI.dispatch(setLoginLoading(false))
    }
})

export const logoutTC = createAsyncThunk<{ isLoggedIn: false }>('auth/logout', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoginLoading(true))
    try {
        await authAPI.logout()
        return {isLoggedIn: false}
    } catch (e) {
        const error: string = e.response
            ? e.response.data.error
            : (e.messages + ', more details in the console')
        return thunkAPI.rejectWithValue({error})
    } finally {
        // thunkAPI.dispatch(setLoginLoading(false))
    }
})

// export const loginTC_ = (data: LoginParamsType): AppThunkType => (dispatch) => {
//     dispatch(setLoginLoading(true))
//     authAPI.login(data)
//         .then(res => {
//             dispatch(setInformationAboutUserAC(res.data))
//             dispatch(setIsLoggedIn(true))
//         })
//         .catch((e) => {
//             const error = e.response
//                 ? e.response.data.error
//                 : (e.messages + ', more details in the console')
//             dispatch(setLoginError(error))
//         })
//         .finally(() => {
//             dispatch(setLoginLoading(false))
//         })
// }

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
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(loginTC.rejected, (state, action) => {
            if(action.payload?.error){
                state.error = action.payload.error
            }
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.isFetching = false
        })
    }
})

//reducer
export const authReducer = slice.reducer

//actions
export const {setIsLoggedIn, setLoginError, setLoginLoading} = slice.actions

// thunks


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

export type AuthActionsType = ReturnType<| typeof setIsLoggedIn
    | typeof setLoginError
    | typeof setLoginLoading> // изменили запись в одну строчку !!