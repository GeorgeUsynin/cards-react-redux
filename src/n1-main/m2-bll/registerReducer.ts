import { ApiRegister } from '../m3-dal/apiRegister'
import { AppThunkType } from './store'

export const REGISTER_LOADING = 'REGISTER/LOADING'
export const REGISTER_ERROR = 'REGISTER/ERROR'
export const REGISTER_SUCCESS = 'REGISTER/SUCCESS'

type InitialStateType = {
  isRegistered: boolean,
  error: string | null,
  isFetching: boolean
}

export const registerInitialState: InitialStateType = {
  isRegistered: false,
  error: null,
  isFetching: false,
}


export type RegisterActions = ReturnType<typeof setRegisterSuccess
  | typeof setRegisterError
  | typeof setRegisterLoading>;

export const setRegisterSuccess = (isRegistered: boolean) => {
  return {
    type: REGISTER_SUCCESS,
    isRegistered,
  } as const
}

export const setRegisterError = (error: string | null) => {
  return {
    type: REGISTER_ERROR,
    error,
  } as const
}

export const setRegisterLoading = (isFetching: boolean) => {
  return {
    type: REGISTER_LOADING,
    isFetching,
  } as const
}

export const registerReducer = (state = registerInitialState, action: RegisterActions): InitialStateType => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistered: action.isRegistered,
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        error: action.error,
      }
    }
    case REGISTER_LOADING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    default: {
      return state
    }
  }
}


export const register =
  (email: string, password: string): AppThunkType => async (dispatch) => {
    dispatch(setRegisterLoading(true))
    try {
      await ApiRegister.register(email, password)
      dispatch(setRegisterSuccess(true))
    } catch (e) {
      const error = e.response.data.error
      dispatch(setRegisterError(error))
    }
    finally {
      dispatch(setRegisterLoading(false))
    }
  }