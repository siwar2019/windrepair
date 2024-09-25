import { useGetPermission } from '../../../hooks/menu.hook'
import { useMemo } from 'react'
import { IPermissionList } from '../../../interfaces/permission'
import { RootState, useSelector } from '../../../redux/store'
import { ROLES } from '../../../utils/constants'

export const usePermissions = (): IPermissionList[] => {
    const user = useSelector((state: RootState) => state.auth.user)
    const { data: permission } = useGetPermission(!!user && user.role === ROLES.EMPLOYEE)
    return useMemo(() => {
        return permission?.data ?? []
    }, [permission])
}

export const useActionPermission = (menuRole: string, buttonRole: string): boolean => {
    const user = useSelector((state: RootState) => state.auth.user)
    const permissions = usePermissions()

    const hasAccessPartner = !!user && [ROLES.PARTNER].includes(user.role)
    // const hasAccessAdmin = !!user && [ROLES.ADMIN].includes(user.role)
    // if (hasAccessAdmin) return true
    if (hasAccessPartner) return true
    let ticketPermissions = permissions.find((permission) => permission.actionId === menuRole)

    if (!ticketPermissions) return false

    let permission = ticketPermissions.buttons.find((button) => button.actionId === buttonRole)?.checked

    return permission ?? false
}
