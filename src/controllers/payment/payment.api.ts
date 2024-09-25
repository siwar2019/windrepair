import { TPaymentList, TStatus } from '../../interfaces/payment'
import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestGetPayment = async (payload: TPaymentList) => {
    try {
        const res = await axios.get(`${ApiPaths.PAYMENT}${ApiPaths.GET_ALL_PAYMENT}`, {
            params: { ...payload }
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestGenerateQrCode = (amount: number, username: string) => {
    return axios.post(`${ApiPaths.PAYMENT}${ApiPaths.GENERATE_QR_IMAGE}`, {
        amount,
        username
    })
}

export const requestGetStatus = async (payload: TStatus) => {
    try {
        const res = await axios.get(`${ApiPaths.PAYMENT}${ApiPaths.GET_STATUS}/${payload.codePay}`)
        return res.data
    } catch (error) {
        throw error
    }
}
