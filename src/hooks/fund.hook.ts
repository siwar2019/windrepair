import { useQuery } from '@tanstack/react-query'
import {
    requestCreateFund,
    requestDeleteFund,
    requestGetFund,
    requestGetFundDetails,
    requestUpdateFund
} from '../controllers/fund.api'
import { useGenericMutation } from '../utils/react-query'
import { TFund } from '../interfaces/fund'

export const useGetFindList = (payload: TFund) => {
    return useQuery({
        queryKey: ['fund', payload],
        queryFn: () => requestGetFund(payload)
    })
}

export const useCreateFund = () => {
    return useGenericMutation<TFund, TFund>(
        (payload: TFund) => requestCreateFund(payload),
        'fund'
    )
}
export const useUpdateFund = () => {
    return useGenericMutation<TFund, TFund>((payload: TFund) => requestUpdateFund(payload), 'fund')
}
export const useDeleteFund = () => {
    return useGenericMutation<number, number | undefined>((id: number | undefined) => requestDeleteFund(id), 'fund')
}

export const useDetailsFund = (id: number, page: number, itemsPerPage: number) => {
    return useQuery({
        queryKey: ['fundDetails', id, page, itemsPerPage],
        queryFn: () => requestGetFundDetails(id, page, itemsPerPage).then((res) => res.data)
    })
}
