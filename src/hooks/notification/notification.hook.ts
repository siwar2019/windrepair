import { useQuery } from '@tanstack/react-query'
import { requestGetNotifications, requestUpdateNotifications } from '../../controllers/notification/notification.api'
import { useGenericMutation } from '../../utils/react-query'

export const useGetNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: () => requestGetNotifications()
    })
}

export const useEditNotifications = () => {
    return useGenericMutation(() => requestUpdateNotifications(), 'notifications')
}
