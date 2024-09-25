import { ICreateProduct, TEditProductForm, TProductList } from '../../interfaces/product/product'
import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestCreateProduct = (payload: ICreateProduct) => {
    return axios.post(ApiPaths.CREATE_PRPODUCT, {
        serialNumber: payload.serialNumber,
        name: payload.name,
        password: payload.password,
        model: payload.model,
        problemDescription: payload.problemDescription,
        customerName: payload.customerName,
        phone: payload.phone,
        email: payload.email,
        estimatedCost: payload.estimatedCost,
        estimatedTime: payload.estimatedTime,
        subStoreId: payload.subStoreId,
        parts: payload.parts,
        pin: payload.pin,
        dateFinWarranty:payload.dateFinWarranty
    })
}

export const requestGetProducts = async (payload: TProductList) => {
    try {
        const res = await axios.get(`${ApiPaths.PRODUCT}${ApiPaths.GET_ALL_PRODUCTS}`, {
            params: {
                page: payload.page,
                itemsPerPage: payload.itemsPerPage,
                filters: payload.filters,
                searchKeyword: payload.searchKeyword
                
            }
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestDeleteProduct = (id: number) => {
    return axios.delete(`${ApiPaths.PRODUCT}${ApiPaths.DELETE_PRODUCT}/${id}`)
}
export const requestEditProduct = async (payload: TEditProductForm) => {
    return await axios.patch(`${ApiPaths.PRODUCT}/${ApiPaths.UPDATE_PRODUCT}/${payload.id}`, payload)
}

export const requestUpdateStatusProduct = async (id: number, status: string) => {
    return await axios.patch(`${ApiPaths.PRODUCT}/${ApiPaths.UPDATE_STATUS_PRODUCT}/${id}`, { status })
}
export const requestAssignToMe = (id: number, isAssigned: boolean, employeeId: number) => {
    return axios.patch(`${ApiPaths.PRODUCT}${ApiPaths.ASSIGN_PRODUCT}/${id}`, { isAssigned, employeeId })
}
