import {LoginResponseType} from "../m3-dal/API";
import {AppThunkType} from "./store";
import {profileApi} from "../m3-dal/apiProfile";

const initialState = {
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
    }
}
type InitialStateType = typeof initialState

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
        case "profile/SET-USER-NAME":
            return {...state, informationAboutUser: {...state.informationAboutUser, name: action.name}}
        default:
            return state
    }
}

export const setInformationAboutUserAC = (data: LoginResponseType) =>
    ({type: 'profile/SET-INFORMATION-ABOUT-USER', data} as const)

export const setUserNameAC = (name: string) =>
    ({type: 'profile/SET-USER-NAME', name} as const)

export const editUserNameTC = (name: string): AppThunkType => (dispatch) => {
    profileApi.editUserName(name)
        .then(res => {
            debugger
            dispatch(setUserNameAC(res.data.updatedUser.name))
        })
        .catch(err => {
            const error = err.response
                ?
                err.response.data.error
                :
                (err.message + ', more details in the console')
            console.log(`error: ${error}`)
        })
}

export type ProfileActionsType = ReturnType<typeof setInformationAboutUserAC | typeof setUserNameAC>