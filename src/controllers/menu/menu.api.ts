import { IAddMenus, TEditMenuForm } from '../../interfaces/menu/menu'
import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestGetMenuRoles = async () => {
    try {
        const response = await axios.get(`${ApiPaths.MENU}${ApiPaths.GET_ALL_MENUS_PARTNERS}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const requestGetMenu = async () => {
    try {
        const res = await axios.get(`${ApiPaths.MENU}${ApiPaths.GET_ALL_MENU}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const requestCreateMenu = (data: IAddMenus) => {
    return axios.post(`${ApiPaths.MENU}${ApiPaths.CREATE_MENU}`, {
        ...data
    })
}

export const requestDeleteMenu = async (id?: number) => {
    return await axios.delete(`${ApiPaths.MENU}${ApiPaths.DELETE_MENU}/${id}`)
}

export const requestEditMenu = async (payload: TEditMenuForm) => {
    return await axios.patch(`${ApiPaths.MENU}${ApiPaths.UPDATE_MENU}/${payload.id}`, payload)
}
//get permission for employee
export const requestGetPermissions = async () => {
    try {
        const response = await axios.get(`${ApiPaths.MENU}${ApiPaths.GET_PERMISSION}`)
        return response.data
    } catch (error) {
        throw error
    }
}
