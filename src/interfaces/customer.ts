import { ROLES } from '../utils/constants'

export type TCustomerList = {
    typeUser: ROLES
    page?: number
    itemsPerPage?: number
    searchKeyword?: string
    filters?: Record<string, string[]>
}
export type ICustomer = {
    id: number
    name: string
    phone: string
    email: string
    companyName: string

    password: string
    isActive: boolean
    isDeleted: boolean
    company?: ICompany
}

export type TEditCustomerForm = {
    id?: number
    name?: string
    email?: string
    phone?: string
    password?: string
}

export type ICompany = {
    companyName: string
    phone: string
    email: string
}
