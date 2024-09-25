import { useQuery } from '@tanstack/react-query'
import { requestCreateMenu, requestDeleteMenu, requestGetMenu } from '../../controllers/menu/menu.api'
import { useGenericMutation } from '../../utils/react-query'
import { IAddMenus } from '../../interfaces/menu/menu'

export const useGetMenuList = () => {
    return useQuery({
        queryKey: ['menu'],
        queryFn: () => requestGetMenu()
    })
}

export const useCreateMenu = () => {
    return useGenericMutation<IAddMenus, IAddMenus>(
        (payload: IAddMenus) => requestCreateMenu(payload),
        'menu'
    )
}

export const useDeleteMenu = () => {
    return useGenericMutation<number, number | undefined>((id: number | undefined) => requestDeleteMenu(id), 'menu')
}
