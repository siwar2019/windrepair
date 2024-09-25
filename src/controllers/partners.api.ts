import axios from '../utils/axios'
import { ApiPaths } from '../utils/api-paths'
import { ROLES } from '../utils/constants'
import { TCustomerList } from '../interfaces/customer'
export const requestGetPartners = async (payload: TCustomerList) => {
    try {
        const res = await axios.get(`${ApiPaths.PARTNER}${ApiPaths.GET_ALL_PARTNER}`, {
            params: { ...payload }
        })
        return res.data
    } catch (error) {
        throw error
    }
}
//update status
export const requestUpdateStaus = async (id: number,isActive:boolean) => {
    return await axios.patch(`${ApiPaths.PARTNER}${ApiPaths.UPDATE_STATUS}/${id}`,{isActive})
}


export const requestGetPaymentPartner = async (id: number) => {
    const res = await axios.get(`${ApiPaths.PAYMENT}${ApiPaths.GET_PARTNER_PAYMENTS}/${id}`);
    return res.data;
};
