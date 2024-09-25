import { TYPE_PAYMENT } from '../utils/constants'

export type TLogin = {
    userName: string
    password: string
}

export type TRegister = {
    email: string
    password: string
    phone: string
    companyName: string
    nbrEmploye?: number
    typePayment: TYPE_PAYMENT
    subscriptionId: number
}

export type TPayment = {
    userNumber: number
}

export type TForgot = {
    email: string
}

export type TReset = {
    password: string
    resetToken: string
}

export type PasswordState = {
    password: boolean
    confirmPassword: boolean
}
export type TypePassword = {
    password: boolean
  
}
