import { Box, IconButton, Stack, Typography } from '@mui/material'
import { primaryFont, secondaryFont } from '../../../theme/typography'
import { useTranslations } from '../../../translation'
import { useTheme } from '@mui/material'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockIcon from '@mui/icons-material/Lock'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import PhoneIcon from '@mui/icons-material/Phone'
import { StyledLink } from '../../../styles/auth.style'
import { paths } from '../../../routes/paths'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../../utils/use-responsive'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { PasswordState } from '../../../interfaces/auth'

const RegisterForm = () => {
    const { t } = useTranslations()
    const theme = useTheme()
    const navigate = useNavigate()
    const mdUp = useResponsive('up', 'md')
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    })
    const goBack = () => {
        navigate(paths.app.root)
    }

    const handleChangeShowPassword = (field: keyof PasswordState) => {
        setShowPassword((prevState: PasswordState) => ({
            ...prevState,
            [field]: !prevState[field]
        }))
    }
    return (
        <>
            <Box sx={{ pr: '25%', pl: '25%', pt: { xs: '10rem', md: '0rem' } }}>
                <Box display="grid">
                    <Stack sx={{ py: 5 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: secondaryFont,
                                color: theme.palette.secondary.dark
                            }}
                        >
                            {t('auth.registerForm.title')}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: primaryFont,
                                color: theme.palette.secondary.dark
                            }}
                        >
                            {t('auth.registerForm.subTitle')}
                        </Typography>
                    </Stack>

                    <>
                        <CustomTextField
                            name="companyName"
                            border="formTextField"
                            placeholder={`${t('auth.registerForm.name')}`}
                            startIcon={<HomeRepairServiceIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                            sx={{ paddingBottom: 2 }}
                        />
                        <CustomTextField
                            name="phone"
                            type="number"
                            inputProps={{ maxLength: 8 }}
                            border="formTextField"
                            placeholder={`${t('auth.registerForm.phone')}`}
                            startIcon={<PhoneIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                            sx={{ paddingBottom: 2 }}
                        />
                        <CustomTextField
                            name="email"
                            border="formTextField"
                            placeholder={`${t('auth.registerForm.email')}`}
                            startIcon={<MailOutlineIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                            sx={{ paddingBottom: 2 }}
                        />
                        <CustomTextField
                            name="password"
                            type={showPassword.password ? 'text' : 'password'}
                            autoComplete="password"
                            isRounded={true}
                            border="formTextField"
                            placeholder={`${t('auth.loginForm.password')}`}
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
                            placeholder={`${t('auth.loginForm.confirmPassword')}`}
                            startIcon={<LockIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                            sx={{ paddingBottom: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton data-testid="showButton" onClick={() => handleChangeShowPassword('confirmPassword')}>
                                        <Icon icon={showPassword.confirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                )
                            }}
                        />

                        <StyledLink
                            to={paths.auth.login}
                            data-testid="forwardToLogin"
                            sx={{ display: 'flex', justifyContent: mdUp ? 'left' : 'center' }}
                        >
                            {t('auth.registerForm.haveAccount')}
                        </StyledLink>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '50px'
                            }}
                        ></Box>
                    </>
                </Box>
            </Box>
        </>
    )
}

export default RegisterForm
