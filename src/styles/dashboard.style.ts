import { Typography, styled } from '@mui/material'
import Image from '../components/reusable/reusableImage'

export const StyledImage = styled(Image)(({ theme }) => ({
    top: '-45px',
    position: "relative",
    maxWidth: "40"
}))
export const StyledTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        fontSize: '1rem'
    },

    [theme.breakpoints.down('xl')]: {
        fontSize: '0.75rem'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem'
    }
}))