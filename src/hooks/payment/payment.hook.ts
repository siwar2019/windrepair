import { useQuery } from '@tanstack/react-query'
import { TGenerate, TPaymentList, TStatus } from '../../interfaces/payment'
import { requestGenerateQrCode, requestGetPayment, requestGetStatus } from '../../controllers/payment/payment.api'
import { useGenericMutation } from '../../utils/react-query'

export const useGetPaymentList = (payload: TPaymentList) => {
    return useQuery({
        queryKey: ['payment', payload],
        queryFn: () => requestGetPayment(payload)
    })
}

export const useGenerateQrCode = () => {
    return useGenericMutation<TGenerate, TGenerate>(
        (payload: TGenerate) => requestGenerateQrCode(payload.amount, payload.username),
        'payment'
    )
}

export const useGetStatus = (payload: TStatus, enabled = false) => {
    return useQuery({
        queryKey: ['payment', payload.codePay],
        queryFn: () => requestGetStatus(payload),
        enabled
    })
}
