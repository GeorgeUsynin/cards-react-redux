import axios from 'axios'

export type CardResponseType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type CardsResponseType = {
    cards: Array<CardResponseType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
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

export const cardsApi = {
    getCards(cardsPack_id?: string, cardQuestion?: string, sortCards?: string, page?: number, pageCount?: number) {
        return axiosInstance.get<CardsResponseType>("/cards/card", {
            params: {
                cardQuestion,
                cardsPack_id,
                sortCards,
                page,
                pageCount,
            }
        }).then(res => res.data)
    },
    // createNewPack(name: string, isPrivate: boolean = false) {
    //     return axiosInstance.post<CardPackType>("cards/pack", {
    //         cardsPack: {
    //             name,
    //             isPrivate
    //         }
    //     })
    // },
    // deletePack(packId: string) {
    //     return axiosInstance.delete<CardPackType>(`cards/pack?id=${packId}`)
    // }
}