import { IUser } from "./user"

export type IPartner = {
    id:number  ,
    email: string,
    password: string,
    phone: string,
    companyName: string,
    isActive: boolean,
    isDeleted: boolean,
    typeId: number,
    tenantId: number | null
}
export type ISubscriptionpayment = {
    id: number
    payed: boolean
    type: string
    codePay: string
    nbrEmployee: number
    startDate: Date
    endDate: Date
    user: IUser
}
