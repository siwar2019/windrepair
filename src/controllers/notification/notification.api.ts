import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestGetNotifications = async () => {
    try {
        const res = await axios.get(`${ApiPaths.NOTIFICATIONS}${ApiPaths.GET_ALL_NOTIFICATIONS}`)
        return res.data.data
    } catch (error) {
        throw error
    }
}

export const requestUpdateNotifications = async () => {
    return await axios.patch(`${ApiPaths.NOTIFICATIONS}/${ApiPaths.UPDATE_NOTIFICATIONS}`)
}
