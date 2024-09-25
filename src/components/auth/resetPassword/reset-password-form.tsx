import { Box, IconButton, Stack, Typography } from '@mui/material'
import { primaryFont, secondaryFont } from '../../../theme/typography'
import { useTranslations } from '../../../translation'
import { useTheme } from '@mui/material'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import { useResetPassword } from '../../../hooks/auth.hook'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../reusable/custom-toast'
import { paths } from '../../../routes/paths'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CustomButton from '../../reusable/hook-form/custom-button'
import { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock'
import { Icon } from '@iconify/react'
import { PasswordState } from '../../../interfaces/auth'
import { extractTokenFromURL } from '../../../utils/extract-token-from-url'

const ResetPasswordForm = () => {
    const { t } = useTranslations()
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const { mutateAsync: resetPassword, isPending } = useResetPassword()

    const token = extractTokenFromURL(location.pathname)

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    })

    const goBack = () => {
        navigate(paths.auth.login)
    }

    const resetPasswordSchema = Yup.object().shape({
        password: Yup.string().required(t('auth.resetForm.errors.password')).min(6, t('auth.resetForm.errors.passwordMinLength')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('auth.resetForm.errors.passwordMatch'))
            .required(t('auth.resetForm.errors.confirmPassword'))
    })

    const defaultValues = {
        password: '',
        confirmPassword: ''
    }

    const methods = useForm({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues,
        mode: 'all'
    })

    const onSubmit = async () => {
        await resetPassword(
            {
                password: methods.getValues().password,
                resetToken: token
            },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        Toast({
                            message: t(`auth.messages.${data.data.message}`),
                            type: 'success'
                        })
                        navigate(paths.auth.login)
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

    const handleChangeShowPassword = (field: keyof PasswordState) => {
        setShowPassword((prevState: PasswordState) => ({
            ...prevState,
            [field]: !prevState[field]
        }))
    }

    return (
        <Box sx={{ width: '50%' }}>
            <Box sx={{ display: 'flex', paddingBottom: '4rem' }}>
                <ArrowBackIosIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
                <Typography
                    variant="caption"
                    onClick={goBack}
                    sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    {t('auth.loginForm.back')}
                </Typography>
            </Box>
            <Box>
                <Stack sx={{ py: 2 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: secondaryFont,
                            color: theme.palette.secondary.dark
                        }}
                    >
                        {t('auth.resetForm.title')}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: primaryFont,
                            color: theme.palette.secondary.dark
                        }}
                    >
                        {t('auth.resetForm.subTitle')}
                    </Typography>
                </Stack>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 3 }}>
                            <CustomTextField
                                name="password"
                                type={showPassword.password ? 'text' : 'password'}
                                autoComplete="password"
                                isRounded={true}
                                border="formTextField"
                                placeholder={`${t('auth.resetForm.password')}`}
                                startIcon={<LockIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                                sx={{ paddingBottom: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton data-testid="showButton" onClick={() => handleChangeShowPassword('password')}>
                                            <Icon icon={showPassword.password ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    )
                                }}
                            />

                            <CustomTextField
                                name="confirmPassword"
                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                autoComplete="password"
                                isRounded={true}
                                border="formTextField"
                                placeholder={`${t('auth.resetForm.confirmPassword')}`}
                                startIcon={<LockIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                                sx={{ paddingBottom: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            data-testid="showButton"
                                            onClick={() => handleChangeShowPassword('confirmPassword')}
                                        >
                                            <Icon icon={showPassword.confirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    )
                                }}
                            />
                            <CustomButton
                                variant="contained"
                                data-testid="resetButton"
                                backGroundColor={theme.palette.primary.main}
                                textColor={theme.palette.common.white}
                                hoover={false}
                                border={'none'}
                                loading={isPending}
                                type="submit"
                                sx={{ padding: '1rem' }}
                            >
                                {t('auth.resetForm.reset')}
                            </CustomButton>
                        </Box>
                    </form>
                </FormProvider>
            </Box>
        </Box>
    )
}

export default ResetPasswordForm
