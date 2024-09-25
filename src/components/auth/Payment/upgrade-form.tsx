import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslations } from '../../../translation'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaymentCard from './cardPayment'
import Toast from '../../reusable/custom-toast'
import { useGenerateQrCode } from '../../../hooks/payment/payment.hook'
import { Dispatch, SetStateAction, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import QrCodeCard from './qrCodeCard'
import { amountPayment } from '../../../utils/constants'

type IUpgradePaymentProps = {
    username: string
    setDisplayContent: Dispatch<SetStateAction<number>>
}

const UpgradePaymentForm = ({ username, setDisplayContent }: IUpgradePaymentProps) => {
    const { t } = useTranslations()
    const features = [
        { icon: <CheckCircleIcon />, text: t('payment.file') },
        { icon: <CheckCircleIcon />, text: t('payment.storage') },
        { icon: <CheckCircleIcon />, text: t('payment.support') }
    ]
    const { mutateAsync: generateQrCode, isPending: qrCodePending } = useGenerateQrCode()
    const [qrCode, setQrCode] = useState('')
    const [codePay, setCodePay] = useState('')

    const upgradeSchema = Yup.object().shape({
        nbrEmploye: Yup.number()
    })

    const defaultValues = {
        nbrEmploye: 2
    }

    const methods = useForm({
        resolver: yupResolver(upgradeSchema),
        defaultValues,
        mode: 'all'
    })

    const onSubmit = async () => {
        await generateQrCode(
            {
                amount: amountPayment,
                username: username
            },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        setQrCode(data.data.data.qrCodeImage)
                        setCodePay(data.data.data.codePay)
                    }
                }
            }
        ).catch((data) => {
            Toast({
                message: t(`auth.messages.${data.message}`),
                type: 'error'
            })
        })
    }

    return (
        <FormProvider {...methods}>
            {qrCode ? (
                <QrCodeCard image={qrCode} codePay={codePay} isPending={qrCodePending} setDisplayContent={setDisplayContent} />
            ) : (
                <Box p={3}>
                    <Typography variant="h1" fontWeight={'bold'} p={2}>
                        {t('payment.payment')}
                    </Typography>

                    <Stack gap="1.5rem">
                        <PaymentCard
                            title={t('payment.standard')}
                            price={`${amountPayment.toString()}00.000 TND`}
                            features={features}
                            onSubmit={methods.handleSubmit(onSubmit)}
                            buttonText={t('payment.getStarted')}
                            placeholder={t('payment.users')}
                            isPending={qrCodePending}
                        />
                    </Stack>
                </Box>
            )}
        </FormProvider>
    )
}

export default UpgradePaymentForm
