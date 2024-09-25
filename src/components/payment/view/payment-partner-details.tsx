import {  Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { usePaymentPartner } from '../../../hooks/partner.hook'
import { useMemo } from 'react'
import CustomModal from '../../reusable/customModal/custom-modal'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import { THeadCell } from '../../../interfaces/table'
import PartnerPaymentDetailsRows from '../payment-partner-details-rows'

type PaymentPartnerDetailsProps = {
    id: number
    open: boolean
    onClose: () => void
}
const PaymentPartnerDetailsView = ({ id, open, onClose }: PaymentPartnerDetailsProps) => {
    const { t } = useTranslation()
    const { data } = usePaymentPartner(id)
    const partnerPaymentData = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])
    const handleCloseModal = () => {
        onClose()
    }
    const tableHead: THeadCell[] = [
        { id: '1', label: t('employee.payment.type'), align: 'center' },
        {
            id: '2',
            label: t('employee.payment.nbreEmployees'),
            align: 'center'
        },
        { id: '3', label: t('employee.payment.payment'), align: 'center' },

        { id: '4', label: t('ticketPage.fields.startDate'), align: 'center' },
        { id: '5', label: t('ticketPage.fields.endDate'), align: 'center' }
    ]
    return (
        <CustomModal
            maxWidth="60%"
            open={open}
            handleClose={handleCloseModal}
            title={t('employee.payment.title')}
            data-testid="detailsPayment"
        >
            <Stack>
                <CustomTableContainer
                    rowCount={partnerPaymentData.length}
                    headCells={tableHead}
                    data={partnerPaymentData}
                    CustomRow={PartnerPaymentDetailsRows}
                    title={'paymentDetails'}
                />
            </Stack>
        </CustomModal>
    )
}

export default PaymentPartnerDetailsView
