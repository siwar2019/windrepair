import { IPermission, IPrivileges } from './permission'

export interface IRoles {
    id: number
    name: string
    buttons: IPrivileges[]

    createdBy: number
}
export interface IMenu {
    id: number
    name: string
    menuId: number
    checked: boolean
}
export interface IAddRole {
    name: string,
    menus:IPermission[]
    id?:number
}
