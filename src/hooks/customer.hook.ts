import { useQuery } from '@tanstack/react-query'
import { TCustomerList, TEditCustomerForm } from '../interfaces/customer'
import { requestEditCustomer, requestGetCustomer, requestGetUsers } from '../controllers/customer.api'
import { useGenericMutation } from '../utils/react-query'
export const useGetCustomerList = (payload: TCustomerList) => {
    return useQuery({
        queryKey: ['customer', payload],
        queryFn: () => requestGetCustomer(payload)
    })
}
export const useEditCustomer = () => {
    return useGenericMutation<TEditCustomerForm, TEditCustomerForm>(
        (payload: TEditCustomerForm) => requestEditCustomer(payload),
        'customer'
    )
}
export const useGetUsersList = (id?: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => (id ? requestGetUsers(id) : Promise.resolve(null))
    })
}
