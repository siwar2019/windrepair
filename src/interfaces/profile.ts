export type TEditProfileForm = {
    id?: number
    name?: string
    email?: string
    phone: string
    companyName?: string
    image?: File | string
}
export type TChangePasswordForm = {
    oldPassword: string
    newPassword: string
}

export type TEditErpSettingForm = {
    emailErpClient?: string
    nameCategory?: string
}
