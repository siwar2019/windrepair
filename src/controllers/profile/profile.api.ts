import { TChangePasswordForm, TEditErpSettingForm } from '../../interfaces/profile'
import { ApiPaths } from '../../utils/api-paths'
import axios from '../../utils/axios'

export const requestEditProfile = async (payload: FormData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return await axios.patch(`${ApiPaths.USER}/${ApiPaths.EDIT_PROFILE}`, payload, config)
}

export const requestEditPassword = async (payload: TChangePasswordForm) => {
    return await axios.patch(`${ApiPaths.USER}/${ApiPaths.CHANGE_PASSWORD}`, payload)
}
export const requestGetUser = async () => {
    const res = await axios.get(`${ApiPaths.USER}/${ApiPaths.GET_USER_DATA}`)
    return res.data.data
}

export const requestEditErpSetting = async (payload: TEditErpSettingForm) => {
    return await axios.patch(`${ApiPaths.USER}/${ApiPaths.ADD_EMAIL_ERP}`, payload)
}
