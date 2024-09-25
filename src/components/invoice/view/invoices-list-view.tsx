import { Card, Stack } from '@mui/material'
import CustomTableHeader from '../../reusable/table/custom-table-header'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import CustomPagination from '../../reusable/customPagination/custom-pagination'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import useCustomPaginationTable from '../../reusable/hook-form/custom-table'
import InvoicesRows from '../invoices-list-rows'
import { useGetInvoiceList } from '../../../hooks/invoice/invoice.hook'
import { TInvoice } from '../../../interfaces/invoice'
import { THeadCell } from '../../../interfaces/table'
import { DataFilterItem } from '../../../interfaces/dataFilter/data-filter'
import { PAYMENT_METHOD } from '../../../utils/constants'
import { enumToArray } from '../../../utils/enum-to-array'

const InvoicesListView = () => {
    const {
        rowsPerPage,
        page,
        setPage,
        handleChangePage
    } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    const [search, setSearch] = useState('')

    const [filters, setFilters] = useState<Record<string, string[]>>({
        status: [],
        paymentMethode: []
    })

    const paymentMethodChilds = enumToArray(PAYMENT_METHOD, 'invoiceList', t)

    const statusChilds = [
        { name: t('common.yes'), value: 'true' },
        { name: t('common.no'), value: 'false' }
    ]

    const dataFilter: DataFilterItem[] = [
        {
            name: t('common.paymentMethod'),
            value: 'paymentMethode',
            childs: paymentMethodChilds
        },
        {
            name: t('common.status'),
            value: 'status',
            childs: statusChilds
        }
    ]


    const { data } = useGetInvoiceList({
        page,
        itemsPerPage: rowsPerPage,
        searchKeyword: search.length >= 2 ? search : undefined,
        filters: filters

    })

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)

    }

    const invoices = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])

  
    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('invoiceList.num'),
            align: 'center'
        },
        { id: '2', label: t('invoiceList.nameCustomer'), align: 'center' },
        {
            id: '3',
            label: t('invoiceList.date'),
            align: 'center'
        },
        { id: '4', label: t('invoiceList.amount'), align: 'center' },
        { id: '5', label: t('invoiceList.status.title'), align: 'center' },
        { id: '6', label: t('invoiceList.paymentMethod'), align: 'center' },
        { id: '7', label: t('invoiceList.action'), align: 'center' }
    ]

    return (
        <Stack alignItems="center">
            <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                <CustomTableHeader
                    searchQuery={search}
                    onSearch={handleSearch}
                    title={t('invoiceList.title')}
                    showButton={false}
                    dataFilter={dataFilter}
                    setFilters={setFilters}
                />

                <CustomTableContainer
                    rowCount={invoices.length}
                    headCells={tableHead}
                    CustomRow={(props) => <InvoicesRows {...props}  />} 
                    data={invoices}
                    title={'invoiceList'}
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
export default InvoicesListView
