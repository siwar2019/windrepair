import { useQuery } from '@tanstack/react-query'
import { TInvoiceList } from '../../interfaces/invoice'
import { requestGetInvoice } from '../../controllers/invoice.api'
export const useGetInvoiceList = (payload: TInvoiceList) => {
    return useQuery({
        queryKey: ['invoice', payload],
        queryFn: () => requestGetInvoice(payload)
    })
}
