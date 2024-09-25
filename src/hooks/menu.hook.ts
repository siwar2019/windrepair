import { useQuery } from '@tanstack/react-query'
import { requestEditMenu, requestGetMenuRoles, requestGetPermissions } from '../controllers/menu/menu.api'
import { useGenericMutation } from '../utils/react-query'
import { TEditMenuForm } from '../interfaces/menu/menu'

export const useGetMenuPermission = () => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: () => requestGetMenuRoles()
    })
}

export const useEditMenu = () => {
    return useGenericMutation<TEditMenuForm, TEditMenuForm>((payload: TEditMenuForm) => requestEditMenu(payload), 'menu')
}

export const useGetPermission = (enabled = false) => {
    return useQuery({
        queryKey: ['permission'],
        queryFn: () => requestGetPermissions(),
        enabled
    })
}
