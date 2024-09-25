import axios from '../utils/axios'
import { ApiPaths } from '../utils/api-paths'
import { IAddRole } from '../interfaces/role'
import { IPermission } from '../interfaces/permission'
import { IMenuRole } from '../interfaces/menu'

export const requestGetRoles = async () => {
    try {
        const response = await axios.get(`${ApiPaths.ROLE}${ApiPaths.GET_ALL_ROLES}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const requestAddRole = (payload: IAddRole) => {
    return axios.post(`${ApiPaths.ROLE}${ApiPaths.ADD_NEW_ROLE}`, {
        name: payload.name,
        menus: payload.menus
    })
}
export const requestUpdateRole = (name: string, menus: IPermission, id: number) => {
    return axios.patch(`${ApiPaths.ROLE}${ApiPaths.UPDATE_ROLE}/${id}`, {
        name,
        menus
    })
}

export const requestDeleteRole = (id: number) => {
    return axios.delete(`${ApiPaths.ROLE}${ApiPaths.DELETE_ROLE}/${id}`)
}
export const requestGetAllMenuRole = async (payload: IMenuRole) => {
    try {
        const res = await axios.get(`${ApiPaths.MENU}${ApiPaths.GET_ALL_MENU_ROLE}/${payload.id}`, {
        })
        return res.data
    } catch (error) {
        throw error
    }
}
export const requestGetRoleDetails = async (id: number) => {
    const res = await axios.get(`${ApiPaths.MENU}${ApiPaths.GET_ALL_MENUS_ROLE}/${id}`)

    return res.data
}

