import { requestAddEmployee, requestEditEmployee, requestGetEmployee } from '../controllers/employee.api'
import { TAddEmployee, TEditEmployee } from '../interfaces/employee'
import { useGenericMutation } from '../utils/react-query'
import { requestDeleteEmployee } from '../controllers/employee.api'
import { useQuery } from '@tanstack/react-query'
import { TCustomerList } from '../interfaces/customer'

export const useAddEmployee = () => {
    return useGenericMutation<TAddEmployee, TAddEmployee>(
        (payload: TAddEmployee) => requestAddEmployee(payload.email, payload.name, payload.phone, payload.roleId),
        'employee'
    )
}

export const useDeleteEmployee = () => {
    return useGenericMutation<number, number>((id: number) => requestDeleteEmployee(id), 'employee')
}
export const useGetEmployeeList = (payload: TCustomerList) => {
    return useQuery({
        queryKey: ['employee', payload],
        queryFn: () => requestGetEmployee(payload)
    })
}
export const useEditEmployee = () => {
    return useGenericMutation<TEditEmployee, TEditEmployee>((payload: TEditEmployee) => requestEditEmployee(payload), 'employee')
}
