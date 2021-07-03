import axios from 'axios'
import {DefaultResponseType} from "./apiRestore";

const instance = axios.create({
    // baseURL: "http://localhost:7542/2.0/",
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>("auth/login", data)
    },
    logout() {
        return instance.delete<DefaultResponseType>("auth/me")
    },
    isAuthorized () {
        return instance.post<LoginResponseType>("auth/me",{})
    }
}


export type LoginParamsType = {
    email: string
    password: string
    check: boolean
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: DateConstructor
    updated: DateConstructor
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
