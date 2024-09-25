import axios from '../utils/axios'
import { ApiPaths } from '../utils/api-paths'
import { TCustomerList } from '../interfaces/customer'
import { TEditEmployee } from '../interfaces/employee'

export const requestAddEmployee = (email: string, name: string, phone: string, roleId: string) => {
    return axios.post(ApiPaths.ADD_EMPLOYEE, {
        email,
        name,
        phone,
        roleId
    })
}
export const requestDeleteEmployee = async (id: number) => {
    return await axios.patch(`${ApiPaths.USER}${ApiPaths.DELETE_EMPLOYEE}/${id}`)
}

export const requestGetEmployee = async (payload: TCustomerList) => {
    try {
        const res = await axios.get(`${ApiPaths.USER}/${ApiPaths.GET_ALL_USERS}`, {
            params: { ...payload }
        })
        return res.data
    } catch (error) {
        throw error
    }
}
export const requestEditEmployee = async (payload: TEditEmployee) => {
    return await axios.patch(`${ApiPaths.USER}/${ApiPaths.UPDATE_USER}/${payload.id}`, payload)
}
