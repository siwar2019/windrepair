import { Box, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useTranslations } from '../../../../translation'
import FormProvider from '../../../reusable/hook-form/form-provider'
import CustomTextField from '../../../reusable/hook-form/custom-text-field'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { ICreateProduct } from '../../../../interfaces/product/product'
import { UseFormReturn } from 'react-hook-form'

export interface CreateCustomerProps {
    methods: UseFormReturn<ICreateProduct>
}

const CreateCustomerForm = ({ methods }: CreateCustomerProps) => {
    const { t } = useTranslations()
    const theme = useTheme()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: '50px' }}>
            <FormProvider methods={methods}>
                <Stack spacing={2}>
                    <Box sx={{ paddingTop: '20px' }}>
                        <Typography variant="h4" color="primary">
                            {t('ticketPage.addCustomer')}
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{t('common.name')}</Typography>
                            <CustomTextField border="simpleTextField" variant="outlined" name="customerName" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{t('ticketPage.fields.email')}</Typography>
                            <CustomTextField
                                border="simpleTextField"
                                variant="outlined"
                                name="email"
                                startIcon={<MailOutlineIcon sx={{ color: theme.palette.primary.main, margin: '1rem' }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{t('ticketPage.fields.phone')}</Typography>
                            <CustomTextField
                                border="simpleTextField"
                                variant="outlined"
                                name="phone"
                                type="number"
                                inputProps={{ maxLength: 8 }}
                                startIcon={<Typography sx={{ color: theme.palette.grey['A400'], margin: '1rem' }}>+216</Typography>}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </FormProvider>
        </Box>
    )
}

export default CreateCustomerForm
