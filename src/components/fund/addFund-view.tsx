import { useForm } from 'react-hook-form'
import { Grid, useTheme } from '@mui/material'
import { useTranslations } from '../../translation'
import CustomModal from '../reusable/customModal/custom-modal'
import FormProvider from '../reusable/hook-form/form-provider'
import { StyledInputLabel, StyledTextField } from '../../styles/employee.style'
import { useResponsive } from '../../utils/use-responsive'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import CustomButton from '../reusable/hook-form/custom-button'
import { useCreateFund } from '../../hooks/fund.hook'
import Toast from '../reusable/custom-toast'

interface IAddFundProps {
    open: boolean
    handleClose: () => void
}
const AddFund = ({ open, handleClose }: IAddFundProps) => {
    const { t } = useTranslations()
    const theme = useTheme()
    const smUp = useResponsive('up', 'sm')
    const { mutateAsync: createFund } = useCreateFund()

    const createFindSchema = Yup.object().shape({
        name: Yup.string().required(t('fundList.fundNameRequired')),
        initialValue: Yup.number().required(t('fundList.initialAmountRequired')),
        bankAccount: Yup.string()
            .required(t('fundList.bankAmountRequired'))
            .matches(/^[0-9]{1,24}$/, t('fundList.accountBankMinLength'))
    })
    const defaultValues = {
        name: '',
        initialValue: 0,
        bankAccount: ''
    }
    const methods = useForm({
        resolver: yupResolver(createFindSchema),
        defaultValues,
        mode: 'all'
    })
    const { handleSubmit, reset } = methods
    const onSubmit = handleSubmit(async (values) => {
        await createFund(
            { name: values.name, bankAccount: values.bankAccount, initialValue: values.initialValue, status: '0' },

            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        Toast({
                            message: t(`fundList.fundCreated`),
                            type: 'success'
                        })
                        handleClose()
                        reset()
                    }
                }
            }
        ).catch((data) => {
            Toast({
                message: t(`fundList.messages.existingCashRegisterName`),
                type: 'error'
            })
        })
    })

    return (
        <CustomModal open={open} title={t('fundList.addFund')} handleClose={handleClose}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} item>
                        <StyledInputLabel
                            htmlFor="component-simple"
                            sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.6rem' : '0rem' }}
                        >
                            {t('fundList.name')}
                        </StyledInputLabel>
                        <StyledTextField name="name" border="simpleTextField" />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <StyledInputLabel
                            htmlFor="component-simple"
                            sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.6rem' : '0rem' }}
                        >
                            {t('fundList.initialAmount')}
                        </StyledInputLabel>
                        <StyledTextField name="initialValue" border="simpleTextField" />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={12} item>
                        <StyledInputLabel
                            htmlFor="component-simple"
                            sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.6rem' : '0rem' }}
                        >
                            {t('fundList.bankAccount')}
                        </StyledInputLabel>
                        <StyledTextField
                            name="bankAccount"
                            border="simpleTextField"
                            inputProps={{
                                maxlength: 24
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <CustomButton
                            variant="contained"
                            data-testid="confirm"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border={'none'}
                            type="submit"
                            sx={{ padding: '1rem', width: '50%' }}
                        >
                            {t('fundList.confirm')}
                        </CustomButton>
                    </Grid>
                </Grid>
            </FormProvider>
        </CustomModal>
    )
}
export default AddFund
