import {LoginResponseType} from "../m3-dal/API";
import {AppThunkType} from "./store";
import {profileApi} from "../m3-dal/apiProfile";

type InitialStateType = {
    informationAboutUser: LoginResponseType
    isFetching: boolean
}

const initialState: InitialStateType = {
    informationAboutUser: {
        _id: "",
        email: "",
        name: "",
        publicCardPacksCount: 0,
        created: Date,
        updated: Date,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        avatar: "",
        error: ""
    },
    isFetching: false
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
        case "profile/SET-UPDATED-USER":
            return {...state, informationAboutUser: action.updatedUser}
        case "profile/SET-PERSONAL-INFO-LOADING":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const setInformationAboutUserAC = (data: LoginResponseType) =>
    ({type: 'profile/SET-INFORMATION-ABOUT-USER', data} as const)

export const setUpdatedUserAC = (updatedUser: LoginResponseType) =>
    ({type: 'profile/SET-UPDATED-USER', updatedUser} as const)

export const setPersonalInfoLoading = (isFetching: boolean) => {
    return {
        type: 'profile/SET-PERSONAL-INFO-LOADING',
        isFetching
    } as const
}


export const editUserProfileTC = (name: string, avatar: string): AppThunkType => (dispatch) => {
    dispatch(setPersonalInfoLoading(true))
    profileApi.editUserNameAvatar(name, avatar)
        .then(res => {
            dispatch(setUpdatedUserAC(res.data.updatedUser))
        })
        .catch(err => {
            const error = err.response
                ?
                err.response.data.error
                :
                (err.message + ', more details in the console')
            console.log(`error: ${error}`)
        })
        .finally(()=>{
            dispatch(setPersonalInfoLoading(false))
        })
}

export type ProfileActionsType = ReturnType<typeof setInformationAboutUserAC | typeof setUpdatedUserAC | typeof setPersonalInfoLoading>