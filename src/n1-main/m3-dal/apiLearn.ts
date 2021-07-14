import axios from "axios";
import {CardsResponseType} from "./apiCards";

export type GradeResponseType = {
    token: string
    tokenDeathTime: number
    updatedGrade:{
        card_id: string
        cardsPack_id: string
        created: string
        grade: 2
        more_id: string
        shots: 1
        updated: string
        user_id: string
        __v: number
        _id: string
    }
}

const axiosInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const learnApi = {
    getCards(cardsPack_id: string, pageCount: number) {
        return axiosInstance.get<CardsResponseType>("/cards/card", {
            params: {
                cardsPack_id,
                pageCount
            }
        }).then(res => res.data)
    },
    sendGrade(grade: number, card_id?: string) {
        return axiosInstance.put<GradeResponseType>("/cards/grade", {
            grade,
            card_id
        }).then(res => res.data)
    },

}