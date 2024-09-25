import { Box, Grid, InputAdornment, Stack, Typography } from '@mui/material'
import { useTranslations } from '../../../translation'
import { IProduct } from '../../../interfaces/product/product'
import CustomModal from '../../reusable/customModal/custom-modal'
import moment from 'moment'
import { useMemo } from 'react'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import { THeadCell } from '../../../interfaces/table'
import { currency, currencyInput } from '../../../utils/constants'
import { StyledTextField, StyledTextarea } from '../../../styles/product.style'
import PartRowsView from './view-product-rows'

interface ViewProductProps {
    open: boolean
    onClose: () => void
    product: IProduct
}

const ViewProduct = ({ onClose, product, open }: ViewProductProps) => {
    const { t } = useTranslations()
    const { model, name, problemDescription, repairticket, serialNumber, guarantee, saleDate, pin, subStore } = product
    const tableHead: THeadCell[] = [
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
    const partsData = useMemo(() => {
        return product.parts ?? []
    }, [product.parts])
    return (
        <CustomModal open={open} handleClose={onClose} title={t('ticketPage.title')}>
            <Box sx={{ padding: '20px 0px 20px 0px' }}>
                <Typography variant="h4" color="primary">
                    {t('ticketPage.title')}
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.serialNumber')}</Typography>
                    <StyledTextField disabled value={serialNumber || '-'}></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.name')}</Typography>
                    <StyledTextField disabled value={name}></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.model')}</Typography>
                    <StyledTextField disabled value={model || '-'}></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.estimatedCost')}</Typography>
                    <StyledTextField
                        disabled
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Typography>{currency}</Typography>
                                </InputAdornment>
                            )
                        }}
                        value={repairticket?.estimatedCost}
                    ></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.creationDate')}</Typography>
                    <StyledTextField disabled value={moment(product.repairticket?.createdAt).format('YYYY-MM-DD')}></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.estimatedTime')}</Typography>
                    <StyledTextField
                        disabled
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Typography>{currencyInput}</Typography>
                                </InputAdornment>
                            )
                        }}
                        value={product.repairticket?.estimatedTime}
                    ></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.pin')}</Typography>
                    <StyledTextField disabled value={pin || '-'}></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.store')}</Typography>
                    <StyledTextField disabled value={subStore ? `${subStore?.store.name} - ${subStore?.name}` : '-'}></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.startDate')}</Typography>
                    <StyledTextField
                        disabled
                        value={product.repairticket?.startDate ? moment(product.repairticket?.startDate).format('YYYY-MM-DD') : '-'}
                    ></StyledTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">{t('ticketPage.fields.endDate')}</Typography>
                    <StyledTextField
                        disabled
                        value={product.repairticket?.endDate ? moment(product.repairticket?.endDate).format('YYYY-MM-DD') : '-'}
                    ></StyledTextField>
                </Grid>
                {saleDate && (
                    <Grid item xs={12} sm={guarantee ? 6 : 12}>
                        <Typography variant="h4">{t('ticketPage.fields.saleDate')}</Typography>
                        <StyledTextField disabled value={saleDate}></StyledTextField>
                    </Grid>
                )}
                {guarantee && (
                    <Grid item xs={12} sm={saleDate ? 6 : 12}>
                        <Typography variant="h4">{t('ticketPage.fields.guarantee')}</Typography>
                        <StyledTextField disabled value={guarantee}></StyledTextField>
                    </Grid>
                )}
                <Grid item xs={12} sm={12}>
                    <Typography variant="h4">{t('ticketPage.fields.problemDescription')}</Typography>
                    <Stack flexDirection="row" alignItems="center">
                        <StyledTextarea disabled minRows={5} value={problemDescription} />
                    </Stack>
                </Grid>
  
                <Grid item xs={12} sm={12}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        {t('ticketPage.fields.partDetails')}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Stack alignItems="center">
                        <Box sx={{ p: 2, width: '100%', height: '100%' }}>
                            <CustomTableContainer
                                rowCount={partsData.length}
                                headCells={tableHead}
                                data={partsData}
                                CustomRow={PartRowsView}
                                title={'partDetail'}
                            />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ViewProduct
