import { IconButton, styled,Typography } from '@mui/material'
import { primaryFont } from '../theme/typography'
import CustomButton from '../components/reusable/hook-form/custom-button'
import { COMMON } from '../theme/palette'
import Image from '../components/reusable/reusableImage'
export const StyledActionButton = styled(CustomButton)(({ theme }) => ({
    fontFamily: primaryFont,
    fontWeight: '700',
    fontSize: '1rem'
}))
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: 8,
    top: 8,
    color: COMMON.grey[1000]
}))
export const StyledCloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: 8,
    top: 19,
    color: COMMON.grey[1000]
}))
export const StyledTypography = styled(Typography)(({ theme }) => ({
   marginBottom:"0.4rem" ,
}))

export const TrashIcon = styled(Image)(({ theme }) => ({
    ml: '1rem',
    mt: '1rem',
    mb: '0.1rem'
}))
