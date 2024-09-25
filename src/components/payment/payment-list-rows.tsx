import { TableCell, TableRow } from '@mui/material'
import { ImgPaths } from '../../utils/image-paths'
import Image from '../reusable/reusableImage'
import { TPayment } from '../../interfaces/payment'
import moment from 'moment'
type PaymentsListProps = {
    rowData: TPayment
}
const PaymentRows = ({ rowData }: PaymentsListProps) => {
    const {  startDate, endDate, user, subscription } = rowData

    return (
        <TableRow>
            <TableCell align="center">{user.companyName}</TableCell>
            <TableCell align="center">{moment(startDate).format('DD/MM/YYYY')}</TableCell>
            <TableCell align="center">{moment(endDate).format('DD/MM/YYYY')}</TableCell>
            <TableCell align="center">{subscription?.price}</TableCell>
            <TableCell align="center">
                <Image  sx={{ cursor: 'pointer' }} src={ImgPaths.view} />
            </TableCell>
        </TableRow>
    )
}
export default PaymentRows
