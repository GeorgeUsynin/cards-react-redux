import {AppThunkType} from "./store";
import {packsApi, PacksResponseType} from "../m3-dal/apiPacks";
import {CardsCountDirectionType, UpdatedDirectionType} from "../m1-ui/PacksList/TablePacks/TableHeader/TableHeader";

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

type PackRequestParameters = {
    packName: string
    maxCardsCount: number
    minCardsCount: number
    sortPacks: UpdatedDirectionType | CardsCountDirectionType
    pageCount: number
    page: number
    user_id: string
}

type InitialStateType = {
    cardPacks: Array<CardPackType>
    cardPacksRequestParameters: PackRequestParameters
    cardPacksTotalCount: number
    isFetching: boolean
}

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksRequestParameters: {
        page: 1,
        pageCount: 6,
        maxCardsCount: 0,
        minCardsCount: 0,
        sortPacks: "0updated",
        packName: "",
        user_id: ""
    },
    cardPacksTotalCount: 0,
    isFetching: false
}

//actions

export const setSearchName = (requestedName: string) =>
    ({type: 'packs/SET-SEARCH-NAME', requestedName} as const)

export const setCurrentPage = (requestedPage: number) =>
    ({type: 'packs/SET-CURRENT-PAGE', requestedPage} as const)

export const setUpdatedDirection = (direction: UpdatedDirectionType) =>
    ({type: 'packs/SET-UPDATED-DIRECTION', direction} as const)

export const setCardsCountDirection = (direction: CardsCountDirectionType) =>
    ({type: 'packs/SET-CARDS-COUNT-DIRECTION', direction} as const)

const setDataPacks = (dataPacks: PacksResponseType) =>
    ({type: 'packs/SET-PACKS', dataPacks} as const)

const setLoadingPacks = (isFetching: boolean) =>
    ({type: 'packs/SET-LOADING-PACKS', isFetching} as const)

export const setUserId = (userId: string) =>
    ({type: 'packs/SET-USER-ID', userId} as const)

export const setPageCount = (count: number) =>
    ({type: 'packs/SET-PAGE-COUNT', count} as const)

export const setRangeSort = (range: number[]) =>
    ({type: 'packs/SET-RANGE-SORT', range} as const)


export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, ...action.dataPacks}
        case "packs/SET-USER-ID":
            return {...state, cardPacksRequestParameters: {...state.cardPacksRequestParameters, user_id: action.userId}}
        case "packs/SET-SEARCH-NAME":
            return {
                ...state,
                cardPacksRequestParameters: {...state.cardPacksRequestParameters, packName: action.requestedName}
            }
        case "packs/SET-CURRENT-PAGE":
            return {
                ...state,
                cardPacksRequestParameters: {...state.cardPacksRequestParameters, page: action.requestedPage}
            }
        case "packs/SET-UPDATED-DIRECTION":
        case "packs/SET-CARDS-COUNT-DIRECTION":
            return {
                ...state,
                cardPacksRequestParameters: {...state.cardPacksRequestParameters, sortPacks: action.direction}
            }
        case "packs/SET-PAGE-COUNT":
            return {
                ...state,
                cardPacksRequestParameters: {...state.cardPacksRequestParameters, pageCount: action.count}
            }
        case "packs/SET-RANGE-SORT":
            return {
                ...state,
                cardPacksRequestParameters: {
                    ...state.cardPacksRequestParameters,
                    minCardsCount: action.range[0],
                    maxCardsCount: action.range[1]
                }
            }
        case "packs/SET-LOADING-PACKS":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//thunks

export const getDataPacks = (): AppThunkType => async (dispatch, getState) => {
    try {

        const {
            packName,
            minCardsCount,
            maxCardsCount,
            sortPacks,
            page,
            pageCount,
            user_id
        } = getState().packs.cardPacksRequestParameters
        debugger
        dispatch(setLoadingPacks(true))
        const packs = await packsApi.getPacks(packName, minCardsCount, maxCardsCount, sortPacks, page, pageCount, user_id)
        dispatch(setDataPacks(packs))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setLoadingPacks(false))
    }
}

export const createNewPack = (name: string, isPrivate?: boolean): AppThunkType => async (dispatch) => {
    try {
        dispatch(setLoadingPacks(true))
        await packsApi.createNewPack(name, isPrivate)
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


export type PacksActionType = ReturnType<typeof setSearchName
    | typeof setDataPacks
    | typeof setLoadingPacks
    | typeof setCurrentPage
    | typeof setUserId
    | typeof setUpdatedDirection
    | typeof setPageCount
    | typeof setRangeSort
    | typeof setCardsCountDirection>