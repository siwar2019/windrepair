import { ROLES } from '../utils/constants'

export interface IUser {
    id: number
    email: string
    companyName?: string | null
    name?: string | null
    phone?: string
    password?: string
    image?: string
    isActive: boolean
    isDeleted: boolean
    typeId: number
    tenantId: number
    createdAt: string
    updatedAt: string
    role: ROLES
    isErpClient: boolean
    emailErpClient?: string
    nameCategory?: string
}

export interface IAdmin {
    id: number
    email: string
    createdAt: string
    updatedAt: string
    role: ROLES
}

export interface IAuthState {
    isLoading: boolean
    isAuthenticated: boolean
    error: Error | null
    user: IUser | null
    warrantyEndDate:string |null
    
}
