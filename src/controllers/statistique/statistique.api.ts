import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestGetStatistique = async (period: string) => {
    const res = await axios.get(`${ApiPaths.STATISTIC}${ApiPaths.GET_STATISTIC}${period}`);
    return res.data;
};