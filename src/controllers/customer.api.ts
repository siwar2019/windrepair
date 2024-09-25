import { TCustomerList, TEditCustomerForm } from '../interfaces/customer'
import { ApiPaths } from '../utils/api-paths'
import axios from '../utils/axios'
import { ROLES } from '../utils/constants'

export const requestGetCustomer = async (payload: TCustomerList) => {
    try {
        const res = await axios.get(`${ApiPaths.USER}/${ApiPaths.GET_ALL_USERS}`, {
            params: { ...payload }
        })
        return res.data
    } catch (error) {
        throw error
    }
}
export const requestEditCustomer = async (payload: TEditCustomerForm) => {
    return await axios.patch(`${ApiPaths.USER}/${ApiPaths.UPDATE_USER}/${payload.id}`, payload)
}
export const requestGetUsers = async (id? : number) => {
    try {
        const res = await axios.get(`${ApiPaths.USER}${ApiPaths.GET_USER}/${id}`);
        return res.data.data;
    } catch (error) {
        throw error;
    }
};
