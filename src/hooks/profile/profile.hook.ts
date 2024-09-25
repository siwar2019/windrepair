import { useQuery } from '@tanstack/react-query'
import { requestEditErpSetting, requestEditPassword, requestEditProfile, requestGetUser } from '../../controllers/profile/profile.api'
import { TChangePasswordForm, TEditErpSettingForm } from '../../interfaces/profile'
import { useGenericMutation } from '../../utils/react-query'

export const useEditProfile = () => {
    return useGenericMutation<FormData, FormData>((payload: FormData) => requestEditProfile(payload), 'user')
}

export const useEditPassword = () => {
    return useGenericMutation<TChangePasswordForm, TChangePasswordForm>(
        (data: TChangePasswordForm) => requestEditPassword(data).then((res) => res?.data),
        'user'
    )
}

export const useGetUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => requestGetUser()
    })
}

export const useEditErpSetting = () => {
    return useGenericMutation<TEditErpSettingForm, TEditErpSettingForm>(
        (payload: TEditErpSettingForm) => requestEditErpSetting(payload),
        'user'
    )
}
