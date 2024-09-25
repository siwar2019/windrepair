import { TableCell, styled } from '@mui/material'

export const roleStyle = {
    Card: {
        background: 'radial-gradient( #B2B1B1 -50%, #222222 100%)',
        height: '13vh',
        position: 'relative',
        '&.MuiCard-root': {
            display: 'flex',
            alignItems: 'end'
        }
    },
    icon: {
        position: 'absolute',
        top: '0rem',
        cursor: 'pointer',
        right: '0rem',
        backgroundColor: 'white',
        '&.MuiSvgIcon-root': {
            borderRadius: '5px'
        }
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    }
}
export const BorderedTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid #A3A2A2'
}))
