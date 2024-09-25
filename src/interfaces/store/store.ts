export interface IAddStore {
    id?: number
    name: string
    columns: string[]
    nbrLines: number
    subStores?: SubStore[]
}

export interface Store {
    id?: number | null
    name: string
    columns: string[]
    nbrLines: number
    subStores?: SubStore[]
}

export interface IAddStoreFormValues {
    stores: IAddStore[]
}

export interface Row {
    id: number
    number: number
    cells: string[]
}

export interface SubStore {
    id: number
    name: string
    productCount: number
    productNames: string[]
}
