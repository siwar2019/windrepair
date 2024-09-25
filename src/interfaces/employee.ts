export type TAddEmployee = {
    email: string
    name: string
    phone: string
    roleId?: any
}
export type TEditEmployee = {
    id: number
    email: string
    name: string
    phone: string
    roleId?: any
}
export type IEmployee = {
    id: number
    name: string
    phone: string
    email: string
    role: IRole[]
    isActive: boolean
    isDeleted: boolean
}
export type IRole = {
    id: number
    name: string
}
