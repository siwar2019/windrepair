import {
    IAddSetting,
    IconfirmDelivery,
    IcreateDelivery,
    IpayDelivery,
    TDeliveryList,
    TCreateErp,
    TLoginErp
} from '../interfaces/settings'
import { ApiPaths } from '../utils/api-paths'
import axios from '../utils/axios'

export const requestAddParamsErp = (payload: IAddSetting) => {
    return axios.post(`${ApiPaths.SETTINGS}${ApiPaths.CREATE_SETTINGS}`, {
        name: payload.name,
        endPointProd: payload.endPointProd,
        endPointTest: payload.endPointTest,
        typeEndPoint: payload.typeEndPoint,
        paramsSettings: payload.paramsSettings,
        isAuth: payload.isAuth
    })
}

export const requestGetSettings = async () => {
    try {
        const res = await axios.get(`${ApiPaths.SETTINGS}${ApiPaths.GET_SETTINGS}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestGetRecentSettings = async (id: number | null) => {
    try {
        const res = await axios.get(`${ApiPaths.SETTINGS}${ApiPaths.GET_SETTINGS_BY_ID}/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestTestSettings = async (payload: { id: number; paramsSettings: IAddSetting['paramsSettings'] }) => {
    try {
        const res = await axios.post(`${ApiPaths.SETTINGS}/${ApiPaths.GET_DETAILS_ERP_SETTINGS}`, payload)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestLoginToErp = (payload: TLoginErp) => {
    return axios.post(`${ApiPaths.SETTINGS}${ApiPaths.GET_TOKEN_ERP}`, {
        username: payload.username,
        password: payload.password
    })
}
export const requestCreateApiSettings = (payload: TCreateErp) => {
    return axios.post(`${ApiPaths.SETTINGS}${ApiPaths.CREATE_ERP_SETTING}`, {
        token: payload.token
    })
}

export const requestGetCategoryProduct = async (token: string | undefined | null) => {
    try {
        const res = await axios.get(`${ApiPaths.SETTINGS}${ApiPaths.GET_ALL_CATEGORY_AND_PRODUCTS_ERP}/${token}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestGetAllDelivery = async (payload: TDeliveryList) => {
    try {
        const res = await axios.get(`${ApiPaths.SETTINGS}${ApiPaths.GET_ALL_DELIVERY}/${payload.token}`, {
            params: {
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize
            }
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestGetSellingDate = async (token: string | undefined | null, code: string | undefined) => {
    try {
        const res = await axios.get(`${ApiPaths.SETTINGS}${ApiPaths.GET_SELLING_DATE}/${token}/${code}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestConfrimDelivery = (payload: IconfirmDelivery) => {
    return axios.post(`${ApiPaths.SETTINGS}${ApiPaths.CONFIRM_DELIVERY}`, {
        ...payload
    })
}

export const requestPayDelivery = (payload: IpayDelivery) => {
    return axios.post(`${ApiPaths.SETTINGS}${ApiPaths.PAY_DELIVERY}`, {
        ...payload
    })
}

export const requestCreateDelivery = (payload: IcreateDelivery) => {
    return axios.post(`${ApiPaths.SETTINGS}${ApiPaths.CREATE_DELIVERY}`, {
        ...payload
    })
}

export const requestGetAllCategoriesWithProductCount = async (token: string | undefined | null) => {
    try {
        const res = await axios.get(`${ApiPaths.SETTINGS}${ApiPaths.GET_ALL_CATEGORY_AND_PRODUCTS_COUNT_ERP}/${token}`)
        return res.data
    } catch (error) {
        throw error
    }
}
