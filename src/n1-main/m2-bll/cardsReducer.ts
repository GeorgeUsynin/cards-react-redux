import {AppThunkType} from "./store";
import {CardResponseType, cardsApi, CardsResponseType} from "../m3-dal/apiCards";


type InitialStateType = {
    cards: Array<CardResponseType>
    cardsTotalCount: number
    cardsRequestParameters: {
        cardQuestion: string
        sortCards: string
        page: number
        pageCount: number
    }
    cardsPack_id: string
    cardPackName: string
    packUserId: string
    isFetching: boolean
}

const initialState: InitialStateType = {
    cards: [],
    cardsRequestParameters: {
        cardQuestion: "",
        sortCards: "",
        page: 1,
        pageCount: 6
    },
    cardsTotalCount: 0,
    cardsPack_id: "",
    cardPackName: "",
    packUserId: "",
    isFetching: false
}


export const setSearchName = (requestedName: string) =>
    ({type: 'cards/SET-SEARCH-NAME', requestedName} as const)

export const setDataCards = (dataCards: CardsResponseType) =>
    ({type: 'cards/SET-CARDS', dataCards} as const)

export const setPackId = (packId: string) =>
    ({type: 'cards/SET-PACK-ID', packId} as const)

export const setCardPackName = (packName: string) =>
    ({type: 'cards/SET-PACK-NAME', packName} as const)

export const setCurrentPackId = (packId: string) =>
    ({type: 'cards/SET-CURRENT-PACK-ID', packId} as const)

export const setCurrentPage = (requestedPage: number) =>
    ({type: 'cards/SET-CURRENT-PAGE', requestedPage} as const)

export const setPageCount = (count: number) =>
    ({type: 'cards/SET-PAGE-COUNT', count} as const)

export const setLoadingCards = (isFetching: boolean) =>
    ({type: 'cards/SET-LOADING-CARDS', isFetching} as const)


export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionType): InitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, ...action.dataCards}
        case "cards/SET-PACK-ID":
            return {...state, cardsPack_id: action.packId}
        case "cards/SET-PACK-NAME":
            return {...state, cardPackName: action.packName}
        case "cards/SET-CURRENT-PAGE":
            return {...state, cardsRequestParameters: {...state.cardsRequestParameters, page: action.requestedPage}}
        case "cards/SET-PAGE-COUNT":
            return {...state, cardsRequestParameters: {...state.cardsRequestParameters, pageCount: action.count}}
        case "cards/SET-CURRENT-PACK-ID":
            return {...state, cardsPack_id: action.packId}
        case "cards/SET-SEARCH-NAME":
            return {
                ...state,
                cardsRequestParameters: {...state.cardsRequestParameters, cardQuestion: action.requestedName}
            }
        case "cards/SET-LOADING-CARDS":
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//thunks

export const getDataCards = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setLoadingCards(true))
    try {
        const {
            cardQuestion,
            sortCards,
            page,
            pageCount
        } = getState().cards.cardsRequestParameters
        const cardsPack_id = getState().cards.cardsPack_id
        const cards = await cardsApi.getCards(cardsPack_id, cardQuestion, sortCards, page, pageCount)
        dispatch(setDataCards(cards))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setLoadingCards(false))
    }
}

export const createNewCard = (question: string, answer: string): AppThunkType => async (dispatch, getState) => {
    dispatch(setLoadingCards(true))
    const cardsPack_id = getState().cards.cardsPack_id
    try {
        await cardsApi.createNewCard(cardsPack_id, question, answer)
        dispatch(getDataCards())
    } catch (e) {
        console.log(e)
    }
}

export const deleteCard = (cardId: string): AppThunkType => async (dispatch) => {
    dispatch(setLoadingCards(true))
    try {
        await cardsApi.deleteCard(cardId)
        dispatch(getDataCards())
    } catch (e) {
        console.log(e)
    }
}

export const editCard = (cardId: string, question: string, answer: string): AppThunkType => async (dispatch) => {
    dispatch(setLoadingCards(true))
    try {
        await cardsApi.editCard(cardId, question, answer)
        dispatch(getDataCards())
    } catch (e) {
        console.log(e)
    }
}

//
export type CardsActionType = ReturnType<typeof setDataCards
    | typeof setPackId
    | typeof setCardPackName
    | typeof setCurrentPage
    | typeof setPageCount
    | typeof setSearchName
    | typeof setLoadingCards
    | typeof setCurrentPackId>