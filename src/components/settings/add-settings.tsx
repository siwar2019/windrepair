import React, { useState } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, useTheme } from '@mui/material'
import { StyledTextField } from '../../styles/employee.style'
import CustomButton from '../reusable/hook-form/custom-button'
import { StyledInputLabel } from '../../styles/settings.style'
import * as Yup from 'yup'
import { useCreateSettings } from '../../hooks/settings.hook'
import Toast from '../reusable/custom-toast'
import CustomModal from '../reusable/customModal/custom-modal'
import { EndPointType, TypeParamsSetting } from '../../utils/constants'
import { useTranslations } from '../../translation'
import { yupResolver } from '@hookform/resolvers/yup'
import FormProvider from '../reusable/hook-form/form-provider'
import { Controller, useForm } from 'react-hook-form'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IAddSetting, IParamsSettings } from '../../interfaces/settings'

interface IAddSettingsProps {
    open: boolean
    onClose: () => void
}

const AddSettings = ({ open, onClose }: IAddSettingsProps) => {
    const { t } = useTranslations()
    const theme = useTheme()
    const { mutateAsync: createSettings } = useCreateSettings()

    const paramsSettingsSchema = Yup.object().shape({
        name: Yup.string().required(t('settingsPage.NameRequired')),
        type: Yup.string().oneOf(Object.values(TypeParamsSetting)).required(t('settingsPage.NameRequired'))
    })

    const createParamsSchema = Yup.object().shape({
        name: Yup.string().required(t('settingsPage.NameRequired')),
        endPointProd: Yup.string().required(t('settingsPage.endPointRequired')),
        endPointTest: Yup.string().required(t('settingsPage.endPointTestRequired')),
        typeEndPoint: Yup.string().oneOf(Object.values(EndPointType)).required(t('settingsPage.typeRequired')),
        paramsSettings: Yup.array().of(paramsSettingsSchema).required(t('settingsPage.paramsRequired')),
        isAuth: Yup.boolean().required()
    })

    const defaultValues: any = {
        name: '',
        endPointProd: '',
        endPointTest: '',
        typeEndPoint: 'post',
        paramsSettings: [{ name: '', type: 'integer' }],
        isAuth: true
    }

    const methods = useForm({
        resolver: yupResolver(createParamsSchema),
        defaultValues,
        mode: 'all'
    })

    const { reset, handleSubmit, control, setValue } = methods

    const [paramsSettings, setParamsSettings] = useState(defaultValues.paramsSettings)

    const handleAddFields = () => {
        setParamsSettings([...paramsSettings, { name: '', type: 'integer' }])
    }

    const onSubmit = handleSubmit(async (values: IAddSetting) => {
        await createSettings(
            {
                name: values.name,
                endPointProd: values.endPointProd,
                endPointTest: values.endPointTest,
                typeEndPoint: values.typeEndPoint,
                paramsSettings: values.paramsSettings,
                isAuth: values.isAuth
            },
            {
                onSuccess(data) {
                    if (data.status === 200) {
                        Toast({
                            message: t('settingsPage.createdSuccessfully'),
                            type: 'success'
                        })
                        reset()
                    }
                    onClose()
                },
                onError() {
                    Toast({
                        message: t('settingsPage.error'),
                        type: 'error'
                    })
                }
            }
        )
    })

    return (
        <>
            <CustomModal open={open} handleClose={onClose} title={t('settingsPage.buttonTitle')}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.name')}
                            </StyledInputLabel>
                            <StyledTextField name="name" border="simpleTextField" />
                        </Grid>
                        <Grid xs={12} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.endPoint')}
                            </StyledInputLabel>
                            <StyledTextField name="endPointProd" border="simpleTextField" />
                        </Grid>
                        <Grid xs={12} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.testEndPoint')}
                            </StyledInputLabel>
                            <StyledTextField name="endPointTest" border="simpleTextField" />
                        </Grid>
                        <Grid xs={12} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.type')}
                            </StyledInputLabel>
                            <FormControl fullWidth>
                                <Controller
                                    name="typeEndPoint"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="typeEndPoint-label"
                                            id="typeEndPoint"
                                            value={field.value}
                                            onChange={field.onChange}
                                            sx={{
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '0.5rem 1rem !important'
                                                }
                                            }}
                                        >
                                            <MenuItem value={EndPointType.GET}>{EndPointType.GET}</MenuItem>
                                            <MenuItem value={EndPointType.POST}>{EndPointType.POST}</MenuItem>
                                            <MenuItem value={EndPointType.PATCH}>{EndPointType.PATCH}</MenuItem>
                                            <MenuItem value={EndPointType.DELETE}>{EndPointType.DELETE}</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item>
                            <FormControlLabel
                                name="isAuth"
                                checked={true}
                                control={<Checkbox {...methods.register('isAuth')} color="primary" />}
                                label={t('settingsPage.form.isAuth')}
                            />
                        </Grid>

                        {paramsSettings.map((param: IParamsSettings, index: number) => (
                            <React.Fragment key={index}>
                                <Grid xs={5.5} item>
                                    <StyledInputLabel htmlFor={`paramsName-${index}`} sx={{ paddingBottom: '0.2rem' }}>
                                        {t('settingsPage.form.paramsName')}
                                    </StyledInputLabel>
                                    <StyledTextField
                                        name={`paramsSettings[${index}].name`}
                                        id={`paramsName-${index}`}
                                        border="simpleTextField"
                                    />
                                </Grid>
                                <Grid xs={5.5} item>
                                    <StyledInputLabel htmlFor={`paramsType-${index}`} sx={{ paddingBottom: '0.2rem' }}>
                                        {t('settingsPage.form.typeParams')}
                                    </StyledInputLabel>
                                    <FormControl fullWidth>
                                        <Controller
                                            name={`paramsSettings[${index}].type`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    id={`paramsType-${index}`}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    sx={{
                                                        '& .MuiOutlinedInput-input': {
                                                            padding: '0.5rem 1rem !important'
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value={TypeParamsSetting.INTEGER}>{TypeParamsSetting.INTEGER}</MenuItem>
                                                    <MenuItem value={TypeParamsSetting.STRING}>{TypeParamsSetting.STRING}</MenuItem>
                                                    <MenuItem value={TypeParamsSetting.BOOLEAN}>{TypeParamsSetting.BOOLEAN}</MenuItem>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={1} item sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    {index === 0 && (
                                        <IconButton onClick={handleAddFields}>
                                            <AddCircleIcon sx={{ color: theme.palette.primary.main }} />
                                        </IconButton>
                                    )}
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>

                    <Grid display="flex" justifyContent="center" pt={2}>
                        <Box>
                            <CustomButton
                                variant="contained"
                                data-testid="saveButton"
                                backGroundColor={theme.palette.primary.main}
                                textColor={theme.palette.common.white}
                                hoover={false}
                                border="none"
                                type="submit"
                                sx={{ width: '10rem' }}
                            >
                                {t('settingsPage.confirm')}
                            </CustomButton>
                        </Box>
                    </Grid>
                </FormProvider>
            </CustomModal>
        </>
    )
}

export default AddSettings
