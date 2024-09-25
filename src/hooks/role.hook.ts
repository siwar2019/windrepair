import { useQuery } from '@tanstack/react-query'
import { requestAddRole, requestDeleteRole, requestGetAllMenuRole, requestGetRoleDetails, requestGetRoles, requestUpdateRole } from '../controllers/role.api'
import { useGenericMutation } from '../utils/react-query'
import { IAddRole } from '../interfaces/role'
import { IPermission } from '../interfaces/permission'
import { IMenuRole } from '../interfaces/menu'


export const useGetRoles = () => {
    return useQuery({
        queryKey: ['roles'],
        queryFn: () => requestGetRoles()
    })
}
export const useGetAllMenuRole = (payload:IMenuRole) => {
    return useQuery({
        queryKey: ['roles',payload.id],
        queryFn: () => requestGetAllMenuRole(payload)
    })
}

export const useAddNewRole = () => {
    return useGenericMutation<IAddRole, IAddRole>((payload: IAddRole) => requestAddRole(payload), 'roles')
}
export const useUpdateRole = () => {
    return useGenericMutation<{ name: string; menus: IPermission; id: number }, any>(
        ({ name, menus, id }) => requestUpdateRole(name, menus, id),
        'roles'
    )
}

export const useDeleteRole = () => {
    return useGenericMutation<number, number>((id: number) => requestDeleteRole(id), 'roles')
}
export const useDetailsRole = (id: number) => {
    return useQuery({
        queryKey: ['menu permissions'],
        queryFn: () => requestGetRoleDetails(id)
    })
}
