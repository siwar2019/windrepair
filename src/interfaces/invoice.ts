import { PAYMENT_METHOD } from '../utils/constants'
import { RepairTicket } from './repairTicket/repairTicket'

export type TInvoiceList = {
    page?: number
    itemsPerPage?: number
    filters: Record<string, string[]>
    searchKeyword?:string
}
export type TInvoice = {
    id: number
    num: number
    ticketId: number
    repairTicket: RepairTicket
    date: Date
    total: number
    status: boolean
    createdAt: Date
    paymentMethode: PAYMENT_METHOD
}
