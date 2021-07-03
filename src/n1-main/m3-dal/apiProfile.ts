import axios from 'axios'
import {LoginResponseType} from "./API";


const axiosInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

//api types

export const profileApi = {
    editUserNameAvatar(name: string, avatar: string) {
        return axiosInstance.put<{updatedUser: LoginResponseType}>('/auth/me', {
            name,
            avatar
        })
    }

}