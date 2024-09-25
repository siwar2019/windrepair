import { TFund } from '../interfaces/fund'
import { ApiPaths } from '../utils/api-paths'
import axios from '../utils/axios'

export const requestGetFund = async (payload: TFund) => {
    try {
        const res = await axios.get(`${ApiPaths.FUND}/${ApiPaths.GET_CASH_FUND}`, {
            params: { ...payload }
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestCreateFund = (payload: TFund) => {
    return axios.post(`${ApiPaths.FUND}/${ApiPaths.CREATE_CASH_FUND}`, {
        ...payload
    })
}

export const requestUpdateFund = (payload: TFund) => {
    return axios.patch(`${ApiPaths.FUND}${ApiPaths.UPDATE_CASH_FUND}/${payload.id}`, payload)
}

export const requestDeleteFund = async (id?: number) => {
    return await axios.delete(`${ApiPaths.FUND}${ApiPaths.DELETE_CASH_FUND}/${id}`)
}

export const requestGetFundDetails = async (id: number, page: number, itemsPerPage: number) => {
    const res = await axios.get(`${ApiPaths.MOVEMENT}/${ApiPaths.GET_DETAIL_FUND}/${id}`, {
        params: {
            page,
            itemsPerPage
        }
    })

    return res.data ?? []
}
