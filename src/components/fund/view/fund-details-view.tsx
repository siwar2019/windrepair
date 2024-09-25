import { useMemo } from 'react'
import { Card, Stack, Typography } from '@mui/material'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import { THeadCell } from '../../../interfaces/table'
import { useTranslation } from 'react-i18next'
import { useDetailsFund } from '../../../hooks/fund.hook'
import FundDetailsRows from '../fund-details'
import CustomPagination from '../../reusable/customPagination/custom-pagination'
import useCustomPaginationTable from '../../reusable/hook-form/custom-table'
import { useTheme } from '@mui/material'
import { TFund } from '../../../interfaces/fund'
import { ImgPaths } from '../../../utils/image-paths'
import Image from '../../reusable/reusableImage'
import { paths } from '../../../routes/paths'
import { useNavigate } from 'react-router-dom'
import { currency } from '../../../utils/constants'

type FundDetailsViewProps = {
    id: string
}
const FundDetailsView = ({ id }: FundDetailsViewProps) => {
    const {
        rowsPerPage,
        page,

        handleChangePage
    } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const navigate = useNavigate()

    const { t } = useTranslation()
    const theme = useTheme()
    const { data } = useDetailsFund(parseInt(id), page, rowsPerPage)

    const tableHead: THeadCell[] = useMemo(() => {
        const baseHead: THeadCell[] = [
            {
                id: '1',
                label: t('fundList.name'),
                align: 'center'
            }
        ]

        if (data?.isMain) {
            baseHead.push(
                {
                    id: '2',
                    label: t('invoiceList.date'),
                    align: 'center'
                },
                {
                    id: '3',
                    label: "",
                    align: 'center'
                },
                {
                    id: '4',
                    label: "",
                    align: 'center'
                },
                {
                    id: '5',
                    label: t('fundDetails.amountMouvmnt'),
                    align: 'center'
                }
            )
        } else {
            baseHead.push(
                {
                    id: '2',
                    label: t('invoiceList.date'),
                    align: 'center'
                },
                {
                    id: '3',
                    label: t('fundDetails.product'),
                    align: 'center'
                },
                {
                    id: '4',
                    label: t('homePage.customer'),
                    align: 'center'
                },
                {
                    id: '5',
                    label: t('fundDetails.amountMouvmnt'),
                    align: 'center'
                }
            )
        }

        return baseHead
    }, [data, t])

    const fundData = useMemo(() => {
        return data?.list ?? []
    }, [data])

    const goBack = () => {
        navigate(paths.app.fund)
    }
    return (
        <>
            <Stack>
                <Stack direction="row" justifyContent="space-between" pb={5}>
                    <Typography variant="h2" pl="8%" fontWeight="bold">
                        {t('fundDetails.title')}
                    </Typography>
                    <Image sx={{ cursor: 'pointer', pr: '8%' }} onClick={goBack} src={ImgPaths.icon_back} />
                </Stack>

                <Stack alignItems="center">
                    <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                        <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main}>
                            {t('fundDetails.detailsFund')}
                        </Typography>
                             <Typography variant="h4" fontWeight="bold" pb="1%">
                            {t('fundDetails.actualAmount')} : {data?.amountTotal} {currency}
                        </Typography>
                        <CustomTableContainer
                            rowCount={fundData.length}
                            headCells={tableHead}
                            data={fundData}
                            CustomRow={FundDetailsRows}
                            title={'fundList'}
                        />
                        {data && (
                            <Stack width="100%" alignItems="flex-end" mt={2}>
                                <CustomPagination
                                    totalCount={data.total}
                                    itemsPerPage={rowsPerPage}
                                    page={page}
                                    handleChangePage={handleChangePage}
                                    currentPage={page}
                                />
                            </Stack>
                        )}
                    </Card>
                </Stack>
            </Stack>
        </>
    )
}

export default FundDetailsView
