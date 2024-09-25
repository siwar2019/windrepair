import { TRegister } from '../interfaces/auth'
import { ApiPaths } from '../utils/api-paths'
import axios from '../utils/axios'

export const requestLogin = (login: string, password: string) => {
    return axios.post(ApiPaths.LOGIN, {
        login,
        password
    })
}

export const requestRegister = (payload: TRegister) => {
    return axios.post(ApiPaths.REGISTER, {
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        companyName: payload.companyName,
        nbrEmploye: payload.nbrEmploye,
        subscriptionId: payload.subscriptionId,
        typePayment: payload.typePayment
    })
}

export const requestForgotPassword = (email: string) => {
    return axios.post(ApiPaths.FORGOT_PASSWORD, {
        email
    })
}

export const requestResetPassword = (password: string, resetToken: string) => {
    return axios.post(ApiPaths.RESET_PASSWORD, {
        password,
        resetToken
    })
}
