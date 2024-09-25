import { useQuery } from '@tanstack/react-query'
import {
    requestAddParamsErp,
    requestCreateApiSettings,
    requestGetCategoryProduct,
    requestGetSellingDate,
    requestLoginToErp,
    requestConfrimDelivery,
    requestCreateDelivery,
    requestGetAllDelivery,
    requestGetRecentSettings,
    requestGetSettings,
    requestPayDelivery,
    requestTestSettings,
    requestGetAllCategoriesWithProductCount
} from '../controllers/settings.api'

import {
    IAddSetting,
    IconfirmDelivery,
    IcreateDelivery,
    IpayDelivery,
    TCreateErp,
    TLoginErp,
    TDeliveryList
} from '../interfaces/settings'
import { useGenericMutation } from '../utils/react-query'

export const useCreateSettings = () => {
    return useGenericMutation<IAddSetting, IAddSetting>((payload: IAddSetting) => requestAddParamsErp(payload), 'settings')
}

export const useGetSettingList = () => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: () => requestGetSettings()
    })
}

export const useGetRecentSettingList = (id: number | null) => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: () => requestGetRecentSettings(id)
    })
}

export const useTestSettings = () => {
    return useGenericMutation<{ id: number; paramsSettings: IAddSetting['paramsSettings'] }, any>(
        (payload) => requestTestSettings(payload),
        'settings'
    )
}

export const useConnectToErp = () => {
    return useGenericMutation<TLoginErp, TLoginErp>((payload: TLoginErp) => requestLoginToErp(payload), 'settings')
}
export const useCreateErpSetting = () => {
    return useGenericMutation<TCreateErp, TCreateErp>((payload: TCreateErp) => requestCreateApiSettings(payload), 'settings')
}

export const useGetAllProductCategory = (token: string | undefined | null) => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => requestGetCategoryProduct(token)
    })
}
export const useGetSellingDate = (token: string | undefined | null, code: string | undefined) => {
    return useQuery({
        queryKey: ['warranty'],
        queryFn: () => requestGetSellingDate(token, code)
    })
}

export const useGetAllDelivery = (payload: TDeliveryList) => {
    return useQuery({
        queryKey: ['allDelivery', payload],
        queryFn: () => requestGetAllDelivery(payload),
        enabled: payload.enabled
    })
}

export const useConfirmDelivery = () => {
    return useGenericMutation<IconfirmDelivery, IconfirmDelivery>(
        (payload: IconfirmDelivery) => requestConfrimDelivery(payload),
        'allDelivery'
    )
}

export const usePayDelivery = () => {
    return useGenericMutation<IpayDelivery, IpayDelivery>((payload: IpayDelivery) => requestPayDelivery(payload), 'allDelivery')
}

export const useCreateDelivery = () => {
    return useGenericMutation<IcreateDelivery, IcreateDelivery>(
        (payload: IcreateDelivery) => requestCreateDelivery(payload),
        'allDelivery'
    )
}

export const useGetAllCategoriesWithProductCount = (token: string | undefined | null) => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: () => requestGetAllCategoriesWithProductCount(token)
    })
}
