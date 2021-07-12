import axios from 'axios'
import {CardPackType} from "../m2-bll/packsReducer";


export type PacksResponseType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}


const axiosInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const packsApi = {
    getPacks(packName?: string, min?: number, max?: number, sortPacks?: string, page?: number, pageCount?: number, user_id?: string) {
        return axiosInstance.get<PacksResponseType>("/cards/pack", {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id
            }
        }).then(res => res.data)
    },
    createNewPack(name: string, isPrivate: boolean = false) {
        return axiosInstance.post<CardPackType>("cards/pack", {
            cardsPack: {
                name,
                isPrivate
            }
        })
    },
    deletePack(packId: string) {
        return axiosInstance.delete<CardPackType>(`cards/pack?id=${packId}`)
    },
    editPack(_id: string, name: string) {
        return axiosInstance.put<CardPackType>(`cards/pack`, {
            cardsPack: {
                _id,
                name
            }
        })
    }
}