import { styled } from '@mui/material/styles'
import { Button, Box } from '@mui/material'

export const AddLineButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.common.black,
    padding: '1rem',
    border: 'none',
    width: '80px',
    '&:hover': {
        backgroundColor: 'transparent',
        border: 'none'
    }
}))

export const AddColumnButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '1rem',
    borderRadius: '8px',
    width: '80px',
    height: '56px',
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    }
}))

export const NumberButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: '8px',
    width: '80px',
    height: '56px',
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'default',
    '&:hover': {
        backgroundColor: theme.palette.common.black
    }
}))

export const SubStoreButton = styled(Button)(({ theme }) => ({
    height: '56px',
    borderRadius: '8px',
    width: '80px',
    border: `1px solid ${theme.palette.common.black}`,
    backgroundColor: 'transparent',
    color: theme.palette.grey[200],
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'default',
    '&:hover': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.common.black}`
    },
    '& .MuiButton-label': {
        textAlign: 'center'
    }
}))

export const ProductCountBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '0 25% 0 25%',
    zIndex: 1
}))
