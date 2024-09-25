import { styled } from '@mui/material'
import { primaryFont } from '../theme/typography'

export const StyledText = styled('span')(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.common.black,
    marginTop: '1rem',
    fontFamily: primaryFont,
    fontSize: '0.8rem' ,

}))
