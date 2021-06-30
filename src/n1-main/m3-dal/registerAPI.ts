import axios from 'axios'

export interface IRegisterData {
  addedUser: {},
  error?: string
}

const instance = axios.create({
  baseURL: 'https://cards-react-redux.herokuapp.com/2.0',
  withCredentials: true,
})

export const RegisterAPI = {
  register(email: string, password: string) {
    return instance.post<IRegisterData>(`auth/register`, {email, password})
  },
}
