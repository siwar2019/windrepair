import CustomModal from '../reusable/customModal/custom-modal'
import { FormProvider, useForm } from 'react-hook-form'
import CustomTextField from '../reusable/hook-form/custom-text-field'
import { StyledButtonCancel, StyledButtonSave } from '../../styles/custom-buttons.style'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEditCustomer } from '../../hooks/customer.hook'
import * as Yup from 'yup'
import Toast from '../reusable/custom-toast'
import { ICustomer } from '../../interfaces/customer'
import { Grid, IconButton, InputAdornment, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { StyledTextField } from '../../styles/employee.style'
type EditCustomerProps = {
    customer: ICustomer
    open: boolean
    onClose: () => void
}
const EditCustomer = ({ customer, open, onClose }: EditCustomerProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { id, name, phone, email } = customer
    const { mutateAsync: editCustomer, isPending } = useEditCustomer()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((showConfirm) => !showConfirm)
    const editCustomerSchema = Yup.object().shape({
        name: Yup.string().required(t('common.name')),
        phone: Yup.string()
            .required(t('auth.registerForm.errors.phoneRequired'))
            .matches(/^\d{8}$/, t('addEmployeeForm.errors.phoneMinLength')),
        email: Yup.string(),
        password: Yup.string().when({
            is: (newPassword: string) => newPassword && newPassword.length > 0,
            then: (value) =>
                value.required(t('auth.registerForm.errors.password')).min(6, t('auth.registerForm.errors.passwordMinLength'))
        
        }),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('auth.registerForm.errors.passwordNotmatch'))
    })
    const defaultValues = {
        name: name,
        phone: phone,
        email: email,
        password: '',
        confirmPassword: ''
    }

    const methods = useForm({
        resolver: yupResolver(editCustomerSchema),
        mode: 'all',
        defaultValues
    })

    const onSubmit = async () => {
        const formData = methods.getValues()

        try {
            const data = await editCustomer({
                id: id,
                ...formData
            })
            Toast({
                message: t(`customerListPage.editModal.success`),
                type: 'success'
            })
        } catch (_err) {
            Toast({
                message: t(`auth.messages.error`),
                type: 'error'
            })
        } finally {
            onClose()
        }
    }
    return (
        <CustomModal open={open} handleClose={onClose} title={t('customerListPage.editModal.title')} data-testid="editCustomer">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container item flexDirection="row" pt={5} spacing={2} justifyContent="center">
                        <Grid item md={6} xs={12}>
                            <Typography>{t('common.name')}</Typography>
                            <StyledTextField name="name" border="simpleTextField" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography>{t('customerListPage.phone')}</Typography>
                            <StyledTextField type="number" name="phone" border="simpleTextField" />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Typography>{t('customerListPage.password')}</Typography>
                            <StyledTextField
                                border="simpleTextField"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                sx={{
                                                    ':hover': { background: 'transparent' },
                                                    '&.MuiIconButton-root': {
                                                        marginRight: 0
                                                    }
                                                }}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography>{t('customerListPage.confirmPassword')}</Typography>
                            <StyledTextField
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                sx={{
                                                    ':hover': { background: 'transparent' },
                                                    '&.MuiIconButton-root': {
                                                        marginRight: 0
                                                    }
                                                }}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                border="simpleTextField"
                            />
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
export default EditCustomer
