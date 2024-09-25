import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { boxCode, TypographyDetails } from '../../../styles/home.style'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import moment from 'moment'
import { useGetTicket } from '../../../hooks/tickets/ticket.hooks'
import { useEffect, useMemo } from 'react'
import { COMMON } from '../../../theme/palette'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import PartRows from '../../product/createProduct/addPart/part-list-rows'
import { UnderlinedTypography } from '../../../styles/underlin-typographe.style'
import HistoryRows from './history-list-rows'
import { THeadCell } from '../../../interfaces/table'

const DetailTicket = () => {
    const { t } = useTranslation()
    const query = new URLSearchParams(useLocation().search)
    const code = query.get('code') || ''
    const navigate = useNavigate()
    const { refetch, data } = useGetTicket({ code })
    const currentDate = moment().format('DD-MM-YYYY')

    useEffect(() => {
        refetch()
    }, [])

    const handelReturn = () => {
        navigate('/')
    }
    const productData = useMemo(() => {
        return data?.data
    }, [data])

    const formattedStartDate = productData?.startDate ? moment(productData.startDate).format('DD-MM-YYYY') : '-'
    const customerDetails = [
        { label: t('homePage.customer'), value: productData?.product.client.name },
        { label: t('homePage.phone'), value: `+216 ${productData?.product.client.phone}` }
    ]

    const productDetails = [
        { label: t('homePage.serialNumber'), value: productData?.product.serialNumber || '-' },
        { label: t('homePage.model'), value: productData?.product.model },
        { label: t('homePage.name'), value: productData?.product.name || '-' },
        { label: t('homePage.startDate'), value: formattedStartDate },
        { label: t('homePage.estimateTime'), value: `${productData?.estimatedTime} ${t('common.days')}` },
        { label: t('homePage.estimateCost'), value: `${productData?.estimatedCost} TND` },
        { label: t('homePage.totalCost'), value: `${productData?.totalCost} TND` },
        { label: t('homePage.problem'), value: productData?.product.problemDescription },
        { label: t('homePage.status'), value: t(`ticketPage.fields.${productData?.product.status}`) }
    ]

    const tablePartHead: THeadCell[] = [
        {
            id: '1',
            label: t('addPartPage.fields.name'),
            align: 'center'
        },
        {
            id: '2',
            label: t('addPartPage.fields.category'),
            align: 'center'
        },
        {
            id: '3',
            label: t('addPartPage.fields.price'),
            align: 'center'
        },
        { id: '4', label: t('addPartPage.fields.guarantee'), align: 'center' }
    ]

    const tableHistoryHead: THeadCell[] = [
        {
            id: '1',
            label: t('history.status'),
            align: 'center'
        },
        {
            id: '2',
            label: t('history.date'),
            align: 'center'
        }
    ]
    return (
        <Paper elevation={3} sx={boxCode.paper}>
            <Box p={1}>
                <ArrowBackIcon color="error" sx={{cursor: "pointer"}} onClick={handelReturn} />
                <Typography fontWeight="bold" sx={boxCode.TypographyDetails}>
                    {t('homePage.detailProduct')}
                </Typography>
                <Divider />
                {data ? (
                    <>
                        {customerDetails.map((item, index) => (
                            <Grid container key={index} p={1}>
                                <Grid item xs={6} lg={6} md={6}>
                                    <TypographyDetails>{item.label}:</TypographyDetails>
                                </Grid>
                                <Grid item xs={6} lg={6} md={6} sx={{ maxWidth: '400px' }}>
                                    <TypographyDetails>{item.value}</TypographyDetails>
                                </Grid>
                            </Grid>
                        ))}

                        <Divider />

                        {productDetails.map((item, index) => (
                            <Grid container key={index} p={1}>
                                <Grid item xs={6} lg={6} md={6}>
                                    <TypographyDetails>{item.label}:</TypographyDetails>
                                </Grid>
                                <Grid item xs={6} lg={6} md={6}>
                                    <TypographyDetails
                                        color={item.label === t('homePage.status') ? COMMON.common.orange : COMMON.common.black}
                                        sx={{
                                            overflowWrap: 'break-word',
                                            wordWrap: 'break-word',
                                            maxWidth: '100%',
                                            whiteSpace: 'normal'
                                        }}
                                    >
                                        {item.value}
                                    </TypographyDetails>
                                </Grid>
                            </Grid>
                        ))}

                        <Grid container p={1} pt={3}>
                            <Grid item xs={12} lg={12} md={12}>
                                <UnderlinedTypography variant="h3" fontWeight={600}>
                                    {t('history.title')}
                                </UnderlinedTypography>
                            </Grid>
                            <Grid item xs={12} lg={12} md={12} display="flex" justifyContent="center">
                                <Box
                                    sx={{
                                        p: 2,
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <CustomTableContainer
                                        rowCount={1}
                                        headCells={tableHistoryHead}
                                        data={productData.product.history}
                                        CustomRow={(rowProps) => {
                                            const isLastRow = rowProps.index === productData?.product.history.length - 1
                                            return <HistoryRows {...rowProps} isLastRow={isLastRow} />
                                        }}
                                        title={'history'}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <Box p={3} pt={6}>
                            <Divider />
                            <Typography variant="body1">
                                #{productData.product.serialNumber}. {t('homePage.WindRepair')} {currentDate}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Box p={4} sx={boxCode.noData}>
                        {t('homePage.noData')}{' '}
                    </Box>
                )}
            </Box>
        </Paper>
    )
}

export default DetailTicket
