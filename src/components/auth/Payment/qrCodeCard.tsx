import { Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomButton from '../../reusable/hook-form/custom-button'
import Image from '../../reusable/reusableImage'
import { ImgPaths } from '../../../utils/image-paths'
import { Loading } from '../../reusable/loading'
import { useGetStatus } from '../../../hooks/payment/payment.hook'
import { useNavigate } from 'react-router-dom'
import { Dispatch, SetStateAction, useState } from 'react'
import { secondaryFont } from '../../../theme/typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { paths } from '../../../routes/paths'
import { STATUS_PAYMENT } from '../../../utils/constants'
import Toast from '../../reusable/custom-toast'
import {
    BottomLeftImage,
    BottomRightImage,
    ImageBox,
    InnerBox,
    OverlayBox,
    SectionOneBox,
    TopLeftImage,
    TopRightImage
} from '../../../styles/qr-code.style'

type QrCodeCardProps = {
    image: string
    codePay: string
    isPending: boolean
    setDisplayContent?: Dispatch<SetStateAction<number>>
}

const QrCodeCard = ({ image, codePay, isPending, setDisplayContent }: QrCodeCardProps) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [payment, setPayment] = useState(false)
    const { refetch } = useGetStatus({ codePay }, false)

    const checkStatus = async () => {
        try {
            const result = await refetch()
            const paymentStatus = result.data.data

            if (paymentStatus === STATUS_PAYMENT.PAID) {
                Toast({
                    message: t('payment.paid'),
                    type: 'success'
                })
                setDisplayContent ? setDisplayContent(0) : navigate(paths.auth.login)
            } else {
                setPayment(true)
            }
        } catch (error) {
            console.error('Error checking payment status:', error)
        }
    }

    const navigateToHome = () => {
        navigate(paths.app.root)
    }

    return (
        <Box sx={{ minHeight: '100vh', padding: '20px' }}>
            {!payment ? (
                <>
                    <Typography variant="h4" sx={{ mb: 3, ml: 7, fontWeight: 400, fontSize: 24 }}>
                        {t('qrCodeCard.scan')}
                    </Typography>

                    <SectionOneBox>
                        <InnerBox>
                            {!isPending ? (
                                <ImageBox>
                                    <Image src={image} alt="QR Code" sx={{ layout: 'fill', objectFit: 'contain' }} />
                                </ImageBox>
                            ) : (
                                <Loading />
                            )}
                            <OverlayBox>
                                <TopLeftImage>
                                    <Image src={ImgPaths.topLeft} width={50} height={50} />
                                </TopLeftImage>
                                <TopRightImage>
                                    <Image src={ImgPaths.topRight} width={50} height={50} />
                                </TopRightImage>
                                <BottomLeftImage>
                                    <Image src={ImgPaths.bottomLeft} width={50} height={50} />
                                </BottomLeftImage>
                                <BottomRightImage>
                                    <Image src={ImgPaths.bottomRight} width={50} height={50} />
                                </BottomRightImage>
                            </OverlayBox>
                        </InnerBox>
                        <Typography variant="h4" sx={{ fontWeight: 400, fontSize: 24 }}>
                            {t('qrCodeCard.expiredIn')}
                        </Typography>
                        <CustomButton
                            variant="contained"
                            data-testid="registerButton"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border="none"
                            sx={{ padding: '5px', width: '30%' }}
                            onClick={checkStatus}
                        >
                            {t('qrCodeCard.continue')}
                        </CustomButton>
                    </SectionOneBox>
                </>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '60px',
                        flexDirection: 'column'
                    }}
                >
                    <Image src={ImgPaths.payment} alt="payment" />
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: secondaryFont,
                            color: theme.palette.secondary.dark
                        }}
                    >
                        {t('payment.verification')}
                    </Typography>
                    <Typography variant="h4" sx={{ pt: 2, fontWeight: 400, fontSize: 24 }}>
                        {t('payment.msg')}
                    </Typography>
                    <Box sx={{ pt: 2 }}>
                        <CustomButton
                            variant="contained"
                            data-testid="registerButton"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border="none"
                            onClick={navigateToHome}
                        >
                            <ArrowBackIcon sx={{ color: theme.palette.common.white, fontSize: '1.2rem' }} />
                            <Typography sx={{ pl: 0.5 }}>{t('common.backToHome')}</Typography>
                        </CustomButton>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default QrCodeCard
