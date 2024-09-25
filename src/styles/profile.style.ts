import { styled } from '@mui/material'
import CustomTextField from '../components/reusable/hook-form/custom-text-field'

export const StyledTextField = styled(CustomTextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: '1.25rem'
    }
}))
