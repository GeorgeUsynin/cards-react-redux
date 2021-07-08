import axios from 'axios'

export interface IRegisterData {
  addedUser: {},
  error?: string
}

const instance = axios.create({
  // baseURL: "http://localhost:7542/2.0/",
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,

})

export const ApiRegister = {
  register(email: string, password: string) {
    return instance.post<IRegisterData>(`auth/register`, {email, password})
  },
}
