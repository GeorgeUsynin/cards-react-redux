import axios from "axios";
import {CardsResponseType} from "./apiCards";

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
    }
}