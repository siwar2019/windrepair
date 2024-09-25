import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material'
import Radio from '@mui/material/Radio'
import { Stack } from '@mui/system'
import { useTranslations } from '../../../translation'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PaymentCard from './cardPayment'
import { UseFormReturn } from 'react-hook-form'
import { TYPE_PAYMENT, amountPayment, amountPaymentFree } from '../../../utils/constants'

type IRegisterProps = {
    onSubmit?: VoidFunction
    methods: UseFormReturn<any>
    isPending: boolean
}

const PaymentForm = ({ onSubmit, methods, isPending }: IRegisterProps) => {
    const { t } = useTranslations()
    const features = [
        { icon: <CheckCircleIcon />, text: t('payment.file') },
        { icon: <CheckCircleIcon />, text: t('payment.storage') },
        { icon: <CheckCircleIcon />, text: t('payment.support') }
    ]

    return (
        <Box p={3}>
            <Typography variant="h1" fontWeight={'bold'} p={2}>
                {t('payment.payment')}
            </Typography>

            <Stack gap="1.5rem">
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={methods.watch('typePayment')}
                    onChange={(e) => methods.setValue('typePayment', e.target.value)}
                    name="typePayment"
                >
                    <FormControlLabel value={TYPE_PAYMENT.FREE} control={<Radio />} label={t('payment.free')} />
                    <FormControlLabel value={TYPE_PAYMENT.STANDARD} control={<Radio />} label={t('payment.payed')} />
                </RadioGroup>

                {methods.watch().typePayment === 'free' ? (
                    <PaymentCard
                        title={t('payment.demo')}
                        price={`${amountPaymentFree.toString()}00.000 TND`}
                        features={features}
                        onSubmit={onSubmit}
                        buttonText={t('payment.getStarted')}
                        placeholder={t('payment.users')}
                        isPending={isPending}
                    />
                ) : (
                    <PaymentCard
                        title={t('payment.standard')}
                        price={`${amountPayment.toString()}.000 TND`}
                        features={features}
                        onSubmit={onSubmit}
                        buttonText={t('payment.getStarted')}
                        placeholder={t('payment.users')}
                        isPending={isPending}
                    />
                )}
            </Stack>
        </Box>
    )
}

export default PaymentForm
