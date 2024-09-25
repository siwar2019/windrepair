import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestAddMovement = (value: number, cashRegisterId: number, invoiceId: number) => {
    return axios.post(`${ApiPaths.MOVEMENT}${ApiPaths.CREATE_MOVEMENT}`, {
        value,
        cashRegisterId,
        invoiceId
    })
}
