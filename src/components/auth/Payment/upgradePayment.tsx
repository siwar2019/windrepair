import { Box, Typography, useTheme } from '@mui/material'
import CustomButton from '../../reusable/hook-form/custom-button'
import { useTranslation } from 'react-i18next'
import { subscription } from '../../../utils/constants'

interface UpgradePaymentProps {
    onClose: () => void
    handleUpgrade: () => void
    message: string
}

const UpgradePayment = ({ handleUpgrade, onClose, message }: UpgradePaymentProps) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
            {message === subscription.NOT_PAID ? (
                <Typography> {t('payment.notPaid')}</Typography>
            ) : (
                <Typography> {t('payment.expiredPayment')}</Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <CustomButton
                    onClick={onClose}
                    variant="contained"
                    data-testid="backButton"
                    backGroundColor={theme.palette.common.white}
                    textColor={theme.palette.common.black}
                    hoover={false}
                    border={'none'}
                    sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                >
                    {t('common.close')}
                </CustomButton>
                <CustomButton
                    onClick={handleUpgrade}
                    variant="contained"
                    data-testid="backButton"
                    backGroundColor={theme.palette.primary.main}
                    textColor={theme.palette.common.white}
                    hoover={false}
                    border={'none'}
                    sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                >
                    {t('common.yes')}
                </CustomButton>
            </Box>
        </Box>
    )
}

export default UpgradePayment
