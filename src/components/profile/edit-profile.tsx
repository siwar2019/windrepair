import {
    Avatar,
    Card,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    useTheme
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { StyledButtonCancel, StyledButtonSave } from '../../styles/custom-buttons.style'
import { useMemo, useState } from 'react'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import { useSelector } from '../../redux/store'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Toast from '../reusable/custom-toast'
import { useEditErpSetting, useEditPassword, useEditProfile, useGetUser } from '../../hooks/profile/profile.hook'
import { StyledTextField } from '../../styles/profile.style'
import { TChangePasswordForm, TEditErpSettingForm, TEditProfileForm } from '../../interfaces/profile'
import { setUserData } from '../../redux/slices/auth'
import { useDispatch } from 'react-redux'
import { ROLES } from '../../utils/constants'
import { COMMON } from '../../theme/palette'
import { useGetAllCategoriesWithProductCount } from '../../hooks/settings.hook'
import { catgeoryProduct } from '../../interfaces/settings'

const EditProfile = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const theme = useTheme()
    const { user } = useSelector((state) => state.auth)
    const erpToken = localStorage.getItem('erpToken')
    const { mutateAsync: editProfile, isPending } = useEditProfile()
    const { data: userData } = useGetUser()
    const { data: categories } = useGetAllCategoriesWithProductCount(erpToken)

    const dataUser = useMemo(() => {
        return userData
    }, [userData])

    const [nameCategory, setNameCategory] = useState(dataUser.nameCategory)
    const [image, setImage] = useState(user?.image)
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, SetShowConfirmPassword] = useState(false)
    const [showNewPassword, SetShowNewPassword] = useState(false)

    const { mutateAsync: editPassword } = useEditPassword()

    const userDataa: TEditProfileForm = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        companyName: user?.role === 'partner' ? user.companyName || '' : '',
        image: userData?.image || ''
    }

    const isEmailRequired = user?.role !== ROLES.CLIENT
    const isNameRequired = user?.role === ROLES.EMPLOYEE || user?.role === ROLES.CLIENT

    const schema = Yup.object().shape({
        name: isNameRequired ? Yup.string().required(t('common.name')) : Yup.string(),
        email: isEmailRequired
            ? Yup.string().email(t('auth.registerForm.errors.validEmail')).required(t('auth.registerForm.errors.email'))
            : Yup.string().email(t('auth.registerForm.errors.validEmail')),
        phone: Yup.string()
            .required(t('auth.registerForm.errors.phoneRequired'))
            .matches(/^\d{8}$/, t('auth.registerForm.errors.phoneMinLength')),
        companyName: user?.role === 'partner' ? Yup.string().required(t('auth.registerForm.errors.companyName')) : Yup.string()
    })

    const methods = useForm<TEditProfileForm>({
        defaultValues: userDataa,
        resolver: yupResolver(schema),
        mode: 'all'
    })

    const userDataPassword: TChangePasswordForm = {
        oldPassword: '',
        newPassword: ''
    }
    const schemaPassword = Yup.object().shape({
        oldPassword: Yup.string()
            .required(t('auth.registerForm.errors.password'))
            .min(6, t('auth.registerForm.errors.passwordMinLength')),
        newPassword: Yup.string()
            .required(t('auth.registerForm.errors.newPasswordRequired'))
            .min(6, t('auth.registerForm.errors.passwordMinLength')),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], t('auth.registerForm.errors.passwordNotmatch'))
    })

    const methodsPassword = useForm<TChangePasswordForm>({
        defaultValues: userDataPassword,
        resolver: yupResolver(schemaPassword),
        mode: 'all'
    })

    const onSubmit = async (formData: TEditProfileForm) => {
        const data = new FormData()
        data.append('name', formData.name || '')
        data.append('email', formData.email || '')
        data.append('phone', formData.phone)
        if (user?.role === 'partner') {
            data.append('companyName', formData.companyName || '')
        }
        if (imageFile) {
            data.append('image', imageFile)
        }

        try {
            const userData = await editProfile(data)
            if (userData) {
                Toast({
                    message: t('profilePage.message.successProfile'),
                    type: 'success'
                })
                dispatch(setUserData({ ...userData.data.data, role: user?.role }))
            }
        } catch (err: any) {
            Toast({
                message: t(`profilePage.message.${err.message}`),
                type: 'error'
            })
        }
    }

    const onSubmitPassword = async () => {
        const formDataPassword = methodsPassword.getValues()

        try {
            const data = await editPassword({
                ...formDataPassword
            })

            Toast({
                message: t(`profilePage.message.successPassword`),
                type: 'success'
            })
            methodsPassword.reset()
        } catch (_err) {
            Toast({
                message: t('profilePage.message.wrongPassword'),
                type: 'error'
            })
        } finally {
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onload = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setImage('')
            setImageFile(null)
        }
    }

    const handleClickChange = () => {
        setImage(user?.image || '')
        setImageFile(null)
    }

    const handleClickShowConfirmPassword = () => SetShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)

    const handleClickShowNewPassword = () => SetShowNewPassword((showNewPassword) => !showNewPassword)

    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword)

    const handleClosePassword = () => {
        methodsPassword.reset()
    }

    const handleCloseForm = () => {
        methods.reset()
        setImage(user?.image || '')
        setImageFile(null)
    }

    const userDataErp: TEditErpSettingForm = {
        emailErpClient: dataUser?.emailErpClient || '',
        nameCategory: dataUser?.nameCategory || ''
    }

    const schemaEditErpSetting = Yup.object().shape({
        emailErpClient: Yup.string().email(t('auth.registerForm.errors.validEmail')),
        nameCategory: Yup.string()
    })

    const methodsErpSetting = useForm<TEditErpSettingForm>({
        defaultValues: userDataErp,
        resolver: yupResolver(schemaEditErpSetting),
        mode: 'all'
    })

    const { mutateAsync: editErpSetting } = useEditErpSetting()

    const onSubmitErpSetting = async () => {
        const formDataSetting = methodsErpSetting.getValues()

        try {
            await editErpSetting(
                {
                    ...formDataSetting,
                    nameCategory
                },
                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t(`profilePage.message.emailErpAddesSuccessfully`),
                                type: 'success'
                            })
                        }
                    }
                }
            )
        } catch (_err) {
            Toast({
                message: t('profilePage.message.emailErpNotExist'),
                type: 'error'
            })
        } finally {
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setNameCategory(event.target.value as string)
    }

    return (
        <Stack>
            <Typography variant="h2" sx={{ textTransform: 'uppercase', fontWeight: 'bold', pl: '8%', pb: '2%' }}>
                {t('profilePage.title')}
            </Typography>
            <Stack alignItems="center">
                <Card sx={{ p: 2, width: '85%', height: '100%', background: '#FFFCFB' }}>
                    <Typography variant="h3" color={theme.palette.primary.main}>
                        {t('profilePage.personalInfo')}
                    </Typography>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Grid container item flexDirection="row" pt={5} spacing={8} justifyContent="center">
                                {(user?.role === 'client' || user?.role === 'employee') && (
                                    <>
                                        <Grid item md={6} xs={12}>
                                            <Typography>{t('common.name')}</Typography>
                                            <StyledTextField
                                                sx={{ background: theme.palette.common.white }}
                                                name="name"
                                                border="simpleTextField"
                                            />
                                        </Grid>
                                    </>
                                )}

                                <Grid item md={6} xs={12}>
                                    <Typography>{t('customerListPage.email')}</Typography>
                                    <StyledTextField
                                        sx={{ background: theme.palette.common.white }}
                                        name="email"
                                        border="simpleTextField"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography>{t('customerListPage.phone')}</Typography>
                                    <StyledTextField
                                        sx={{ background: theme.palette.common.white }}
                                        type="number"
                                        name="phone"
                                        border="simpleTextField"
                                    />
                                </Grid>

                                {/* change information company */}
                                {user?.role === 'partner' && (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color={theme.palette.primary.main}>
                                                {t('profilePage.company')}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar
                                                    src={
                                                        image?.startsWith('data:image/png;base64')
                                                            ? image
                                                            : `${process.env.REACT_APP_HOST_API_ASSEST}${userData?.image}`
                                                    }
                                                />
                                                <input
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    id="image-upload"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                                <label htmlFor="image-upload">
                                                    <StyledButtonSave
                                                        backGroundColor={theme.palette.primary.main}
                                                        textColor={theme.palette.common.white}
                                                        variant={'text'}
                                                        hoover={true}
                                                        border={theme.palette.primary.main}
                                                        sx={{ width: '12rem' }}
                                                        component="span"
                                                    >
                                                        {t('profilePage.uploadImage')}
                                                    </StyledButtonSave>
                                                </label>
                                                <StyledButtonCancel
                                                    backGroundColor={theme.palette.common.white}
                                                    textColor={theme.palette.common.black}
                                                    variant={'text'}
                                                    hoover={true}
                                                    border={theme.palette.common.white}
                                                    sx={{ width: '5rem' }}
                                                    onClick={handleClickChange}
                                                >
                                                    {t('modal.delele')}
                                                </StyledButtonCancel>
                                            </Stack>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography> {t('updateModal.name')}</Typography>
                                            <StyledTextField
                                                sx={{ background: theme.palette.common.white }}
                                                name="companyName"
                                                border="simpleTextField"
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" pt={5}>
                                <StyledButtonCancel
                                    backGroundColor={theme.palette.common.white}
                                    textColor={theme.palette.common.black}
                                    variant={'text'}
                                    hoover={true}
                                    border={theme.palette.common.white}
                                    sx={{ width: '9rem' }}
                                    onClick={handleCloseForm}
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
                                    type="submit"
                                >
                                    {t('customerListPage.action.save')}
                                </StyledButtonSave>
                            </Stack>
                        </form>
                    </FormProvider>
                    <Divider sx={{ width: '80%', margin: 'auto', background: theme.palette.primary.main, mt: 6 }} />

                    {/* Change password */}
                    <FormProvider {...methodsPassword}>
                        <form onSubmit={methodsPassword.handleSubmit(onSubmitPassword)}>
                            <Grid container item flexDirection="row" pt={5} spacing={8} justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography variant="h3" color={theme.palette.primary.main}>
                                        {t('customerListPage.changePassword')}
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography>{t('customerListPage.oldPassword')}</Typography>
                                    <StyledTextField
                                        sx={{ background: theme.palette.common.white }}
                                        border="simpleTextField"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        sx={{
                                                            ':hover': { background: 'transparent' },
                                                            '&.MuiIconButton-root': {
                                                                marginRight: 0,
                                                                marginLeft: 0,
                                                                fontSize: '0.5rem'
                                                            }
                                                        }}
                                                        aria-label="toggle password visibility"
                                                        edge="start"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {showPassword ? (
                                                            <Image src={ImgPaths.show_password} />
                                                        ) : (
                                                            <Image src={ImgPaths.not_show} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <Stack
                                                        sx={{
                                                            cursor: 'default',
                                                            '&:hover': { backgroundColor: 'transparent' },
                                                            marginRight: 0,
                                                            marginLeft: 0,
                                                            fontSize: '0.5rem'
                                                        }}
                                                        aria-label="static icon"
                                                        direction="row"
                                                        alignItems="center"
                                                    >
                                                        <Image src={ImgPaths.key_password} />
                                                    </Stack>
                                                </InputAdornment>
                                            )
                                        }}
                                        type={showPassword ? 'text' : 'password'}
                                        name="oldPassword"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography> {t('profilePage.newPassword')}</Typography>
                                    <StyledTextField
                                        border="simpleTextField"
                                        sx={{ background: theme.palette.common.white }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        sx={{
                                                            ':hover': { background: 'transparent' },
                                                            '&.MuiIconButton-root': {
                                                                marginRight: 0,
                                                                marginLeft: 0,
                                                                fontSize: '0.5rem'
                                                            }
                                                        }}
                                                        aria-label="toggle password visibility"
                                                        edge="start"
                                                        onClick={handleClickShowNewPassword}
                                                    >
                                                        {showNewPassword ? (
                                                            <Image src={ImgPaths.show_password} />
                                                        ) : (
                                                            <Image src={ImgPaths.not_show} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <Stack
                                                        sx={{
                                                            cursor: 'default',
                                                            '&:hover': { backgroundColor: 'transparent' },
                                                            marginRight: 0,
                                                            marginLeft: 0,
                                                            fontSize: '0.5rem'
                                                        }}
                                                        aria-label="static icon"
                                                        direction="row"
                                                        alignItems="center"
                                                    >
                                                        <Image src={ImgPaths.key_password} />
                                                    </Stack>
                                                </InputAdornment>
                                            )
                                        }}
                                        type={showNewPassword ? 'text' : 'password'}
                                        name="newPassword"
                                    />
                                </Grid>
                                <Grid item mr="auto" md={6} xs={12}>
                                    <Typography>{t('customerListPage.confirmPassword')}</Typography>
                                    <StyledTextField
                                        sx={{ background: theme.palette.common.white }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        sx={{
                                                            ':hover': { background: 'transparent' },
                                                            '&.MuiIconButton-root': {
                                                                marginRight: 0,
                                                                marginLeft: 0,
                                                                fontSize: '0.5rem'
                                                            }
                                                        }}
                                                        aria-label="toggle password visibility"
                                                        edge="start"
                                                        onClick={handleClickShowConfirmPassword}
                                                    >
                                                        {showConfirmPassword ? (
                                                            <Image src={ImgPaths.show_password} />
                                                        ) : (
                                                            <Image src={ImgPaths.not_show} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <Stack
                                                        sx={{
                                                            cursor: 'default',
                                                            '&:hover': { backgroundColor: 'transparent' },
                                                            marginRight: 0,
                                                            marginLeft: 0,
                                                            fontSize: '0.5rem'
                                                        }}
                                                        aria-label="static icon"
                                                        direction="row"
                                                        alignItems="center"
                                                    >
                                                        <Image src={ImgPaths.key_password} />
                                                    </Stack>
                                                </InputAdornment>
                                            )
                                        }}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        border="simpleTextField"
                                    />
                                </Grid>
                            </Grid>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" pb={6} pt={5}>
                                <StyledButtonCancel
                                    backGroundColor={theme.palette.common.white}
                                    textColor={theme.palette.common.black}
                                    variant={'text'}
                                    hoover={true}
                                    border={theme.palette.common.white}
                                    sx={{ width: '9rem' }}
                                    onClick={handleClosePassword}
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
                                    type="submit"
                                >
                                    {t('customerListPage.action.save')}
                                </StyledButtonSave>
                            </Stack>
                        </form>
                    </FormProvider>
                    {/* Erp settings */}
                    {!!user && user.role === ROLES.PARTNER && (
                        <>
                            <Divider sx={{ width: '80%', margin: 'auto', background: theme.palette.primary.main, mt: 6 }} />
                            <FormProvider {...methodsErpSetting}>
                                <form onSubmit={methodsErpSetting.handleSubmit(onSubmitErpSetting)}>
                                    <Grid container item flexDirection="row" pt={5} spacing={4} justifyContent="center">
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color={theme.palette.primary.main}>
                                                {t('profilePage.erpSettings')}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {dataUser?.isErpClient ? (
                                                <Typography color={COMMON.common.green} sx={{ fontWeight: 'bold' }}>
                                                    {t('profilePage.erpClient')}
                                                </Typography>
                                            ) : (
                                                <Typography sx={{ fontWeight: 'bold' }}>{t('profilePage.addEmailErp')}</Typography>
                                            )}
                                        </Grid>
                                        <Grid item md={dataUser.isErpClient ? 6 : 12} xs={12}>
                                            <Typography>{t('profilePage.emailErp')}</Typography>
                                            <StyledTextField
                                                sx={{ background: theme.palette.common.white }}
                                                name="emailErpClient"
                                                border="simpleTextField"
                                            />
                                        </Grid>
                                        {dataUser.isErpClient && (
                                            <Grid xs={12} sm={6} item>
                                                <FormControl fullWidth>
                                                    <Typography>{t('profilePage.categoryName')}</Typography>
                                                    <Select
                                                        labelId="nameCategory"
                                                        id="nameCategory"
                                                        name="nameCategory"
                                                        value={nameCategory}
                                                        onChange={handleChange}
                                                        sx={{ '& .MuiOutlinedInput-input': { padding: '0.5rem' }, height: '60px' }}
                                                    >
                                                        {categories?.data?.length &&
                                                            categories.data.map((category: catgeoryProduct) => (
                                                                <MenuItem key={category.id} value={category.name}>
                                                                    {category.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        )}
                                    </Grid>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end" pb={6} pt={5}>
                                        <StyledButtonSave
                                            backGroundColor={theme.palette.primary.main}
                                            textColor={theme.palette.common.white}
                                            variant={'text'}
                                            hoover={true}
                                            border={theme.palette.primary.main}
                                            sx={{ width: '9rem' }}
                                            type="submit"
                                        >
                                            {t('customerListPage.action.save')}
                                        </StyledButtonSave>
                                    </Stack>
                                </form>
                            </FormProvider>
                        </>
                    )}
                </Card>
            </Stack>
        </Stack>
    )
}
export default EditProfile
