import React from 'react'
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import { payment } from '../../../styles/auth.style'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../reusable/hook-form/custom-button'

interface Feature {
    icon: JSX.Element
    text: string
}
type PaymentCardProps = {
    title: string
    price: string
    features: Feature[]
    onSubmit: VoidFunction | undefined
    buttonText: string
    placeholder: string
    loading?: boolean
    isPending: boolean
}

const PaymentCard = ({ title, price, features, buttonText, onSubmit, placeholder, isPending }: PaymentCardProps) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Card sx={payment.card}>
            <CardContent sx={payment.cardContent}>
                <Typography sx={payment.title} gutterBottom>
                    {t('payment.bestValue')}
                </Typography>
                <Box p={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 'bold' }}>
                        {price} <Typography variant="caption">/ month</Typography>
                    </Typography>
                    <CustomTextField
                        name="nbrEmployee"
                        border="formTextField"
                        placeholder={placeholder}
                        sx={{
                            paddingBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white'
                            }
                        }}
                    />
                    <Grid container spacing={2}>
                        {features.map((feature, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={2}>
                                    {feature.icon}
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography display="flex">{feature.text}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                    <CustomButton
                        backGroundColor={theme.palette.primary.main}
                        textColor={theme.palette.common.white}
                        variant={'text'}
                        hoover={false}
                        border={''}
                        type="submit"
                        sx={{ marginTop: '2rem', borderRadius: '5px' }}
                        onClick={onSubmit}
                        loading={isPending}
                    >
                        {buttonText}
                    </CustomButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PaymentCard
