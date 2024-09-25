import { IAddStore } from '../../interfaces/store/store'
import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestCreateStore = (data: IAddStore[]) => {
    return axios.post(`${ApiPaths.STORE}${ApiPaths.CREATE_STORE}`, {
        stores: data
    })
}

export const requestGetStores = async () => {
    try {
        const res = await axios.get(`${ApiPaths.STORE}${ApiPaths.GET_STORES}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestGetDetailsStore = async (id: number) => {
    const res = await axios.get(`${ApiPaths.STORE}${ApiPaths.GET_DETAILS_STORE}/${id}`)
    return res.data
}
