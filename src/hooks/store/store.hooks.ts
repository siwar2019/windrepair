import { useGenericMutation } from '../../utils/react-query'
import { requestCreateStore, requestGetDetailsStore, requestGetStores } from '../../controllers/store/store.api'
import { IAddStore } from '../../interfaces/store/store'
import { useQuery } from '@tanstack/react-query'

export const useCreateStore = () => {
    return useGenericMutation<IAddStore[], IAddStore[]>((payload: IAddStore[]) => requestCreateStore(payload), 'store')
}

export const useGetStoresList = () => {
    return useQuery({
        queryKey: ['store'],
        queryFn: () => requestGetStores()
    })
}

export const useGetDetailsStore = (id: number) => {
    return useQuery({
        queryKey: ['store', id],
        queryFn: () => requestGetDetailsStore(id)
    })
}
