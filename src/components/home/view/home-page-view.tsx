import { Avatar, Box, Container, Grid, Stack, Typography } from '@mui/material'
import CustomButton from '../../reusable/hook-form/custom-button'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { ImgPaths } from '../../../utils/image-paths'
import {
    BoxButtons,
    SectionOneBox,
    SectionTwoGrid,
    StyledDescription,
    StyledGrid,
    StyledTypography,
    TypographyDescription,
    TypographyFooter,
    TypographyQuestion,
    TypographyTitle
} from '../../../styles/home.style'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import { useResponsive } from '../../../utils/use-responsive'
import Image from '../../reusable/reusableImage'
import { StyledTitle } from '../../../styles/home.style'
import { useEffect, useRef, useState } from 'react'
import CustumerCodeTicket from './custumerCode'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ErpLogin from '../../product/ERP/erpConnection'
const HomePageView = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const lgUp = useResponsive('up', 'lg')
    const mdUp = useResponsive('up', 'md')
    const custumerCodeRef = useRef<HTMLDivElement>(null)

    const handleButtonClick = () => {
        if (custumerCodeRef.current) {
            custumerCodeRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }
    const secondSection = [
        {
            icon: ImgPaths.best_prices,
            title: t('homePage.bestPrice'),
            description: t('homePage.bestPriceDescription')
        },
        {
            icon: ImgPaths.guarantee,
            title: t('homePage.guarantee'),
            description: t('homePage.guaranteeDescription')
        },
        {
            icon: ImgPaths.certified,
            title: t('homePage.certified'),
            description: t('homePage.certifiedDescription')
        }
    ]
    const clientData = [
        {
            description: t('homePage.questionList.clientDescription'),
            avatar: ImgPaths.face_one,
            title: 'Ahmed Khmiss',
            adress: 'Mahdia'
        },
        {
            description: t('homePage.questionList.clientDescription'),
            avatar: ImgPaths.face_two,
            title: 'Sarra Melki',
            adress: 'Mahdia'
        },
        {
            description: t('homePage.questionList.clientDescription'),
            avatar: ImgPaths.face_three,
            title: 'Wissem Yahya',
            adress: 'Mahdia'
        }
    ]
    const questionList = [
        {
            title: t('homePage.questionList.questionOne'),
            description: t('homePage.questionList.clientDescription')
        },
        {
            title: t('homePage.questionList.questionTwo'),
            description: t('homePage.questionList.clientDescription')
        },
        {
            title: t('homePage.questionList.questionThree'),
            description: t('homePage.questionList.clientDescription')
        },
        {
            title: t('homePage.questionList.questionFoor'),
            description: t('homePage.questionList.clientDescription')
        },
        {
            title: t('homePage.questionList.questionFive'),
            description: t('homePage.questionList.clientDescription')
        },
        {
            title: t('homePage.questionList.questionSix'),
            description: t('homePage.questionList.clientDescription')
        }
    ]
    return (
        <>
            {/********************section 1***************** */}

            <Box sx={{ backgroundImage: `url(${ImgPaths.home_background})` }}>
                <Container maxWidth="xl">
               

                    <SectionOneBox
                        sx={{
                            px: 8,
                            pt: 20,
                            width: lgUp ? '70%' : '100%'
                        }}
                    >
                        <TypographyTitle variant={lgUp ? 'h2' : 'inherit'}>{t('homePage.title')}</TypographyTitle>
                        <TypographyDescription>{t('homePage.description')}</TypographyDescription>
                        <BoxButtons>
                            <CustomButton
                                backGroundColor={theme.palette.common.black}
                                textColor={theme.palette.common.white}
                                variant={'text'}
                                hoover={true}
                                border={theme.palette.common.white}
                                sx={{ width: '9rem', marginRight: theme.spacing(2) }}
                            >
                                {t('homePage.aboutUs')}
                            </CustomButton>
                            <CustomButton
                                backGroundColor={theme.palette.primary.main}
                                textColor={theme.palette.common.white}
                                variant={'text'}
                                hoover={true}
                                border={'none'}
                                sx={{ width: '9rem', marginRight: theme.spacing(2) }}
                            >
                                {t('homePage.contactUs')}
                            </CustomButton>

                            <CustomButton
                                backGroundColor={theme.palette.primary.darker}
                                textColor={theme.palette.common.white}
                                variant={'text'}
                                hoover={true}
                                border={theme.palette.common.white}
                                sx={{ width: '10rem' }}
                                onClick={handleButtonClick}
                            >
                                {t('homePage.follow')}
                            </CustomButton>
                        </BoxButtons>
                    </SectionOneBox>
                </Container>
            </Box>
            {/********************section 2***************** */}

            <Grid
                spacing={5}
                container
                direction={mdUp ? 'row' : 'column'}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: mdUp ? '0rem 6rem 2rem 6rem' : '0rem 1rem 2rem 5rem'
                }}
            >
                {secondSection.map((element) => (
                    <SectionTwoGrid xs={4} item>
                        <Image src={element.icon} alt="Logo" width={'100%'} />

                        <Box>
                            <StyledTitle variant="body1">{element.title}</StyledTitle>
                            <StyledDescription variant="body2">{element.description}</StyledDescription>
                        </Box>
                    </SectionTwoGrid>
                ))}
            </Grid>

            {/********************section 3***************** */}
            <Grid
                container
                direction={mdUp ? 'row' : 'column'}
                spacing={2}
                sx={{ backgroundColor: theme.palette.grey['600'], padding: '4rem 4rem' }}
            >
                <Grid item xs={6} order={{ xs: 2, md: 1 }}>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <ShowChartIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography sx={{ color: theme.palette.primary.main }}>{t('homePage.whoWeAre')}</Typography>
                    </Box>
                    <Typography
                        sx={{
                            color: theme.palette.common.white,
                            fontSize: '1.5rem',
                            textTransform: 'uppercase',
                            lineHeight: '1',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}
                    >
                        {t('homePage.techServices')}
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.common.white }}>
                        {t('homePage.descriptionHome')}
                    </Typography>
                    <CustomButton
                        backGroundColor={theme.palette.grey['600']}
                        textColor={theme.palette.primary.main}
                        variant={'outlined'}
                        hoover={true}
                        border={theme.palette.primary.main}
                        sx={{ width: '11rem', marginTop: '1.5rem' }}
                    >
                        {t('homePage.readMoreBtn')}
                    </CustomButton>
                </Grid>
                <Grid item xs={6} order={{ xs: 1, md: 2 }}>
                    <Image src={ImgPaths.right_side_img} alt="Logo" width={'100%'} />
                </Grid>
            </Grid>
            {/********************section 4***************** */}
            <Box ref={custumerCodeRef}>
                <CustumerCodeTicket />
            </Box>
            {/********************section 5***************** */}
            <Grid
                container
                direction={mdUp ? 'row' : 'column'}
                spacing={2}
                pl={4}
                sx={{ backgroundColor: theme.palette.grey['600'], padding: '7%' }}
            >
                <Stack direction="column">
                    <Box
                        display="flex"
                        sx={{
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <ShowChartIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography sx={{ color: theme.palette.primary.main }}> {t('homePage.testimonials')}</Typography>
                    </Box>
                    <TypographyQuestion>{t('homePage.WhatOurClients')}</TypographyQuestion>
                </Stack>
                <Grid container justifyContent="space-around">
                    {clientData.map((item, index) => (
                        <StyledGrid key={index} md={3} xs={10} item sx={{ background: theme.palette.common.black, mt: 5 }}>
                            <Image src={ImgPaths.vector_home} />
                            <Typography color={theme.palette.common.white} pt={2}>
                                {item.description}
                            </Typography>
                            <Stack pt={4} direction="row">
                                <Avatar src={item.avatar} />
                                <Stack ml={3} direction="column">
                                    <Typography color={theme.palette.primary.main}>{item.title}</Typography>
                                    <Typography color={theme.palette.common.white}>{item.adress}</Typography>
                                </Stack>
                            </Stack>
                        </StyledGrid>
                    ))}
                </Grid>
                <Image pt={7} src={ImgPaths.line} />
                <Stack width="90%" m="auto" pt={5}>
                    <Box
                        display="flex"
                        sx={{
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <ShowChartIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography sx={{ color: theme.palette.primary.main }}>{t('homePage.faqs')}</Typography>
                    </Box>
                    <TypographyQuestion>{t('homePage.askQuestions')}</TypographyQuestion>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {questionList.map((iteme, index) => (
                            <Grid key={index} mt={3} item md={6} xs={12}>
                                <Accordion
                                    sx={{
                                        padding: 2,
                                        borderLeft: `5px solid ${theme.palette.primary.main}`,
                                        '&.MuiAccordion-root': {
                                            borderRadius: '0%'
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ fill: theme.palette.primary.main }} />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <StyledTypography>{iteme.title}</StyledTypography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{iteme.description}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))}
                    </Grid>
                    <Image pt={7} src={ImgPaths.line} />
                    <TypographyFooter>{t('homePage.fastAndeasy')}</TypographyFooter>
                    <Typography
                        sx={{
                            color: theme.palette.primary.main,
                            fontSize: '2rem',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            marginBottom: '3rem',
                            textAlign: 'center'
                        }}
                    >
                        {t('homePage.ourWork')}
                    </Typography>
                </Stack>
            </Grid>
        </>
    )
}

export default HomePageView
