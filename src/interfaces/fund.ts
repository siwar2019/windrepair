import { IProduct } from './product/product'

export type TFund = {
    id?: number
    name?: string
    bankAccount?: string
    initialValue?: number
    status?: string | boolean
    isMain?: boolean
    main?: boolean
    page?: number
    value?: number
    product?: IProduct
    cashRegister?: TCashRegister
    itemsPerPage?: number
    createdAt?: Date
    searchKeyword?: string
}
export type TCashRegister = {
    bankAccount: string
    initialValue: number
    name: string
    main: boolean
    status: boolean
    total: number
    amountTotal: number
}
