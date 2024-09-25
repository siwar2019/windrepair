import CustomModal from '../reusable/customModal/custom-modal'
import { FormProvider, useForm } from 'react-hook-form'
import { StyledButtonCancel, StyledButtonSave } from '../../styles/custom-buttons.style'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Toast from '../reusable/custom-toast'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { StyledTextField } from '../../styles/employee.style'
import { TFund } from '../../interfaces/fund'
import { useUpdateFund } from '../../hooks/fund.hook'
import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type updateFundProps = {
    fund: TFund
    open: boolean
    onClose: () => void
}

const UpdateFund = ({ fund, open, onClose }: updateFundProps) => {
    const { t } = useTranslation()

    const theme = useTheme()
    const { id, name, bankAccount, initialValue, status } = fund
    const [currentStatus, setStatus] = React.useState(status)

    const { mutateAsync: updateFund, isPending } = useUpdateFund()

    const editFundSchema = Yup.object().shape({
        name: Yup.string().required(t('fundList.fundNameRequired')),
        bankAccount: Yup.string()
            .required(t('fundList.bankAmountRequired'))
            .matches(/^[a-zA-Z0-9]{1,24}$/, t('fundList.accountBankMinLength')),
        initialValue: Yup.number().required(t('fundList.initialAmountRequired')),
        status: Yup.mixed().test('is-valid-status', t('fundList.statusRequired'), (value) => {
            return (typeof value === 'string' || typeof value === 'boolean') && value !== ''
        })
    })
    const [error, setError] = React.useState('')

    const defaultValues = {
        name: name || '',
        bankAccount: bankAccount || '',
        initialValue: initialValue || 0,
        status: currentStatus
    }

    const methods = useForm({
        resolver: yupResolver(editFundSchema),
        mode: 'all',
        defaultValues
    })

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value
        methods.setValue('status', selectedValue)
        setStatus(selectedValue)
        setError('')
    }

    React.useEffect(() => {
        if (methods.formState.errors.status) {
            setError(t('fundList.updateFund'))
            return
        }
    }, [methods.formState.errors.status])

    const onSubmit = async () => {
        const formData = methods.getValues()
        try {
            let booleanStatus: boolean | undefined
            if (formData.status === 'true') {
                booleanStatus = true
            } else if (formData.status === 'false') {
                booleanStatus = false
            }

            await updateFund(
                {
                    id: id,
                    name: formData.name,
                    bankAccount: formData.bankAccount,
                    initialValue: formData.initialValue,
                    status: booleanStatus
                },
                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t(`fundList.cashRegisterUpdatedSuccessfully`),
                                type: 'success'
                            })
                        }
                        onClose()
                    }
                }
            ).catch((data) => {
                Toast({
                    message: t(`fundList.messages.existingCashRegisterName`),
                    type: 'error'
                })
            })
        } catch (_err) {
            Toast({
                message: t(`fundList.error`),
                type: 'error'
            })
        }
    }
    return (
        <CustomModal open={open} handleClose={onClose} title={t('fundList.updateFund')} data-testid="editCustomer">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container item flexDirection="row" pt={5} spacing={2} justifyContent="center">
                        <Grid item md={6} xs={12}>
                            <Typography>{t('fundList.fundName')}</Typography>
                            <StyledTextField name="name" border="simpleTextField" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography>{t('fundList.initialAmount')}</Typography>
                            <StyledTextField name="initialValue" border="simpleTextField" />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Typography>{t('fundList.bankAccount')}</Typography>
                            <StyledTextField border="simpleTextField" name="bankAccount" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography>{t('fundList.status')}</Typography>
                            <Select
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-input': {
                                        padding: '0.5rem 1rem !important'
                                    }
                                }}
                                id="demo-simple-select"
                                value={currentStatus as string}
                                onChange={handleChange}
                            >
                                <MenuItem value={'true'}>{t('fundList.open')}</MenuItem>
                                <MenuItem value={'false'}>{t('fundList.closed')}</MenuItem>
                            </Select>
                            {error && (
                                <span style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}>
                                    {t('fundList.statusRequired')}
                                </span>
                            )}
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" pt={5}>
                        <StyledButtonCancel
                            onClick={onClose}
                            backGroundColor={theme.palette.common.white}
                            textColor={theme.palette.common.black}
                            variant={'text'}
                            hoover={true}
                            border={theme.palette.common.white}
                            sx={{ width: '9rem' }}
                        >
                            {t('customerListPage.action.cancel')}
                        </StyledButtonCancel>
                        <StyledButtonSave
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            variant={'text'}
                            hoover={true}
                            border={theme.palette.primary.main}
                            sx={{ width: '9rem' }}
                            loading={isPending}
                            type="submit"
                        >
                            {t('customerListPage.action.save')}
                        </StyledButtonSave>
                    </Stack>
                </form>
            </FormProvider>
        </CustomModal>
    )
}
export default UpdateFund
