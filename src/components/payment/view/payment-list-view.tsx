import { Card, Stack } from '@mui/material'
import CustomTableHeader from '../../reusable/table/custom-table-header'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import useCustomPaginationTable from '../../reusable/hook-form/custom-table'
import { THeadCell } from '../../../interfaces/table'
import { useGetPaymentList } from '../../../hooks/payment/payment.hook'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import PaymentRows from '../payment-list-rows'
import CustomPagination from '../../reusable/customPagination/custom-pagination'
import { TPayment } from '../../../interfaces/payment'
import moment from 'moment'
import { TYPE_PAYMENT } from '../../../utils/constants'
import { DataFilterItem } from '../../../interfaces/dataFilter/data-filter'
import { enumToArray } from '../../../utils/enum-to-array'

const PaymentListView = () => {
    const { rowsPerPage, page, setPage, handleChangePage } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    const [search, setSearch] = useState('')

    const [filters, setFilters] = useState<Record<string, string[]>>({
        type: [],
        payed: []
    })

    const typeChilds = enumToArray(TYPE_PAYMENT, 'payment', t)

    const isPayedChilds = [
        { name: t('common.yes'), value: 'true' },
        { name: t('common.no'), value: 'false' }
    ]

    const dataFilter: DataFilterItem[] = [
        {
            name: t('common.type'),
            value: 'type',
            childs: typeChilds
        },
        {
            name: t('common.payed'),
            value: 'payed',
            childs: isPayedChilds
        }
    ]



    const { data } = useGetPaymentList({
        page,
        itemsPerPage: rowsPerPage,
        filters: filters,
        searchKeyword: search.length >= 2 ? search : undefined
    })

    const payments = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)
    }

    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('homePage.name'),
            align: 'center'
        },
        {
            id: '2',
            label: t('payment.subscription'),
            align: 'center'
        },
        { id: '3', label: t('payment.expirationDate'), align: 'center' },
        { id: '4', label: t('invoiceList.amount'), align: 'center' },
        { id: '5', label: t('customerListPage.action.action'), align: 'center' }
    ]

    return (
        <Stack alignItems="center">
            <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                <CustomTableHeader
                    searchQuery={search}
                    onSearch={handleSearch}
                    title={t('payment.title')}
                    showButton={false}
                    dataFilter={dataFilter}
                    setFilters={setFilters}
                />
                <CustomTableContainer
                    rowCount={payments.length}
                    headCells={tableHead}
                    data={payments}
                    CustomRow={PaymentRows}
                    title={'paymentList'}
                />
                {data && (
                    <Stack width="100%" alignItems="flex-end" mt={2}>
                        <CustomPagination
                            totalCount={data.data.total}
                            itemsPerPage={rowsPerPage}
                            page={page}
                            handleChangePage={handleChangePage}
                            currentPage={page}
                        />
                    </Stack>
                )}
            </Card>
        </Stack>
    )
}
export default PaymentListView
