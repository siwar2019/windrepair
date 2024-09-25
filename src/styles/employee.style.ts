import { InputLabel, TextField, Typography, styled } from '@mui/material'
import { primaryFont } from '../theme/typography'
import CustomTextField from '../components/reusable/hook-form/custom-text-field'

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.grey['900'],
    fontFamily: primaryFont,
    fontSize: '0.9rem',
    fontWeight: 400
}))
export const StyledRoleLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey['900'],
    fontFamily: primaryFont,
    fontSize: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem'
}))
export const StyledTextField = styled(CustomTextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: '0.5rem 1rem !important'
    },
    paddingBottom: 2
}))
export const StyledRoleTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: '0.5rem 1rem  !important'
    },
    paddingBottom: 2
}))
export const TextFieldStyled = styled(CustomTextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: '0.5rem 1rem !important',
        '&.Mui-disabled': {
            WebkitTextFillColor: theme.palette.common.black
        }
    }
}))
