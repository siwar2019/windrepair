import { requestForgotPassword, requestLogin, requestRegister, requestResetPassword } from '../controllers/auth.api'
import { TForgot, TLogin, TRegister, TReset } from '../interfaces/auth'
import { useGenericMutation } from '../utils/react-query'

export const useLogin = () => {
    return useGenericMutation<TLogin, TLogin>((payload: TLogin) => requestLogin(payload.userName, payload.password), 'login')
}

export const useRegister = () => {
    return useGenericMutation<TRegister, TRegister>((payload: TRegister) => requestRegister(payload), 'register')
}

export const useForgotPassword = () => {
    return useGenericMutation<TForgot, TForgot>((payload: TForgot) => requestForgotPassword(payload.email), 'forgotPassword')
}

export const useResetPassword = () => {
    return useGenericMutation<TReset, TReset>(
        (payload: TReset) => requestResetPassword(payload.password, payload.resetToken),
        'resetPassword'
    )
}
