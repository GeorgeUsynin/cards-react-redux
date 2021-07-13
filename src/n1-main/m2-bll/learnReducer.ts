import {CardResponseType, cardsApi, CardsResponseType} from "../m3-dal/apiCards";
import {AppThunkType} from "./store";
import {setDataCards, setLoadingCards} from "./cardsReducer";
import {learnApi} from "../m3-dal/apiLearn";

type InitialStateType = {
    cards: Array<CardResponseType>
    packName: string
    packId: string
    isFetching: boolean
}

const initialState = {
    cards: [],
    packId: "",
    packName: "",
    isFetching: false
}


export const setPackName = (packName: string) => {
    return {
        type: "learn/SET-PACK-NAME",
        packName
    } as const
}
export const setIsFetching = (isFetching: boolean) => {
    return {
        type: "learn/SET-IS-FETCHING",
        isFetching
    } as const
}

export const setPackId = (packId: string) => {
    return {
        type: "learn/SET-PACK-ID",
        packId
    } as const
}

export const setCards = (cards: CardsResponseType) => {
    return {
        type: "learn/SET-CARDS",
        cards
    } as const
}


export const learnReducer = (state: InitialStateType = initialState, action: LearnActionsType): InitialStateType => {
    switch (action.type) {
        case "learn/SET-PACK-NAME":
            return {...state, packName: action.packName}
        case "learn/SET-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "learn/SET-PACK-ID":
            return {...state, packId: action.packId}
        case "learn/SET-CARDS":
            return {...state, ...action.cards}
        default:
            return {...state}
    }
}


export const getCardsToLearn = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setIsFetching(true))
    try {
        const packId = getState().learn.packId
        const cards = await learnApi.getCards(packId, 10000)
        dispatch(setCards(cards))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}


export type LearnActionsType = ReturnType<typeof setPackName
    | typeof setIsFetching
    | typeof setPackId
    | typeof setCards>