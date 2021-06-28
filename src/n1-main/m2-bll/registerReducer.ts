import {RegisterAPI} from "../m3-dal/registerAPI";
import {AppThunkType} from "./store";

export const REGISTER_LOADING = 'REGISTER/LOADING';
export const REGISTER_ERROR = 'REGISTER/ERROR';
export const REGISTER_SUCCESS = 'REGISTER/SUCCESS';

export const REGISTER = 'REGISTER/SOME';

type InitialStateType = {
    isRegistered: boolean
}

export const registerInitialState: InitialStateType = { // blank
    isRegistered: false
};


export type RegisterActions = ReturnType<typeof registerSome>;

export const registerSome = (isRegistered: boolean) => {
    return {
        type: REGISTER,
        isRegistered
    } as const
}

export const registerReducer = (state = registerInitialState, action: RegisterActions): InitialStateType => {
    switch (action.type) {
        case REGISTER: { // blank
            return {
                ...state,
                isRegistered: action.isRegistered
            }
        }
        default: {
            return state;
        }
    }
};


export const register =
    (email: string, password: string): AppThunkType => async (dispatch) => {
        try {
            let res = await RegisterAPI.register(email, password)
            console.log(res)
            dispatch(registerSome(true))
        } catch (e) {
            const error = e.error.response.data.error
            console.log(error)
        }
    }

