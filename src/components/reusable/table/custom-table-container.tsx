import { TableContainer, Table, TableBody, TableRow, Typography, Grid, TableCell } from '@mui/material'
import { StyledTableCell, StyledTableHead } from '../../../styles/table-head.style'
import EmptyTable from './empty-table'
import { THeadCell } from '../../../interfaces/table'

import { useTranslations } from '../../../translation'

export interface CustomTableContainerProps {
    headCells: THeadCell[]
    data: any[]
    rowCount?: number
    CustomRow: React.ComponentType<any>
    title: string
}

const CustomTableContainer = (props: CustomTableContainerProps) => {
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
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CustomTableContainer
