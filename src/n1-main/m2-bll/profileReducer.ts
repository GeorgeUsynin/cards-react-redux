import {LoginResponseType} from "../m3-dal/API";

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
        default:
            return state
    }
}

export const setInformationAboutUserAC = (data: LoginResponseType) =>
    ({type: 'profile/SET-INFORMATION-ABOUT-USER', data} as const)

export type ProfileActionsType = ReturnType<typeof setInformationAboutUserAC>