import { TableCell, TableRow } from '@mui/material'
import moment from 'moment'
import {  ISubscriptionpayment } from '../../interfaces/partner'
import { useTranslation } from 'react-i18next'

type paymentDetailsProps = {
    rowData: ISubscriptionpayment
}
const PartnerPaymentDetailsRows = ({ rowData }: paymentDetailsProps) => {
    const {  payed, type, nbrEmployee, startDate, endDate } = rowData
    const { t } = useTranslation()

    return (
            <TableRow>
                <TableCell align="center">{type}</TableCell>
                <TableCell align="center">{nbrEmployee}</TableCell>
                <TableCell align="center">{payed ? t('employee.payment.payed') : t('employee.payment.notPayed')}</TableCell>
                <TableCell align="center">{moment(startDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">{moment(endDate).format('DD/MM/YYYY')}</TableCell>
            </TableRow>
    )
}
export default PartnerPaymentDetailsRows
