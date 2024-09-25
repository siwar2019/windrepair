import { IProduct } from '../product/product'

export interface RepairTicket {
    id: number
    payed: boolean
    startDate: string
    endDate: string
    estimatedCost: number
    totalCost: number
    estimatedTime: number
    description: string
    code: string
    productId: number
    product: IProduct
    createdAt: string
}
