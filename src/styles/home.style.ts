import { Box, Divider, Grid, Typography, styled } from '@mui/material'
import CustomTextField from '../components/reusable/hook-form/custom-text-field'
import { primaryFont, secondaryFont } from '../theme/typography'
import { ImgPaths } from '../utils/image-paths'



export const TypographyTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontFamily: secondaryFont,
    textTransform: 'uppercase',
    maxWidth: '70%'
}))
export const TypographyDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontFamily: primaryFont,
    marginTop: '1rem'
}))
export const StyledDivider = styled(Divider)(({ theme }) => ({
    borderColor: theme.palette.grey['700'],
    borderWidth: '0.1rem'
}))
export const BoxButtons = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '1rem',
    marginBottom: '9rem'

}))
export const StyledDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontFamily: primaryFont
}))
export const StyledTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontFamily: secondaryFont
}))
export const SectionTwoGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    gap: '1rem',
    padding: '0rem 0rem 1rem 0rem'
}))
export const SectionOneBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    marginBottom: '2.5rem'
}))

export const TypographyDetails = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    //
    '@media (max-width:400px)': {
        fontSize: "14px"

    },
}))


export const boxCode = {
    titleCode: {
        fontWeight: "bold",
        textTransform: "uppercase",

    },
    paragCode: {
        borderRadius: '10px',
        border: '2px solid white',
        minWidth: '30%',
        margin: 'auto',
        padding: '1rem',
        zIndex: 2
    },
    followBox: {
        backgroundImage: `url(${ImgPaths.codeSlide})`,
        position: 'relative',
        backgroundPosition: 'center',
        display: 'flex',
        padding: '4rem',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: ' rgba(0, 0, 0, 0.5)'
        }
    },
    CustomTextField: {
        paddingBottom: 2,
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'white'
        }
    },
    CustomButton: {
        width: '7rem',
        '&.MuiButton-root.MuiButtonBase-root': {
            margin: 'auto'
        }
    },
    paper: {
        width: "90%",
        borderTop: "1.5rem solid red",
        margin: "auto",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: 'translate(0%, 10%)',
        "& .MuiPaper-root": {
            borderTop: "3% solid red",
            marginTop: '2rem'
        }
    },
    TypographyDetails: {
        padding: ' 2rem 1rem',
        fontSize: '2.5rem'
    },
    noData: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
}

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.dark,
    textTransform: 'uppercase',
    fontFamily: 'Days One',
    lineHeight: '1',
    fontWeight: 'bold',
    marginBottom: '1rem',
    [theme.breakpoints.down('lg')]: {
        fontSize: '1rem'
    },

    [theme.breakpoints.down('xl')]: {
        fontSize: '0.8rem'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem'
    }
}))
export const StyledGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        padding: '3%'
    },
    [theme.breakpoints.down('md')]: {
        padding: '6%'
    }
}))
export const TypographyFooter = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '3rem',
    marginTop: '5rem',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        fontSize: '6rem'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '2rem'
    }
}))
export const TypographyQuestion = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    lineHeight: '1',
    fontWeight: 'bold',
    marginBottom: '1rem'
}))
