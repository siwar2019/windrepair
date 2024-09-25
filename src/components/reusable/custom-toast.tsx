import { ReactNode } from 'react'
import { toast, TypeOptions, Theme, ToastPosition } from 'react-toastify'
import { COMMON } from '../../theme/palette'

type ToastProps = {
    message: string | ReactNode
    type: TypeOptions
    theme?: Theme
    position?: ToastPosition
}
const Toast = ({ message, type, theme, position }: ToastProps) => {
    toast(message, {
        type,
        position: position || 'top-right',
        theme: theme || 'light',
        hideProgressBar: false,
        closeButton: true,
        style: {
            color: COMMON.common.black
        }
    })
}

export default Toast
