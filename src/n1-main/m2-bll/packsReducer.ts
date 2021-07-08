import { AppRootStateType, AppThunkType } from './store'
import { packsApi, PacksResponseType } from '../m3-dal/apiPacks'

export type CardPackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}


type InitialStateType = {
  cardPacks: Array<CardPackType>
  packName: string
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  sortPacks: string
  page: number
  pageCount: number
}

const initialState: InitialStateType = {
  cardPacks: [],
  packName: '',
  cardPacksTotalCount: 0,
  maxCardsCount: 9,
  minCardsCount: 4,
  sortPacks: '',
  page: 1,
  pageCount: 4,
}


export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return {...state, ...action.dataPacks}
    case 'packs/SET-CURRENT-PAGE':
      return {...state, page: action.page}
    case 'packs/SET-PAGE-COUNT':
      return {...state, pageCount: action.count}
    case 'packs/SEARCH-PACK':
      return {...state, packName: action.packName}
    case 'packs/SET-RANGE-SORT':
      return {...state, minCardsCount: action.range[0], maxCardsCount: action.range[1]}
    default:
      return state
  }
}

export const getPackList = (): AppThunkType =>
  async (dispatch
    , getState: () => AppRootStateType) => {
    try {
      const {packName, minCardsCount, maxCardsCount, sortPacks, page, pageCount} = getState().packs
      const packs = await packsApi.getPacks(packName, minCardsCount, maxCardsCount, sortPacks, page, pageCount)
      dispatch(setDataPacks(packs))
    } catch (e) {
      console.log(e)
    }
  }

const setDataPacks = (dataPacks: PacksResponseType) =>
  ({type: 'packs/SET-PACKS', dataPacks} as const)

export const searchPack = (packName: string) =>
  ({type: 'packs/SEARCH-PACK', packName} as const)

export const setCurrentPage = (page: number) =>
  ({type: 'packs/SET-CURRENT-PAGE', page} as const)

export const setPageCount = (count: number) =>
  ({type: 'packs/SET-PAGE-COUNT', count} as const)

export const setRangeSort = (range: number[]) =>
  ({type: 'packs/SET-RANGE-SORT', range} as const)


export type PacksActionType = ReturnType<typeof setDataPacks
  | typeof setCurrentPage
  | typeof setPageCount
  | typeof searchPack
  | typeof setRangeSort>