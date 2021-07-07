import {AppThunkType} from "./store";
import {packsApi, PacksResponseType} from "../m3-dal/apiPacks";

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
//
// type PackRequestParameters

type InitialStateType = {
    cardPacks: Array<CardPackType>
    request: string
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    isFetching: boolean
}

const initialState: InitialStateType = {
    cardPacks: [],
    // packRequestParameters:{
    //
    // }
    request: "",
    cardPacksTotalCount: 0,
    maxCardsCount: 9,
    minCardsCount: 4,
    page: 1,
    pageCount: 4,
    isFetching:false
}

//actions

export const startSearchingAC = (request: string) =>
    ({type: 'packs/START-SEARCHING', request} as const)

const setDataPacks = (dataPacks: PacksResponseType) =>
    ({type: 'packs/SET-PACKS', dataPacks} as const)

const setLoadingPacks = (isFetching: boolean) =>
    ({type: 'packs/SET-LOADING-PACKS', isFetching} as const)



export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, ...action.dataPacks}
        case "packs/SET-LOADING-PACKS":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//thunks

export const getDataPacks = (): AppThunkType => async (dispatch,getState) => {
    try {


        dispatch(setLoadingPacks(true))
        const packs = await packsApi.getPacks()
        dispatch(setDataPacks(packs))
    } catch (e) {
        console.log(e)
    }
    finally {
        dispatch(setLoadingPacks(false))
    }
}

// export const getSearchedPacks = (name: string): AppThunkType => async (dispatch) => {
//     try {
//         const packs = await packsApi.getPacks(name)
//         dispatch(setDataPacks(packs))
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const setCurrentPage = (page: number): AppThunkType => async (dispatch) => {
//     try {
//         const packs = await packsApi.getPage(page)
//         dispatch(setDataPacks(packs))
//     } catch (e) {
//         console.log(e)
//     }
// }

export const createNewPack = (name: string, isPrivate?: boolean): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingPacks(true))
        await packsApi.createNewPack(name,isPrivate)
        dispatch(getDataPacks())
    } catch (e) {
        console.log(e)
    }
}

export const deletePack = (packId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingPacks(true))
        await packsApi.deletePack(packId)
        dispatch(getDataPacks())
    } catch (e) {
        console.log(e)
    }
}



export type PacksActionType = ReturnType<typeof startSearchingAC | typeof setDataPacks | typeof setLoadingPacks>