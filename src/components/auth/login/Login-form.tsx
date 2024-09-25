import { Box, Stack, Typography } from '@mui/material'
import { primaryFont, secondaryFont } from '../../../theme/typography'
import { useTranslations } from '../../../translation'
import { useTheme } from '@mui/material'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomButton from '../../reusable/hook-form/custom-button'
import LockIcon from '@mui/icons-material/Lock'
import { StyledLink } from '../../../styles/auth.style'
import { paths } from '../../../routes/paths'
import { useLogin } from '../../../hooks/auth.hook'
import Toast from '../../reusable/custom-toast'
import { setSession } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { TLogin } from '../../../interfaces/auth'
import { useResponsive } from '../../../utils/use-responsive'
import { PATH_AFTER_LOGIN } from '../../../config/config-global'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { dispatch } from '../../../redux/store'
import { init } from '../../../redux/slices/auth'
import { useState } from 'react'
import CustomModal from '../../reusable/customModal/custom-modal'
import UpgradePayment from '../Payment/upgradePayment'
import UpgradePaymentForm from '../Payment/upgrade-form'
import { subscription } from '../../../utils/constants'

const LoginForm = () => {
    const { t } = useTranslations()
    const theme = useTheme()
    const navigate = useNavigate()
    const mdUp = useResponsive('up', 'md')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [displayContent, setDisplayContent] = useState(0)
    const { mutateAsync: login, isPending } = useLogin()

    const goBack = () => {
        navigate(paths.app.root)
    }

    const loginSchema = Yup.object().shape({
        userName: Yup.string()
            .required(t('auth.loginForm.errors.userName'))
            .test('is-phone-or-email', t('auth.loginForm.errors.invalidPhoneOrEmail'), (value) => {
                const phoneRegex = /^\d{8,}$/
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return phoneRegex.test(value) || emailRegex.test(value)
            }),

        password: Yup.string()
            .required(t('auth.loginForm.errors.password'))

            .min(6, t('auth.loginForm.errors.passwordMinLength'))
    })
    const defaultValues = {
        userName: '',
        password: ''
    }

    const methods = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues,
        mode: 'all'
    })

    const onSubmit = async (values: TLogin) => {
        await login(
            {
                userName: values.userName,
                password: values.password
            },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        setSession(data.data.token)
                        dispatch(init(data.data.data))
                        navigate(PATH_AFTER_LOGIN)
                    }
                }
            }
        ).catch((data) => {
            if (data.message === subscription.EXPIRED || data.message === subscription.NOT_PAID) {
                setIsModalOpen(true)
                setMessage(data.message)
                setUsername(values.userName)
            }
            Toast({
                message: t(`auth.messages.${data.message}`),
                type: 'error'
            })
        })
    }

    const handleUpgrade = () => {
        setIsModalOpen(false)
        setDisplayContent(1)
    }

    const renderContent = () => {
        switch (displayContent) {
            case 0:
                return (
                    <>
                        <Stack sx={{ py: 5 }}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontFamily: secondaryFont,
                                    color: theme.palette.secondary.dark
                                }}
                            >
                                {t('auth.loginForm.title')}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: primaryFont,
                                    color: theme.palette.secondary.dark
                                }}
                            >
                                {t('auth.loginForm.subTitle')}
                            </Typography>
                        </Stack>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <CustomTextField
                                    name="userName"
                                    border="formTextField"
                                    placeholder={`${t('auth.loginForm.userName')}`}
                                    startIcon={<PersonOutlineIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                                    sx={{ paddingBottom: 2 }}
                                />
                                <CustomTextField
                                    name="password"
                                    type="password"
                                    border="formTextField"
                                    placeholder={`${t('auth.loginForm.password')}`}
                                    startIcon={<LockIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                                    sx={{ paddingBottom: 2 }}
                                />
                                <CustomButton
                                    variant="contained"
                                    data-testid="loginButton"
                                    backGroundColor={theme.palette.primary.main}
                                    textColor={theme.palette.common.white}
                                    hoover={false}
                                    border={'none'}
                                    loading={isPending}
                                    type="submit"
                                    sx={{ padding: '1rem' }}
                                >
                                    {t('auth.loginForm.login')}
                                </CustomButton>
                            </form>
                        </FormProvider>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StyledLink
                                to={paths.auth.register}
                                data-testid="forwardRegister"
                                sx={{ display: 'flex', justifyContent: mdUp ? 'left' : 'center' }}
                            >
                                {t('auth.loginForm.signUp')}
                            </StyledLink>
                            <StyledLink
                                to={paths.auth.forgotPassword}
                                data-testid="forwardRegister"
                                sx={{ display: 'flex', justifyContent: mdUp ? 'right' : 'center' }}
                            >
                                {t('auth.loginForm.forgotPassword')}
                            </StyledLink>
                        </Box>
                        <CustomModal open={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                            <UpgradePayment onClose={() => setIsModalOpen(false)} handleUpgrade={handleUpgrade} message={message} />
                        </CustomModal>
                    </>
                )
            case 1:
                return (
                    <Box sx={{ p: 2 }}>
                        <UpgradePaymentForm username={username} setDisplayContent={setDisplayContent} />
                    </Box>
                )
            default:
                return null
        }
    }

    return (
        <>
            <Box sx={{ pr: '25%', pl: '25%', pt: { xs: '10rem', md: '0rem' } }}>
                <Box display="grid">
                    <Box sx={{ display: 'flex', paddingTop: '1rem' }}>
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
                    {renderContent()}
                </Box>
            </Box>
        </>
    )
}
export default LoginForm
