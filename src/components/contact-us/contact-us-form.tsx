import { Box, Container, Grid, Stack, Typography, useTheme } from '@mui/material'
import { SectionOneBox, TypographyDescription, TypographyTitle } from '../../styles/home.style'
import { useTranslation } from 'react-i18next'
import { ImgPaths } from '../../utils/image-paths'
import { useResponsive } from '../../utils/use-responsive'
import { FormProvider, useForm } from 'react-hook-form'
import { StyledButtonSave } from '../../styles/custom-buttons.style'
import Image from '../reusable/reusableImage'
import { StyledTextField } from '../../styles/employee.style'

const ContactUsForm = () => {
    const { t } = useTranslation()
    const lgUp = useResponsive('up', 'lg')
    const mdUp = useResponsive('up', 'md')
    const theme = useTheme()
    const methods = useForm({ mode: 'all' })
    return (
        <>
            <Box height={600} sx={{ backgroundImage: `url(${ImgPaths.contact_background})` }}>
                <Container maxWidth="xl">
                    <SectionOneBox
                        sx={{
                            px: 8,
                            pt: 25,
                            width: lgUp ? '35%' : '100%'
                        }}
                    >
                        <TypographyTitle variant={lgUp ? 'h2' : 'inherit'}>{t('contactPage.contactUs')}</TypographyTitle>
                        <TypographyDescription>{t('contactPage.description')}</TypographyDescription>
                    </SectionOneBox>
                </Container>
            </Box>
            <Grid
                container
                direction={mdUp ? 'row' : 'column'}
                spacing={1}
                sx={{
                    backgroundColor: theme.palette.grey['600'],
                    padding: mdUp ? '0rem 6rem 2rem 6rem' : '0rem 1rem 2rem 5rem',
                    pt: 10
                }}
            >
                <Grid padding={5} item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Box
                            sx={{
                                gap: '0.5rem',
                                marginBottom: '1rem'
                            }}
                        >
                            <Image src={ImgPaths.vector_contact} />
                        </Box>
                        <Typography
                            sx={{
                                color: theme.palette.common.white,
                                fontSize: '2rem',
                                textTransform: 'uppercase',
                                lineHeight: '1',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}
                        >
                            {t('contactPage.title')}
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.common.white }}>
                            {t('contactPage.talkDescritiopn')}
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.common.white }}>
                            {t('contactPage.subTalkDescription')}
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.common.white }}>
                            {t('customerListPage.email')}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.common.white }}>
                            {t('footer.links.email')}
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.common.white }}>
                            {t('contactPage.socials.titlle')}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.common.white }}>
                            {t('contactPage.socials.instagram')}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.common.white }}>
                            {t('contactPage.socials.linkedin')}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.common.white }}>
                            {t('contactPage.socials.facebook')}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid padding={5} item xs={12} md={4}>
                    <FormProvider {...methods}>
                        <form>
                            <Stack spacing={2}>
                                <Typography color={theme.palette.common.white}>{t('homePage.name')}</Typography>
                                <StyledTextField
                                    InputProps={{
                                        sx: { background: 'white' }
                                    }}
                                    name="name"
                                    border="simpleTextField"
                                />
                                <Typography color={theme.palette.common.white}>{t('customerListPage.email')}</Typography>
                                <StyledTextField
                                    InputProps={{
                                        sx: { background: 'white' }
                                    }}
                                    name="email"
                                    border="simpleTextField"
                                />
                                <Typography color={theme.palette.common.white}>{t('contactPage.descriptionTitle')}</Typography>
                                <StyledTextField
                                    rows={2}
                                    multiline
                                    InputProps={{
                                        sx: { background: 'white' }
                                    }}
                                    name="description"
                                    border="simpleTextField"
                                />
                                <StyledButtonSave
                                    backGroundColor={theme.palette.primary.main}
                                    textColor={theme.palette.common.white}
                                    variant={'text'}
                                    hoover={true}
                                    border={theme.palette.primary.main}
                                    type="submit"
                                >
                                    {t('contactPage.send')}
                                </StyledButtonSave>
                            </Stack>
                        </form>
                    </FormProvider>
                </Grid>
            </Grid>
        </>
    )
}
export default ContactUsForm
