import { TableCell, TableRow, Typography, useTheme, Button } from '@mui/material'
import { Delivery } from '../../interfaces/delivery/delivery'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { COMMON } from '../../theme/palette'
import { PaymentStatusDelivred, StatusDelivred, currency } from '../../utils/constants'
import { useConfirmDelivery, usePayDelivery } from '../../hooks/settings.hook'
import CustomSelectMenu from '../reusable/custom-select-menu'
import Toast from '../reusable/custom-toast'

type DeliveryListProps = {
    rowData: Delivery
}

const DeliveryRows = ({ rowData }: DeliveryListProps) => {
    const { uuid, totalTtc, invoiceNumber, invoiceDate, deliveryDate, status, left_to_pay, paymentStatus } = rowData
    const { t } = useTranslation()
    const theme = useTheme()
    const token = localStorage.getItem('erpToken')
    const { mutateAsync: confirmDelivery } = useConfirmDelivery()
    const { mutateAsync: payDelivery } = usePayDelivery()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const [openStausDelivred, setOpenStatusDelivred] = useState(false)

    const handleCloseStatusDelivred = () => {
        setOpenStatusDelivred(false)
    }

    const [opePaymentStaus, setOpenPaymentStatus] = useState(false)

    const handleClosePaymentStatus = () => {
        setOpenPaymentStatus(false)
    }

    const onChangeStatusDelivred = async () => {
        if (!token) {
            Toast({
                message: t('common.erpNotConnect'),
                type: 'error'
            })
        } else {
            await confirmDelivery(
                { token, updatedItemUuid: uuid },
                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t('deliveryList.messages.deliveryConfirmedSuccessfully'),
                                type: 'success'
                            })
                        }
                    }
                }
            ).catch((data) => {
                Toast({
                    message: data.message,
                    type: 'error'
                })
            })
        }
        handleCloseStatusDelivred()
    }

    const onChangePaymentStatus = async () => {
        if (!token) {
            Toast({
                message: t('common.erpNotConnect'),
                type: 'error'
            })
        } else {
            await payDelivery(
                { token, uuid },
                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t('deliveryList.messages.deliveryPayedSuccessfully'),
                                type: 'success'
                            })
                        }
                    }
                }
            ).catch((data) => {
                Toast({
                    message: data.message,
                    type: 'error'
                })
            })
        }
        handleClosePaymentStatus()
    }

    const labelColorForStatusDelivered = (status: string | boolean | null) => {
        switch (status) {
            case StatusDelivred.DELIVRED:
                return COMMON.common.green
            case StatusDelivred.NOT_DELIVRED:
                return COMMON.common.yellow
            default:
                return ''
        }
    }

    const labelTraductionForStatusDelivered = (status: string | boolean | null) => {
        switch (status) {
            case StatusDelivred.DELIVRED:
                return t('deliveryList.fields.delivered')
            case StatusDelivred.NOT_DELIVRED:
                return t('deliveryList.fields.notDelivered')
            default:
                return status as string
        }
    }

    const labelColorForPaymentStatus = (status: string | boolean | null) => {
        switch (status) {
            case PaymentStatusDelivred.PAYED:
                return COMMON.common.green
            case PaymentStatusDelivred.NOT_PAYED:
                return COMMON.common.yellow
            default:
                return ''
        }
    }

    const labelTraductionForPaymentStatus = (status: string | boolean | null) => {
        switch (status) {
            case PaymentStatusDelivred.PAYED:
                return t('deliveryList.fields.payed')
            case PaymentStatusDelivred.NOT_PAYED:
                return t('deliveryList.fields.notPayed')
            default:
                return status as string
        }
    }

    return (
        <>
            <TableRow>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {invoiceNumber}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {invoiceDate}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {deliveryDate}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    {status === StatusDelivred.NOT_DELIVRED ? (
                        <CustomSelectMenu
                            openConfirmation={openStausDelivred}
                            handleCloseConfirmation={handleCloseStatusDelivred}
                            handleOpenConfirmation={() => setOpenStatusDelivred(true)}
                            handleChangeStatus={onChangeStatusDelivred}
                            description={t('deliveryList.status')}
                            labelColor={labelColorForStatusDelivered}
                            labelTraduction={labelTraductionForStatusDelivered}
                            status={status}
                            listStatus={[StatusDelivred.DELIVRED]}
                            displayMenu={true}
                        />
                    ) : (
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{
                                borderRadius: 1,
                                justifyContent: 'center',
                                width: 105,
                                fontSize: '0.75rem',
                                padding: '1rem',
                                height: '32px',
                                lineHeight: '1.5',
                                minHeight: '1',
                                color: theme.palette.common.white,
                                backgroundColor: labelColorForStatusDelivered(status),
                                cursor: 'default',
                                '&:hover': {
                                    backgroundColor: labelColorForStatusDelivered(status)
                                }
                            }}
                        >
                            {labelTraductionForStatusDelivered(status)}
                        </Button>
                    )}
                </TableCell>
                <TableCell align="center">
                    {paymentStatus === PaymentStatusDelivred.NOT_PAYED && status === StatusDelivred.DELIVRED ? (
                        <CustomSelectMenu
                            openConfirmation={opePaymentStaus}
                            handleCloseConfirmation={handleClosePaymentStatus}
                            handleOpenConfirmation={() => setOpenPaymentStatus(true)}
                            handleChangeStatus={onChangePaymentStatus}
                            description={t('deliveryList.paymentStatus')}
                            labelColor={labelColorForPaymentStatus}
                            labelTraduction={labelTraductionForPaymentStatus}
                            status={paymentStatus}
                            listStatus={[PaymentStatusDelivred.PAYED]}
                            displayMenu={true}
                        />
                    ) : (
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{
                                borderRadius: 1,
                                justifyContent: 'center',
                                width: 105,
                                fontSize: '0.75rem',
                                padding: '1rem',
                                height: '32px',
                                lineHeight: '1.5',
                                minHeight: '1',
                                color: theme.palette.common.white,
                                backgroundColor: labelColorForPaymentStatus(paymentStatus),
                                cursor: 'default',
                                '&:hover': {
                                    backgroundColor: labelColorForPaymentStatus(paymentStatus)
                                }
                            }}
                        >
                            {labelTraductionForPaymentStatus(paymentStatus)}
                        </Button>
                    )}
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {totalTtc} {currency}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {left_to_pay} {currency}
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    )
}

export default DeliveryRows
