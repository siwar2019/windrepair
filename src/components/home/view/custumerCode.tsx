import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useTranslations } from '../../../translation'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import CustomButton from '../../reusable/hook-form/custom-button'
import { boxCode } from '../../../styles/home.style'
import { paths } from '../../../routes/paths'
import { TTicket } from '../../../interfaces/props/ticket'
import { useNavigate } from 'react-router-dom'
import Image from '../../reusable/reusableImage'
import { ImgPaths } from '../../../utils/image-paths'

const CustumerCodeTicket = () => {
    const { t } = useTranslations()
    const theme = useTheme()
    const navigate = useNavigate()
    const Schema = Yup.object().shape({
        code: Yup.string().required()
    })

    const defaultValues = {
        code: ''
    }

    const methods = useForm({
        resolver: yupResolver(Schema),
        defaultValues,
        mode: 'all'
    })

    const onSubmit = async (values: TTicket) => {
        navigate(`${paths.ticket.ticket}/?code=${values.code}`)
    }

    return (
        <Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box sx={boxCode.followBox}>
                        <Box sx={boxCode.paragCode}>
                            <Stack spacing={2}>
                                <Typography>
                                    <Image src={ImgPaths.vector} alt="img1" />
                                    {t('homePage.codeTitle')}
                                </Typography>
                                <Typography variant="h3" sx={boxCode.titleCode} color={theme.palette.common.white}>
                                    {t('homePage.follow')}
                                </Typography>
                                <Typography variant="body2">{t('homePage.paragCode')}</Typography>
                                <CustomTextField name="code" placeholder={`${t('homePage.code')}`} sx={boxCode.CustomTextField} />
                                <CustomButton
                                    variant={'text'}
                                    backGroundColor="red"
                                    textColor={theme.palette.common.white}
                                    hoover={false}
                                    border={''}
                                    sx={boxCode.CustomButton}
                                    type="submit"
                                >
                                    {t('homePage.btnOk')}
                                </CustomButton>
                            </Stack>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    )
}

export default CustumerCodeTicket
