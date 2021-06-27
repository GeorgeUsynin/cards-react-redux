import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
});

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>("auth/login", data)
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
    avatar?: string
    publicCardPacksCount: number
    created: DateConstructor
    updated: DateConstructor
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
