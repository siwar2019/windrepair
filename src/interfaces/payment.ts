import { IUser } from './user'

export type TPaymentList = {
    page?: number
    itemsPerPage?: number
    filters: Record<string, string[]>
    searchKeyword?: string
}
export type TPayment = {
    id: number
    status: boolean
    type: string
    price: number
    nbrEmployee: number
    startDate: Date
    endDate: Date
    userId: number
    user: IUser
    subscription?: TSubscription
}

export type TGenerate = {
    amount: number
    username: string
}

export type TStatus = {
    codePay: string
}
export type TSubscription = {
    id: number
    nbrMaxEmployee: number
    price: number
    createdAt: Date
    updatedAt: Date
}
