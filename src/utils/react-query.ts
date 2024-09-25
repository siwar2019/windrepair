import { AxiosError, AxiosResponse } from 'axios'
// axios
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGenericMutation = <T, S>(func: (data: T | S) => Promise<AxiosResponse<S>>, key: string) => {
    const queryClient = useQueryClient()

    return useMutation<AxiosResponse, AxiosError, T | S>({
        mutationFn: func,
        onMutate: async (data: T | S) => {
            await queryClient.cancelQueries({
                queryKey: [key]
            })

            const previousData = queryClient.getQueryData([key])

            queryClient.setQueryData<T>([key], () => {
                return data as T
            })

            return previousData
        },
        onError: (_err, _, context) => {
            queryClient.setQueryData([key], context)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] })
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [key] })
        }
    })
}
