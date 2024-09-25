import { PRODUCT_STATUS } from '../../utils/constants'
import { ICustomer } from '../customer'
import { RepairTicket } from '../repairTicket/repairTicket'

export type ICreateProduct = {
    serialNumber?: string
    name?: string
    password: string
    model: string
    problemDescription: string
    customerName: string
    phone: string
    email?: string
    estimatedCost: number
    estimatedTime?: number
    subStoreId?: number | null
    parts?: TPart[]
    pin?: string
    dateFinWarranty?: any
    guranteeValidite?: number
}

export type TProductList = {
    page?: number
    itemsPerPage?: number
    searchKeyword?: string
    filters: Record<string, string[]>
}

export type IProduct = {
    id: number
    serialNumber: string
    name: string
    num: string
    password: string
    model: string
    problemDescription: string
    customerName: string
    phone: string
    email?: string
    status: PRODUCT_STATUS
    client: ICustomer
    repairticket: RepairTicket
    subStoreId?: number
    parts: TPart[]
    employeeId?: number
    saleDate: string
    guarantee: string
    paymentMethode: string
    total: number
    createdAt: Date
    pin: string
    subStore?: SubStore
}

export type IUpdateProduct = {
    id: number
    status: string
}

export type TEditProductForm = {
    id: number
    serialNumber: string
    name?: string
    model: string
    problemDescription: string
    estimatedCost: number
    estimatedTime?: number
    status: PRODUCT_STATUS
    subStoreId?: number | null
    parts?: TPart[]
    idsDeleted?: (number | undefined)[]
    pin?: string
}

export type TPart = {
    id?: number
    name: string
    category: string
    price: number
    garantie: number
}

export type ProductFormType = ICreateProduct | TEditProductForm

export interface Store {
    id: number
    name: string
}

export interface SubStore {
    id: number
    name: string
    storeId: number
    store: Store
}
