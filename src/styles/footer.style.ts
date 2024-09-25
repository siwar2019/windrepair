import { Box, Grid, Typography, styled } from '@mui/material'
import { primaryFont } from '../theme/typography'
import { Icon } from '@iconify/react'
import Divider from '@mui/material/Divider'

export const FooterBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    display: 'grid',
    padding: '80px',
    [theme.breakpoints.down('sm')]: {
        Padding: '0rem'
    }
}))
export const FooterGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.common.black
}))
export const TitleTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontFamily: primaryFont,
    marginBottom: '1rem'
}))
export const LinkTypography = styled(Typography)(() => ({
    p: '0.5rem',
    fontFamily: primaryFont
}))
export const StyledIcon = styled(Icon)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: '0.5rem',
    width: '2rem',
    height: '2rem'
}))
export const StyledTypo = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '70%'
}))
export const StyledDivider = styled(Divider)(({ theme }) => ({
    borderColor: theme.palette.secondary.lighter,
    borderWidth: '0.1rem'
}))
export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: 'white'
}))
