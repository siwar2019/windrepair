import { TableContainer, Table, TableBody, TableRow, Typography, Grid, TableCell } from '@mui/material'
import { StyledTableCell, StyledTableHead } from '../../../styles/table-head.style'
import { THeadCell } from '../../../interfaces/table'
import { ReactNode } from 'react'
import { sum } from 'lodash'
import { currency } from '../../../utils/constants'
import { useTranslations } from '../../../translation'
import EmptyTable from '../../reusable/table/empty-table'

export interface CustomTableContainerProps {
    headCells: THeadCell[]
    data: any[]
    rowCount?: number
    CustomRow: React.ComponentType<any>
    title: string
}

const ProblemDetails = (props: CustomTableContainerProps) => {
    const { headCells, data, CustomRow, title } = props
    const { t } = useTranslations()
    return (
        <TableContainer>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <StyledTableCell align={headCell.align} key={headCell.id}>
                                {headCell.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((rowData, index) => <CustomRow key={index} rowData={rowData} index={index} />)
                    ) : (
                        <EmptyTable title={title} />
                    )}
                    <TableRow>
                        <TableCell colSpan={headCells.length} align="right">
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {t('partDetail.total')}
                                {sum(data.map((price) => price.price))} {currency}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProblemDetails
