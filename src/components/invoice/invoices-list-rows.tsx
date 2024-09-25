import { IconButton, Stack, TableCell, TableRow, useTheme } from '@mui/material'
import CustomLabel from '../reusable/hook-form/custom-label'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { COMMON } from '../../theme/palette'
import { TInvoice } from '../../interfaces/invoice'
import moment from 'moment'
import DownloadIcon from '@mui/icons-material/Download'
import AddMovement from '../movement/add-movement'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import handleDownloadInvoice from '../../utils/downloadInvoice'

type InvoicesListProps = {
    rowData: TInvoice
}

const InvoicesRows = ({ rowData }: InvoicesListProps) => {
    const { id, num, total, repairTicket, createdAt, status, paymentMethode } = rowData
    const theme = useTheme()
    const { t } = useTranslation()
    const [openAddPayment, setOpenAddPayment] = useState(false)
    const closeAddPayment = () => {
        setOpenAddPayment(false)
    }
    const handleDownloadClick = () => {
        handleDownloadInvoice({ num, total, repairTicket, createdAt, paymentMethode })
    }

    return (
        <>
            <TableRow>
                <TableCell align="center">{num}</TableCell>
                <TableCell align="center">{repairTicket.product?.client.name}</TableCell>
                <TableCell align="center">{moment(createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center">{total}</TableCell>
                <TableCell align="center">
                    <CustomLabel
                        backgroundColor={status ? COMMON.common.primary : theme.palette.primary.main}
                        label={status ? t('invoiceList.status.paye') : t('invoiceList.status.noPaye')}
                    />
                </TableCell>
                <TableCell align="center">{paymentMethode}</TableCell>
                <TableCell align="center">
                    <Stack display="flex" direction="row" alignItems="center" justifyContent="center">
                        {!status && <CurrencyExchangeIcon sx={{ cursor: 'pointer' }} onClick={() => setOpenAddPayment(true)} />}
                        <IconButton
                            onClick={handleDownloadClick}
                            sx={{
                                color: theme.palette.primary.main,
                                ':hover': {
                                    background: 'transparent'
                                }
                            }}
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Stack>
                </TableCell>
            </TableRow>
            <AddMovement open={openAddPayment} handleClose={closeAddPayment} id={id} tiketAmount={repairTicket.estimatedCost} />
        </>
    )
}

export default InvoicesRows
