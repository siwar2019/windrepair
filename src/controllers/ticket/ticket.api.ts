import { TTicket } from '../../interfaces/props/ticket'
import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestGetTicketDetails = async (payload: TTicket) => {
    try {
        const response = await axios.get(`${ApiPaths.GET_DEATILS_TICKET}/${payload.code}`)
        return response.data
    } catch (error) {
        return null
    }
}
