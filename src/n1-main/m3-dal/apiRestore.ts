import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

//api types

type ResponseType = {
    info: string
    error: string | null
}


export const authApi = {
    restorePassword(email: string) {
        return axiosInstance.post<ResponseType>('/auth/forgot', {
            email,
            message: `<div style='background-color: lime; padding: 15px'>
                      <p>To restore your password, follow the link below</p>
                      <a href='https://georgeusynin.github.io/cards-react-redux/#/new_password/$token$'>Restore link</a>
                      </div>`
        })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return axiosInstance.post<ResponseType>('/auth/set-new-password', {
            password,
            resetPasswordToken
        })
    }
}