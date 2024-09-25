import { Button, Container, IconButton, Stack, Typography, useTheme } from '@mui/material'
import Image from '../../reusable/reusableImage'
import { ImgPaths } from '../../../utils/image-paths'
import { secondaryFont } from '../../../theme/typography'
import FormProvider from '../../reusable/hook-form/form-provider'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useTranslations } from '../../../translation'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import MailIcon from '@mui/icons-material/Mail'
import LockIcon from '@mui/icons-material/Lock'
import { Dialog, DialogContent, Divider } from '@mui/material'
import { SetStateAction, useState, Dispatch } from 'react'
import { TypePassword } from '../../../interfaces/auth'
import { Icon } from '@iconify/react'
import { useConnectToErp, useCreateErpSetting } from '../../../hooks/settings.hook'
import CloseIcon from '@mui/icons-material/Close'
import Toast from '../../reusable/custom-toast'

interface ILoginERP {
    open: boolean
    handleClose: () => void
    setToken?: Dispatch<SetStateAction<string | null>>
}

const ErpLogin = ({ open, handleClose, setToken }: ILoginERP) => {
    const { t } = useTranslations()
    const theme = useTheme()
    const { mutateAsync: connectToErp } = useConnectToErp()
    const { mutateAsync: erpSettings } = useCreateErpSetting()

    const createFindSchema = Yup.object().shape({
        username: Yup.string().required(t('erpLogin.userNameRequired')),
        password: Yup.string().required(t('erpLogin.passwordRequired')).min(6, t('auth.loginForm.errors.passwordMinLength'))
    })

    const defaultValues = {
        username: '',
        password: ''
    }
    const methods = useForm({
        resolver: yupResolver(createFindSchema),
        defaultValues,
        mode: 'all'
    })
    const { handleSubmit, reset } = methods

    const onSubmit = handleSubmit(async (values) => {
        const response = await connectToErp(
            {
                username: values.username,
                password: values.password
            },

            {
                async onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        localStorage.setItem('erpToken', data.data.data)
                        const token = localStorage.getItem('erpToken')
                        setToken && setToken(token)
                        await erpSettings({ token: token })
                        Toast({
                            message: t('erpLogin.success'),
                            type: 'success'
                        })
                        handleClose()
                    }
                }
            }
        ).catch((data) => {
            Toast({
                message: t('erpLogin.noAccount'),
                type: 'error'
            })
        })
    })

    const cancel = () => {
        reset()
        handleClose()
    }

    const [showPassword, setShowPassword] = useState({
        password: false
    })
    const handleChangeShowPassword = (field: keyof TypePassword) => {
        setShowPassword((prevState: TypePassword) => ({
            ...prevState,
            [field]: !prevState[field]
        }))
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <Stack direction="row" justifyContent="flex-end" marginTop={2}>
                <Button onClick={handleClose}>
                    <CloseIcon sx={{ color: theme.palette.common.black }} />
                </Button>
            </Stack>
            <DialogContent>
                <Container>
                    <Stack sx={{ display: 'flex', textAlign: 'center' }}>
                        <Image src={ImgPaths.windErpLogo} alt="windERP logo" my={1} />
                        <Typography variant={'h3'} my={2} sx={{ fontFamily: secondaryFont, fontWeight: 'bold' }} marginBottom={4}>
                            {t('erpLogin.connect')}
                        </Typography>
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            <Typography sx={{ fontWeight: 'bold', mb: '0.5rem' }} variant="body1" align="left">
                                {t('erpLogin.userName')}
                            </Typography>
                            <CustomTextField
                                name="username"
                                border="simpleTextField"
                                startIcon={<MailIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />}
                                placeholder={`${t('auth.loginForm.userName')}`}
                                sx={{
                                    paddingBottom: 1,
                                    '& .MuiOutlinedInput-root': {
                                        height: '45px',
                                        '& .MuiOutlinedInput-input': {
                                            padding: '4px 8px',
                                            fontSize: '0.875rem'
                                        }
                                    }
                                }}
                            />
                            <Typography sx={{ fontWeight: 'bold', mb: '0.5rem' }} variant="body1" align="left">
                                {t('erpLogin.password')}
                            </Typography>
                            <CustomTextField
                                name="password"
                                type={showPassword.password ? 'text' : 'password'}
                                border="simpleTextField"
                                placeholder={`${t('auth.loginForm.password')}`}
                                sx={{
                                    paddingBottom: 1,
                                    '& .MuiOutlinedInput-root': {
                                        height: '45px',
                                        '& .MuiOutlinedInput-input': {
                                            padding: '4px 8px',
                                            fontSize: '0.875rem'
                                        }
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton data-testid="showButton" onClick={() => handleChangeShowPassword('password')}>
                                            <Icon icon={showPassword.password ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    ),
                                    startAdornment: <LockIcon sx={{ color: theme.palette.grey['A400'], margin: '1rem' }} />
                                }}
                            />
                            <Stack
                                sx={{
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    my: 6,
                                    gap: 2
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={cancel}
                                    sx={{
                                        height: '1rem',
                                        minWidth: '120px',
                                        padding: '1rem',
                                        borderRadius: '5px',
                                        color: 'white',
                                        backgroundColor: 'black'
                                    }}
                                >
                                    {t('erpLogin.cancel')}
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        height: '1rem',
                                        minWidth: '120px',
                                        padding: '1rem',
                                        borderRadius: '5px',
                                        color: 'black',
                                        backgroundColor: '#EFCC0B',

                                        ':hover': { background: 'transparent' }
                                    }}
                                >
                                    {t('erpLogin.login')}
                                </Button>
                            </Stack>
                        </FormProvider>
                    </Stack>
                </Container>
            </DialogContent>
        </Dialog>
    )
}

export default ErpLogin
