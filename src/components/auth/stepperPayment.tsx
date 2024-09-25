import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormProvider from '../reusable/hook-form/form-provider'
import * as Yup from 'yup'
import { useTranslations } from '../../translation'
import RegisterForm from './register/register-form'
import PaymentForm from './Payment/payment-form'
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material'
import CustomButton from '../reusable/hook-form/custom-button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRegister } from '../../hooks/auth.hook'
import Toast from '../reusable/custom-toast'
import { paths } from '../../routes/paths'
import { useNavigate } from 'react-router-dom'
import { useGenerateQrCode } from '../../hooks/payment/payment.hook'
import QrCodeCard from './Payment/qrCodeCard'
import { TYPE_PAYMENT, amountPayment } from '../../utils/constants'
import DottedCircularProgress from '../reusable/dottedCircle/dottedCircle'

const StepperPayment = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [qrCode, setQrCode] = useState('')
    const [codePay, setCodePay] = useState('')
    const [username, setUsername] = useState('')
    const theme = useTheme()
    const { mutateAsync: register, isPending } = useRegister()
    const { mutateAsync: generateQrCode, isPending: qrCodePending } = useGenerateQrCode()
    const [timeLeft, setTimeLeft] = useState(0)
    const { t } = useTranslations()
    const navigate = useNavigate()
    const registerSchema = Yup.object().shape({
        email: Yup.string().required(t('auth.registerForm.errors.email')).email(t('auth.registerForm.errors.validEmail')),
        password: Yup.string()
            .required(t('auth.registerForm.errors.password'))
            .min(6, t('auth.registerForm.errors.passwordMinLength')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('auth.loginForm.errors.passwordMatch'))
            .required(t('auth.loginForm.errors.confirmPassword')),
        companyName: Yup.string().required(t('auth.registerForm.errors.companyName')),
        phone: Yup.string()
            .required(t('auth.registerForm.errors.phoneRequired'))
            .min(8, t('auth.registerForm.errors.phoneMinLength'))
            .max(8, t('auth.registerForm.errors.phoneMaxLength')),
        typePayment: Yup.string()
            .oneOf(Object.values(TYPE_PAYMENT))
            .when('$activeStep', {
                is: 1,
                then: (schema) => schema.required('auth.registerForm.errors.typePaymentRequired')
            }),
        nbrEmploye: Yup.number().when('$activeStep', {
            is: 1,
            then: (value) => value.required()
        })
    })

    const defaultValues = {
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        phone: '',
        nbrEmploye: 2,
        typePayment: TYPE_PAYMENT.FREE,
        subscriptionId: 2
    }

    const methods = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues,
        mode: 'all'
    })

    const totalTime = 15 * 60

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    const progressValue = ((totalTime - timeLeft) / totalTime) * 100

    const handleNext = async () => {
        const isValid = await methods.trigger()
        if (isValid) {
            setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
    }

    const onSubmit = async () => {
        await register(
            {
                email: methods.getValues().email,
                password: methods.getValues().password,
                phone: methods.getValues().phone,
                companyName: methods.getValues().companyName,
                nbrEmploye: methods.getValues().nbrEmploye,
                typePayment: methods.getValues().typePayment as TYPE_PAYMENT,
                subscriptionId: methods.getValues().typePayment === TYPE_PAYMENT.STANDARD ? 1 : 2
            },
            {
                async onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        if (methods.getValues().typePayment === TYPE_PAYMENT.STANDARD) {
                            setUsername(data.data.data.phone)
                            await generateQrCode(
                                {
                                    amount: amountPayment,
                                    username: data.data.data.phone
                                },
                                {
                                    onSuccess(data, _variables, _context) {
                                        if (data.status === 200) {
                                            setQrCode(data.data.data.qrCodeImage)
                                            setCodePay(data.data.data.codePay)
                                            setTimeLeft(totalTime)
                                        }
                                    }
                                }
                            ).catch((data) => {
                                Toast({
                                    message: t(`auth.messages.${data.message}`),
                                    type: 'error'
                                })
                            })
                        } else {
                            Toast({
                                message: t(`auth.messages.${data.data.message}`),
                                type: 'success'
                            })
                            navigate(paths.auth.login)
                        }
                        methods.reset()
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

    const generateNewQrCode = async () => {
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
                        setTimeLeft(totalTime)
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
        <Box sx={{ width: '90%' }}>
            {activeStep > 0 && !codePay && (
                <Stack direction="row" color={theme.palette.primary.main} onClick={handleBack} p={2}>
                    <ArrowBackIosIcon />
                    <Typography sx={{ cursor: 'pointer' }}>{t('payment.Back')}</Typography>
                </Stack>
            )}
            <Box>
                <FormProvider methods={methods}>
                    {activeStep === 0 && <RegisterForm />}
                    {activeStep === 1 && !qrCode && (
                        <PaymentForm onSubmit={methods.handleSubmit(onSubmit)} methods={methods} isPending={isPending} />
                    )}
                    {qrCode && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h1" fontWeight={800} p={2}>
                                    {t('qrCodeCard.title')}
                                </Typography>
                                {timeLeft > 0 ? (
                                    <DottedCircularProgress value={progressValue} size={100} minutes={minutes} seconds={seconds} />
                                ) : (
                                    <Grid container width={'auto'}>
                                        <Grid container justifyContent={'center'}>
                                            <Typography sx={{ fontWeight: 600 }}>{t('qrCodeCard.qrCodeExpired')}</Typography>
                                        </Grid>
                                        <Grid container justifyContent={'center'} sx={{ marginBottom: '0.5rem' }}>
                                            <CustomButton
                                                variant="contained"
                                                data-testid="generateButton"
                                                backGroundColor={theme.palette.common.white}
                                                textColor={theme.palette.primary.main}
                                                hoover={false}
                                                border={theme.palette.primary.main}
                                                sx={{ padding: '5px', width: '50%' }}
                                                onClick={generateNewQrCode}
                                            >
                                                {t('common.regenerate')}
                                            </CustomButton>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                            <QrCodeCard image={qrCode} codePay={codePay} isPending={qrCodePending} />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        {activeStep === 0 && !qrCode && (
                            <CustomButton
                                variant="contained"
                                data-testid="registerButton"
                                backGroundColor={theme.palette.primary.main}
                                textColor={theme.palette.common.white}
                                hoover={false}
                                border={'none'}
                                sx={{ padding: '1px', width: '30%' }}
                                onClick={handleNext}
                            >
                                {t('auth.registerForm.next')}
                            </CustomButton>
                        )}
                    </Box>
                </FormProvider>
            </Box>
        </Box>
    )
}

export default StepperPayment
