import { Box, Grid, Stack, useTheme } from '@mui/material'
import {
    FooterGrid,
    LinkTypography,
    StyledDivider,
    StyledIcon,
    StyledTypo,
    StyledTypography,
    TitleTypography
} from '../../styles/footer.style'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import { useTranslations } from '../../translation'

const Footer = () => {
    const theme = useTheme()
    const { t } = useTranslations()
    const sections = [
        {
            title: t('footer.title.navigation'),
            links: [
                t('footer.links.home'),
                t('footer.links.aboutUs'),
                t('footer.links.services'),
                t('footer.links.prices'),
                t('footer.links.contactUs')
            ]
        },
        {
            title: t('footer.title.quickLinks'),
            links: [
                t('footer.links.privacyPolicy'),
                t('footer.links.termsOfService'),
                t('footer.links.disclaimer'),
                t('footer.links.faq')
            ]
        },
        {
            title: t('footer.title.contactUs'),
            links: [t('footer.links.support'), t('footer.links.tel'), t('footer.links.email')]
        }
    ]
    const icons = ['ri:linkedin-fill', 'ri:facebook-fill', 'ri:instagram-line']
    return (
        <>
            <FooterGrid container spacing={4} py={5} px={9}>
                <Grid item lg={3} sm={6} md={6} xs={12}>
                    <Image src={ImgPaths.logo_white} alt=" Logo" width={'12rem'} sx={{ marginTop: '1px' }} />
                    <StyledTypography variant="body2">{t('footer.loremText')}</StyledTypography>
                </Grid>
                {sections.map((section, sectionIndex) => (
                    <Grid item lg={3} sm={6} md={6} xs={12} key={sectionIndex}>
                        <Box>
                            <TitleTypography variant="h4">{section.title}</TitleTypography>

                            {section.links.map((link, index) => (
                                <LinkTypography
                                    variant="body1"
                                    key={index}
                                    sx={{
                                        color:
                                            link === t('footer.links.tel') || link === t('footer.links.email')
                                                ? theme.palette.primary.main
                                                : theme.palette.common.white,
                                        fontSize:
                                            link === t('footer.links.tel') || link === t('footer.links.email')
                                                ? theme.typography.body2
                                                : theme.typography.body1
                                    }}
                                >
                                    {link}
                                </LinkTypography>
                            ))}
                            {section.title === t('footer.title.contactUs') && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Stack direction="row" spacing={2} sx={{ paddingTop: '11px' }}>
                                        {icons.map((icon, iconIndex) => (
                                            <StyledIcon key={iconIndex} icon={icon} />
                                        ))}
                                    </Stack>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <StyledDivider orientation="horizontal" flexItem />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <StyledTypo>{t('footer.copyRight')}</StyledTypo>
                        <StyledTypo>{t('footer.designedBy')}</StyledTypo>
                    </Box>
                </Grid>
            </FooterGrid>
        </>
    )
}
export default Footer
