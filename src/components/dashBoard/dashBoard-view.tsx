import { useTranslation } from 'react-i18next'
import { Box, Button, Card, Divider, Grid, Stack, Typography, alpha, useTheme } from '@mui/material'
import { useStatistique } from '../../hooks/statistique/statistique.hook'
import { useMemo, useState } from 'react'
import { ImgPaths } from '../../utils/image-paths'
import { StyledImage, StyledTypography } from '../../styles/dashboard.style'
import { PERIOD_LIST } from '../../utils/constants'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
const DashBoardView = () => {
    const [period, setPeriod] = useState('12m')
    const { t, i18n } = useTranslation()
    const lang = i18n.language

    const theme = useTheme()
    const { data } = useStatistique(period)
    const statisticList = useMemo(() => {
        return data?.data ?? {}
    }, [data])

    const monthName = (monthNbr: number) => {
        const date = new Date()
        date.setMonth(monthNbr - 1)

        const monthKey = date.toLocaleString(lang, { month: 'short' }).toLowerCase()
        const translatedMonth = t(`months.${monthKey}`)

        return translatedMonth !== `months.${monthKey}` ? translatedMonth : monthKey
    }

    const monthlyTicketData = useMemo(() => {
        return (statisticList?.monthlyTicketData ?? []).map((item: any) => ({
            ...item,
            month: monthName(item.month)
        }))
    }, [statisticList, lang, t])
    const dashboardList = [
        {
            id: '1',
            icon: ImgPaths.icon_one,
            title: t('dashboadPage.totalEmployee'),
            description: t('dashboadPage.descriptionEmployee'),
            nombreTotal: statisticList?.totalEmployee || 0
        },
        {
            id: '2',
            icon: ImgPaths.icon_two,
            title: t('dashboadPage.totalProduct'),
            description: t('dashboadPage.descriptionEmployee'),
            nombreTotal: statisticList?.totalProduct || 0
        },
        {
            id: '3',
            icon: ImgPaths.icon_three,
            title: t('dashboadPage.totalProductRepair'),
            description: t('dashboadPage.descriptionProduct'),
            nombreTotal: statisticList?.totalProductClosed || 0
        },
        {
            id: '4',
            icon: ImgPaths.icon_four,
            title: t('dashboadPage.totalCustomer'),
            description: t('dashboadPage.descriptionCustomer'),
            nombreTotal: statisticList?.totalClient || 0
        }
    ]

    return (
        <>
            <Stack>
                <Grid container item flexDirection="row" justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" fontWeight="bold" pl={16}>
                            {t('dashboadPage.title')}
                        </Typography>
                    </Grid>
             
                    <Grid item xs={12} md={4} pr={4} display="flex" justifyContent="space-evenly" flexDirection="row" spacing={4}>
                        {PERIOD_LIST.map((periodLabel) => (
                            <Button
                                key={periodLabel}
                                sx={{
                                    width: '18%',
                                    backgroundColor:
                                        period === periodLabel ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.15),
                                    color: theme.palette.common.black,
                                    borderRadius: '24px',
                                    ':hover': {
                                        background:
                                        period === periodLabel ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.15)
                                    }
                                }}
                                onClick={() => setPeriod(periodLabel)}
                            >
                                {periodLabel === '12m'
                                    ? t('dashboadPage.buttons.12months')
                                    : periodLabel === '30d'
                                      ? t('dashboadPage.buttons.30days')
                                      : periodLabel === '7d'
                                        ? t('dashboadPage.buttons.7days')
                                        : t('dashboadPage.buttons.1day')}
                            </Button>
                        ))}
                    </Grid>
                </Grid>

                <Grid container item flexDirection="row" pt={5} spacing={2} justifyContent="space-evenly">
                    {dashboardList.map((item) => (
                        <Grid
                            key={item.id}
                            item
                            display="flex"
                            flexDirection="column"
                            border="1px solid grey"
                            boxShadow="1px 1px 10px 1px grey"
                            borderRadius="10px"
                            xs={5}
                            sm={5}
                            md={5}
                            lg={2}
                            p={2}
                            mt={6}
                        >
                            <Stack direction="row" justifyContent="space-between">
                                <StyledImage src={item.icon} />
                                <Stack direction="column" alignItems="flex-end">
                                    <StyledTypography textAlign="end">{item.title}</StyledTypography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {item.nombreTotal}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack pt={3} direction="row">
                                {item.nombreTotal > 4 && <Typography color="green">{`+${item.nombreTotal - 4}`}</Typography>}
                                <Typography ml={1}>{item.description}</Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Card sx={{ padding: '2%', mt: '7%', width: '90%', mr: 'auto', ml: 'auto' }}>
                <Typography variant="h3" fontWeight="bold">
                    {t('dashboadPage.nbTicket')}
                </Typography>
                <Grid sx={{ background: 'linear-gradient(#DB2512, #231F20 )' }} container item justifyContent="center" mt={5}>
                    <BarChart width={1600} height={250} data={monthlyTicketData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                        <XAxis dataKey="month" tick={{ fill: 'white' }} axisLine={false} />
                        <YAxis tick={{ fill: 'white' }} axisLine={false} />
                        <Bar barSize={15} dataKey="totalTicket" fill={theme.palette.common.white} radius={[10, 10, 10, 10]} />
                    </BarChart>
                </Grid>
            </Card>
        </>
    )
}

export default DashBoardView
