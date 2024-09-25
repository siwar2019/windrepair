import { useQuery } from '@tanstack/react-query'
import { TCustomerList } from '../interfaces/customer'
import { requestGetPartners, requestGetPaymentPartner, requestUpdateStaus } from '../controllers/partners.api'
import { useGenericMutation } from '../utils/react-query'

export const useGetPartnersList = (payload: TCustomerList) => {
    return useQuery({
        queryKey: ['partners', payload],
        queryFn: () => requestGetPartners(payload)
    })
}

export const useUpdateStatus = () => {
    return useGenericMutation<{ id: number; isActive: boolean }, any>(
        ({ id, isActive }) => requestUpdateStaus(id, isActive),
        'partners'
    )
}

export const usePaymentPartner = (id: number) => {
    return useQuery({
        queryKey: ['payment', id],
        queryFn: () => requestGetPaymentPartner(id)
    })
}
