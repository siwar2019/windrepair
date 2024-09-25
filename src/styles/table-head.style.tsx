import { OutlinedInput, TableCell, TableHead } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.common.white
}))
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.white
}))
export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: 15,
    [theme.breakpoints.up('xl')]: {
        width: '60%'
    },
    [theme.breakpoints.down('lg')]: {
        width: '45%'
    },
    [theme.breakpoints.down('md')]: {
        width: '26%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '25%'
    }
}))
