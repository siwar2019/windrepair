import { Button, styled } from '@mui/material'
import CustomButton from '../components/reusable/hook-form/custom-button'

export const StyledButtonCancel = styled(CustomButton)(({ theme }) => ({
    '&.MuiButtonBase-root, .MuiButton-root': {
        border: `1px solid ${theme.palette.grey[700]}`,
        borderRadius: 15,
        color: theme.palette.common.black,
        '&.MuiButtonBase-root, MuiButton-root:hover': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
            border: `1px solid ${theme.palette.grey[700]}`
        }
    }
}))

export const StyledButtonSave = styled(CustomButton)(({ theme }) => ({
    '&.MuiButtonBase-root, .MuiButton-root': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 15,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    }
}))
export const StyledButtonAdd = styled(Button)(({ theme }) => ({
    '&.MuiButtonBase-root, .MuiButton-root': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 30,
        color: theme.palette.common.white
    }
}))
