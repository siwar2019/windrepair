import { Card, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import useCustomPaginationTable from '../reusable/hook-form/custom-table'
import CustomTableContainer from '../reusable/table/custom-table-container'
import { ROLES } from '../../utils/constants'
import CustomPagination from '../reusable/customPagination/custom-pagination'
import CustomTableHeader from '../reusable/table/custom-table-header'
import { IPartner } from '../../interfaces/partner'
import PartnerRows from './partner-list-rows'
import { useGetPartnersList } from '../../hooks/partner.hook'
import { THeadCell } from '../../interfaces/table'
import { DataFilterItem } from '../../interfaces/dataFilter/data-filter'

const PartnerListView = () => {
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

    const { data } = useGetPartnersList({
        typeUser: ROLES.PARTNER,
        page,
        itemsPerPage: rowsPerPage,
        searchKeyword: search.length >= 2 ? search : undefined
    })
    const listPartners = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)
    }


    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('partner.companyName'),
            align: 'center'
        },
        {
            id: '2',
            label: t('employee.email'),
            align: 'center'
        },
        { id: '3', label: t('employee.phone'), align: 'center' },
        { id: '4', label: t('employee.status'), align: 'center' },
        { id: '5', label: t('employee.actions'), align: 'center' }
    ]
    return (
        <>
            <Stack alignItems="center">
                <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                    <CustomTableHeader
                        searchQuery={search}
                        showButton={false}
                        title={t('partner.title')}
                        onSearch={handleSearch}
                        dataFilter={dataFilter}
                        setFilters={setFilters}
                    />

                    <CustomTableContainer
                        rowCount={listPartners.length}
                        headCells={tableHead}
                        data={listPartners}
                        CustomRow={PartnerRows}
                        title={'partner'}
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
        </>
    )
}
export default PartnerListView
