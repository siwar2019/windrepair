import { Card, Stack, TableCellProps } from '@mui/material'

import CustomTableHeader from '../../reusable/table/custom-table-header'

import { useTranslation } from 'react-i18next'
import { useGetCustomerList } from '../../../hooks/customer.hook'
import { ROLES } from '../../../utils/constants'
import { useEffect, useMemo, useState } from 'react'
import { ICustomer } from '../../../interfaces/customer'
import CustomPagination from '../../reusable/customPagination/custom-pagination'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import useCustomPaginationTable from '../../reusable/hook-form/custom-table'
import CustomerRows from '../customers-list-rows'
import { THeadCell } from '../../../interfaces/table'
import { DataFilterItem } from '../../../interfaces/dataFilter/data-filter'
import { IEmployee } from '../../../interfaces/employee'

const CustomerListView = () => {
    const {
        rowsPerPage,
        page,
        setPage,
        handleChangePage
    } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    const [search, setSearch] = useState('')

    const [filters, setFilters] = useState<Record<string, string[]>>({
        isActive: []
    })

    const isActiveChilds = [
        { name: t('common.yes'), value: 'true' },
        { name: t('common.no'), value: 'false' }
    ]

    const dataFilter: DataFilterItem[] = [
        {
            name: t('common.active'),
            value: 'isActive',
            childs: isActiveChilds
        }
    ]

    const { data } = useGetCustomerList({
        typeUser: ROLES.CLIENT,
        page,
        itemsPerPage: rowsPerPage,
        searchKeyword: search.length >= 2 ? search : undefined,
        filters: filters
    })

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)
        
    }

    const customers = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])
   
    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('common.name'),
            align: 'center'
        },
        { id: '3', label: t('customerListPage.phone'), align: 'center' },
        { id: '4', label: t('customerListPage.email'), align: 'center' },
        { id: '5', label: t('customerListPage.status'), align: 'center' },
        { id: '6', label: t('customerListPage.action.action'), align: 'center' }
    ]

    return (
        <Stack alignItems="center">
            <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                <CustomTableHeader
                    searchQuery={search}
                    onSearch={handleSearch}
                    title={t('customerListPage.title')}
                    showButton={false}
                    dataFilter={dataFilter}
                    setFilters={setFilters}
                />

                <CustomTableContainer
                    rowCount={customers.length}
                    headCells={tableHead}
                    data={customers}
                    CustomRow={CustomerRows}
                    title={'customerListPage'}
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
export default CustomerListView
