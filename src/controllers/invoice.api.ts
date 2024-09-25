import { TInvoiceList } from '../interfaces/invoice'
import { ApiPaths } from '../utils/api-paths'
import axios from '../utils/axios'

export const requestGetInvoice = async (payload: TInvoiceList) => {
    try {
        const res = await axios.get(`${ApiPaths.INVOICE}/${ApiPaths.GET_ALL_INVOICES}`, {
            params: { ...payload }
        })
        return res.data
    } catch (error) {
        throw error
    }
}
