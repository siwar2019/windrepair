import { Box, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomModal from '../../reusable/customModal/custom-modal'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import { IProduct } from '../../../interfaces/product/product'
import { THeadCell } from '../../../interfaces/table'
import { useMemo } from 'react'
import PartRowsView from '../viewProduct/view-product-rows'
import ProblemDetails from './detailProblem'
type PropsProblem = {
    open: boolean
    handleClose: () => void
    problemDescription: string
    product: IProduct
    casAccessProblemModel: boolean
}
const ProblemModal = ({ open, handleClose, problemDescription, product, casAccessProblemModel }: PropsProblem) => {
    const { t } = useTranslation()
    const partsData = useMemo(() => {
        return product.parts ?? []
    }, [product.parts])
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
    return (
        <CustomModal open={open} handleClose={handleClose} title={t('ticketPage.detailsProblem')} maxWidth="50%">
            <Stack spacing={2} direction={'column'}>
                <Typography variant="h4" fontWeight="bold">
                    {t('ticketPage.Problems')} :
                </Typography>
                <Typography variant="body1">{problemDescription}</Typography>
                {casAccessProblemModel && (
                    <>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            {t('ticketPage.fields.partDetails')}
                        </Typography>

                        <Stack alignItems="center">
                            <Box sx={{ p: 2, width: '100%', height: '100%' }}>
                                <ProblemDetails
                                    rowCount={partsData.length}
                                    headCells={tableHead}
                                    data={partsData}
                                    CustomRow={PartRowsView}
                                    title={'part'}
                                />
                            </Box>
                        </Stack>
                    </>
                )}
            </Stack>
        </CustomModal>
    )
}

export default ProblemModal
