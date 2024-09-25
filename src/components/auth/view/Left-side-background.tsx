import { Box } from '@mui/material'
import { ImgPaths } from '../../../utils/image-paths'
import { useTranslations } from '../../../translation'
import { StyledDescription, StyledTitle } from '../../../styles/auth.style'

const LeftSideBackGround = () => {
    const { t } = useTranslations()
    return (
        <>
            <Box
                component="img"
                src={ImgPaths.auth_background}
                sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                }}
            />
            <Box
                component="img"
                src={ImgPaths.auth_bg}
                sx={{
                    position: 'absolute',
                    width: '55%',
                    transform: 'translateY(0.1rem) translateX(-12%)'
                }}
            />
            <Box
                display="grid"
                sx={{
                    position: 'absolute',
                    transform: 'translateY(10px) translateX(-6%)',
                    left: '13%',
                    top: '30%'
                }}
            >
                <StyledTitle variant="h3">{t('auth.leftSideBackground.title')}</StyledTitle>
                <StyledDescription variant="h5">{t('auth.leftSideBackground.description')}</StyledDescription>
            </Box>
        </>
    )
}
export default LeftSideBackGround
