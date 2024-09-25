import { Box, Stack, Typography } from '@mui/material'
import { primaryFont, secondaryFont } from '../../../theme/typography'
import { useTranslations } from '../../../translation'
import { useTheme } from '@mui/material'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useForgotPassword } from '../../../hooks/auth.hook'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../reusable/custom-toast'
import { paths } from '../../../routes/paths'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CustomButton from '../../reusable/hook-form/custom-button'
import { useState } from 'react'
import { ImgPaths } from '../../../utils/image-paths'
import Image from '../../reusable/reusableImage'

const ForgotPasswordForm = () => {
    const { t } = useTranslations()
    const theme = useTheme()
    const [emailSent, setEmailSent] = useState(false)
    const { mutateAsync: forgotPassword, isPending } = useForgotPassword()
    const navigate = useNavigate()

    const goBack = () => {
        navigate(paths.auth.login)
    }

    const forgotPasswordSchema = Yup.object().shape({
        email: Yup.string().required(t('auth.forgotForm.errors.email')).email(t('auth.forgotForm.errors.validEmail'))
    })

    const defaultValues = {
        email: ''
    }

    const methods = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues,
        mode: 'all'
    })

    const onSubmit = async () => {
        await forgotPassword(
            {
                email: methods.getValues().email
            },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        setEmailSent(true)
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
                {!emailSent ? (
                    <>
                        <Stack sx={{ py: 2 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: secondaryFont,
                                    color: theme.palette.secondary.dark
                                }}
                            >
                                {t('auth.forgotForm.title')}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: primaryFont,
                                    color: theme.palette.secondary.dark
                                }}
                            >
                                {t('auth.forgotForm.subTitle')}
                            </Typography>
                        </Stack>

                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingTop: 3 }}>
                                    <CustomTextField
                                        name="email"
                                        border="formTextField"
                                        placeholder={`${t('auth.forgotForm.email')}`}
                                        startIcon={<MailOutlineIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                                        sx={{ paddingBottom: 2 }}
                                    />
                                    <CustomButton
                                        variant="contained"
                                        data-testid="forgotButton"
                                        backGroundColor={theme.palette.primary.main}
                                        textColor={theme.palette.common.white}
                                        hoover={false}
                                        border={'none'}
                                        loading={isPending}
                                        type="submit"
                                        sx={{ padding: '1rem' }}
                                    >
                                        {t('auth.forgotForm.send')}
                                    </CustomButton>
                                </Box>
                            </form>
                        </FormProvider>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Box pb={5}>
                            <Image src={ImgPaths.emailSentIcon} alt="emailSent" />
                        </Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: secondaryFont,
                                color: theme.palette.secondary.dark
                            }}
                        >
                            {t('auth.forgotForm.checkEmail')}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: primaryFont,
                                    color: theme.palette.secondary.dark
                                }}
                            >
                                {t('auth.forgotForm.sendTo')}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: primaryFont,
                                    color: theme.palette.primary.main
                                }}
                            >
                                &nbsp;{methods.getValues().email}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ForgotPasswordForm
