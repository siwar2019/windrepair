export interface IPrivileges {
    id: number
    name: string
    menuId: number
    checked: boolean
}
export interface IPermission {
    id: number
    name: string
    buttons: IPrivileges[]
}
export interface IButtons {
    id: number
    actionId: string
    name: string
    menuId: number
    checked: boolean
}
export interface IPermissionList {
    id: number
    name: string
    actionId: string
    buttons: IButtons[]
}
