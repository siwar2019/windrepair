export interface IButton {
    id: number
    name: string
    actionId: string
}

export interface IMenu {
    id: number 
    name: string
    buttons: IButton[]
    actionId: string
}


export interface IAddButton {
    buttonName?: string
    actionId: string
}
export interface IEditButton {
    id: number
    name: string
    actionId: string
}

export interface IAddMenu {
    menuName: string
    buttons?: IAddButton[]
    actionId?: string
}

export interface IAddMenus {
    menus:IAddMenu[]
}
export interface TEditMenuForm {
    id?: number | undefined
    name: string
    actionId: string
    buttons: IEditButton[]
    idsDeleted?: number[];
}
