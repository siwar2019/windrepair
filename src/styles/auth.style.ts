import { Box, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { primaryFont, secondaryFont } from '../theme/typography'
import { Link } from 'react-router-dom'


export const StyledElementBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
}))
export const StyledTitle = styled(Typography)(({ theme }) => ({
    fontFamily: secondaryFont,
    color: theme.palette.common.white,
    width: '50%',

    [theme.breakpoints.down('lg')]: {
        width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
        marginTop: '2.5rem'
    }
}))
export const StyledDescription = styled(Typography)(({ theme }) => ({
    fontFamily: primaryFont,
    color: theme.palette.common.white,
    fontSize: 30,
    wordBreak: 'break-word',
    width: '10rem',
    [theme.breakpoints.down('lg')]: {
        width: '9rem'
    },

    [theme.breakpoints.up('xl')]: {
        marginTop: '15px',
        width: '12rem'
    }
}))
export const StyledLink = styled(Link)(({ theme }) => ({
    fontFamily: primaryFont,
    color: theme.palette.common.black,
    paddingTop: 5,
    fontWeight: '600',
    fontSize: '0.75rem'
}))
export const payment = {
    card: {
        maxWidth: 275,
        minHeight: 500,
        backgroundColor: "black",
        '&.MuiCard-root': {
            boxShadow: 'rgb(191 15 15 / 68%) 0px 3px 3px -2px, rgb(175 35 35 / 54%) 0px 3px 10px 8px, #DB2512 0px 0px 0px 0px;',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            border: "1px solid #DB2512",
            margin: 'auto'
        }
    },
    cardContent: {
        color: "white",
        '&.MuiCardContent-root': {
            padding: '0px'
        }
    },
    title: {
        fontSize: 14,
        backgroundColor: '#DB2512',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
}
