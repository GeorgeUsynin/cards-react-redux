import {LoginResponseType} from '../m3-dal/apiLogin';
import {AppThunkType} from './store';
import {profileApi} from '../m3-dal/apiProfile';
import {setLoginLoading} from './authReducer';

type InitialStateType = {
    informationAboutUser: LoginResponseType
}

const initialState: InitialStateType = {
    informationAboutUser: {
        _id: '',
        email: '',
        name: '',
        publicCardPacksCount: 0,
        created: Date.toString(),
        updated: Date.toString(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        avatar: '',
        error: ''
    }
}

/*export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}*/

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-INFORMATION-ABOUT-USER':
            return {...state, informationAboutUser: action.data}
        case 'profile/SET-UPDATED-USER':
            return {...state, informationAboutUser: action.updatedUser}
        default:
            return state
    }
}

export const setInformationAboutUserAC = (data: LoginResponseType) =>
    ({type: 'profile/SET-INFORMATION-ABOUT-USER', data} as const)

export const setUpdatedUserAC = (updatedUser: LoginResponseType) =>
    ({type: 'profile/SET-UPDATED-USER', updatedUser} as const)


export const editUserProfileTC = (name: string, avatar: string): AppThunkType => async (dispatch) => {
    dispatch(setLoginLoading(true))
    try {
        let result = await profileApi.editUserNameAvatar(name, avatar)
        dispatch(setUpdatedUserAC(result.data.updatedUser))
    } catch (err) {
        const error = err.response
            ?
            err.response.data.error
            :
            (err.message + ', more details in the console')
        console.log(`error: ${error}`)
    } finally {
        console.log('finally')
        debugger

        dispatch(setLoginLoading(false))
    }
    console.log('yes')
}

export type ProfileActionsType = ReturnType<typeof setInformationAboutUserAC | typeof setUpdatedUserAC>
