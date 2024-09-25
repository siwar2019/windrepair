import { Stack, Box, Typography, Card, Grid, SelectChangeEvent } from '@mui/material'
import { secondaryFont } from '../../theme/typography'
import { useTranslation } from 'react-i18next'
import FormProvider from '../reusable/hook-form/form-provider'
import { FormControl, MenuItem, Select, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useMemo, useState, useEffect } from 'react'
import { useGetSettingList, useTestSettings } from '../../hooks/settings.hook'
import { IAddSetting } from '../../interfaces/settings'
import { StyledInputLabel } from '../../styles/settings.style'
import { StyledTextField } from '../../styles/employee.style'
import CustomButton from '../reusable/hook-form/custom-button'
import { useNavigate } from 'react-router-dom'
import { ImgPaths } from '../../utils/image-paths'
import Image from '../reusable/reusableImage'

const TestSettings = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [recentSetting, setRecentSetting] = useState<IAddSetting | null>(null)

    const theme = useTheme()

    const handleChange = (event: SelectChangeEvent<string>) => {
        setName(event.target.value)
    }

    const { data } = useGetSettingList()
    const { mutateAsync: testSettings } = useTestSettings()

    const settingsList = useMemo(() => {
        return data?.data ?? []
    }, [data])

    useEffect(() => {
        const selectedSetting = settingsList.find((setting: IAddSetting) => setting.name === name)
        setSelectedId(selectedSetting ? selectedSetting.id : null)
        setRecentSetting(selectedSetting || null)
    }, [name, settingsList])

    const methods = useForm({
        mode: 'all'
    })
    const { handleSubmit, control, setValue } = methods

    useEffect(() => {
        if (recentSetting) {
            setValue('endPointTest', recentSetting?.endPointTest)
            setValue('typeEndPoint', recentSetting?.typeEndPoint)

            recentSetting.paramsSettings?.forEach((param, index) => {
                setValue(`paramsSettings[${index}].name`, param.name || '')
                setValue(`paramsSettings[${index}].value`, param.value || '')
                setValue(`paramsSettings[${index}].id`, param.id || '')
            })
        }
    }, [recentSetting, setValue])

    const onSubmit = handleSubmit(async (values: any) => {
        const payload = {
            id: selectedId,
            paramsSettings: values.paramsSettings
        }
        await testSettings(payload)
    })
    const goBack = () => {
        navigate('/erp-settings')
    }
    return (
        <Stack width="90%" m="auto">
            <Stack direction="row" justifyContent="space-between" pb={5}>
                <Typography variant="h3" mb={3} sx={{ fontFamily: secondaryFont }}>
                    {t('settingsPage.tester')}
                </Typography>
                <Image sx={{ cursor: 'pointer' }} onClick={goBack} src={ImgPaths.icon_back} />
            </Stack>
            <Card sx={{ p: 2, height: '100%' }}>
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={6} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.name')}
                            </StyledInputLabel>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={name}
                                    onChange={handleChange}
                                    sx={{
                                        '& .MuiOutlinedInput-input': {
                                            padding: '0.5rem 1rem !important'
                                        }
                                    }}
                                >
                                    {settingsList.map((setting: IAddSetting) => (
                                        <MenuItem key={setting.id} value={setting.name}>
                                            {setting.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}></Grid>
                        <Grid xs={6} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.testEndPoint')}
                            </StyledInputLabel>
                            <StyledTextField name="endPointTest" border="simpleTextField" />
                        </Grid>
                        <Grid xs={6} item>
                            <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                {t('settingsPage.form.typeParam')}
                            </StyledInputLabel>
                            <StyledTextField name="typeEndPoint" border="simpleTextField" />
                        </Grid>
                    </Grid>
                    <Typography
                        sx={{
                            fontFamily: secondaryFont,
                            color: theme.palette.primary.main,
                            fontWeight: 400
                        }}
                    >
                        {t('settingsPage.params')}
                    </Typography>
                    {recentSetting?.paramsSettings?.map((param, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid xs={6} item>
                                <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                    {t('settingsPage.form.nameParam')}
                                </StyledInputLabel>
                                <StyledTextField name={`paramsSettings[${index}].name`} border="simpleTextField" />
                            </Grid>
                            <Grid xs={6} item>
                                <StyledInputLabel htmlFor="component-simple" sx={{ paddingBottom: '0.2rem' }}>
                                    {t('settingsPage.form.value')}
                                </StyledInputLabel>
                                <StyledTextField name={`paramsSettings[${index}].value`} border="simpleTextField" />
                            </Grid>
                        </Grid>
                    ))}
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
                                {t('settingsPage.tester')}
                            </CustomButton>
                        </Box>
                    </Grid>
                </FormProvider>
            </Card>
        </Stack>
    )
}
export default TestSettings
