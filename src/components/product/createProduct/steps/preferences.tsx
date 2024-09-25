import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { useTranslations } from '../../../../translation'
import CustomSelect from '../../../reusable/hook-form/custom-select'
import FormProvider from '../../../reusable/hook-form/form-provider'
import { useForm } from 'react-hook-form'
import Image from '../../../reusable/reusableImage'
import { ImgPaths } from '../../../../utils/image-paths'
import { useState } from 'react'
import { Password, Type } from '../../../../utils/constants'
import { paths } from '../../../../routes/paths'
import Toast from '../../../reusable/custom-toast'
import { generateQRCodeUrl } from '../../../../utils/generate-qr-code-url'
import { handlePrinter } from '../../../../utils/print'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useSelector } from '../../../../redux/store'

interface preferencesProps {
    password: string
    code: string
}

const Preferences = ({ password, code }: preferencesProps) => {
    const { t } = useTranslations()
    const methods = useForm()
    const { user } = useSelector((state) => state.auth)
    const qrCodeUrl = generateQRCodeUrl(`${process.env.REACT_APP_HOST}${paths.ticket.ticket}/?code=${code}`)

    const optionsType = [
        {
            label: t('ticketPage.fields.qrCode'),
            value: Type.QR_CODE
        },
        {
            label: t('ticketPage.fields.code'),
            value: Type.CODE
        }
    ]

    const optionsPassword = [
        {
            label: t('ticketPage.fields.password'),
            value: Password.PASSWORD
        },
        {
            label: t('ticketPage.fields.withoutPassword'),
            value: Password.WITHOUT_PASSWORD
        }
    ]

    const [selectedType, setSelectedType] = useState(optionsType[0].value)
    const [selectedPassword, setSelectedPassword] = useState(optionsPassword[0].value)

    const handleTypeChange = (event: any) => {
        setSelectedType(event.target.value)
    }

    const handlePasswordChange = (event: any) => {
        setSelectedPassword(event.target.value)
    }

    const handleCopyCode = () => {
        Toast({ message: t('ticketPage.fields.copyCode'), type: 'success' })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <FormProvider methods={methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ paddingTop: '20px', paddingBottom: '10px' }}>
                            <Typography variant="h4" color="primary">
                                {t('ticketPage.preferences')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4">{t('ticketPage.fields.type')}</Typography>
                        <CustomSelect
                            options={optionsType}
                            name="type"
                            defaultValue={optionsType[0].value}
                            onChange={handleTypeChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4">{t('ticketPage.fields.password')}</Typography>
                        <CustomSelect
                            options={optionsPassword}
                            name="password"
                            defaultValue={optionsPassword[0].value}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} paddingTop="25px">
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h4">
                            {selectedType === Type.QR_CODE ? t('ticketPage.fields.qrCode') : t('ticketPage.fields.code')}
                        </Typography>
                        {selectedType === Type.QR_CODE ? (
                            <Box
                                sx={{
                                    backgroundColor: '#F9FAFB',
                                    width: '100%',
                                    borderRadius: '15px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '30px'
                                }}
                            >
                                <Image
                                    src={qrCodeUrl}
                                    alt="QR Code"
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h4">{code}</Typography>
                                <CopyToClipboard text={code} onCopy={handleCopyCode}>
                                    <IconButton
                                        title={t('ticketPage.fields.copy')}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        <Image src={ImgPaths.copier_icon} width="20px" height="30px" />
                                    </IconButton>
                                </CopyToClipboard>
                            </Box>
                        )}
                    </Grid>
                    {selectedPassword === Password.PASSWORD && (
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h4">{t('ticketPage.fields.password')}</Typography>
                            <Typography variant="h4">{password}</Typography>
                        </Grid>
                    )}
                </Grid>

                <Grid container justifyContent="flex-end" alignItems="flex-end">
                    <Grid item>
                        <Tooltip title="Print">
                            <Image
                                src={ImgPaths.print_icon}
                                width="20px"
                                height="30px"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handlePrinter(
                                        selectedType,
                                        qrCodeUrl,
                                        code,
                                        selectedPassword,
                                        password,
                                        ImgPaths.logo_icon,
                                        t,
                                        user?.image
                                    )
                                }}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </FormProvider>
        </Box>
    )
}

export default Preferences
