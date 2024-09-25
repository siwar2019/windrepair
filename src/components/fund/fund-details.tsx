import { TableCell, TableRow, Typography } from '@mui/material'
import { TFund } from '../../interfaces/fund'
import moment from 'moment'
import { currency } from '../../utils/constants'

type FundDetailsProps = {
    rowData: TFund
}
const FundDetailsRows = ({ rowData }: FundDetailsProps) => {
    const { product, value, createdAt, main, cashRegister } = rowData
    return (
        <>
            {cashRegister?.main && cashRegister?.status === false ? (
                <TableRow>
                    <TableCell align="center">{cashRegister.name}</TableCell>
                    <TableCell align="center">{moment(createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center">
                        {value} {currency}
                    </TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell align="center">{cashRegister?.name}</TableCell>
                    <TableCell align="center">{moment(createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{product?.name || product?.model}</TableCell>
                    <TableCell align="center">{product?.client.name}</TableCell>
                    <TableCell align="center">
                        {value} {currency}
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
export default FundDetailsRows
