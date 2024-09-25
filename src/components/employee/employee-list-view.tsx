import { Card, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import useCustomPaginationTable from '../reusable/hook-form/custom-table'
import CustomTableContainer from '../reusable/table/custom-table-container'
import { ROLES, ROLE_PERMISSION } from '../../utils/constants'
import CustomPagination from '../reusable/customPagination/custom-pagination'
import CustomTableHeader from '../reusable/table/custom-table-header'
import { IEmployee } from '../../interfaces/employee'
import EmployeeRows from './employee-list-rows'
import React from 'react'
import AddEmployeeView from './addEmployee-view'
import { useGetEmployeeList } from '../../hooks/employee.hook'
import { THeadCell } from '../../interfaces/table'
import { useActionPermission } from '../auth/utils/commonRole'
import { DataFilterItem } from '../../interfaces/dataFilter/data-filter'

const EmployeeListView = () => {
    const { rowsPerPage, page, setPage, handleChangePage } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()

    const [open, setOpen] = useState(false)
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

    const handleClose = () => {
        setOpen(false)
    }
    const addEmployee = () => {
        setOpen(true)
    }
    const { data } = useGetEmployeeList({
        typeUser: ROLES.EMPLOYEE,
        page,
        itemsPerPage: rowsPerPage,
        searchKeyword: search.length >= 2 ? search : undefined,
        filters: filters
    })

    const listEmployee = useMemo(() => {
        let employeeList: IEmployee[] = []
        if (data && data.data.length !== 0) {
            employeeList.push(...data.data.list)
        }
        return employeeList
    }, [data])

    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('employee.name'),
            align: 'center'
        },
        {
            id: '2',
            label: t('employee.email'),
            align: 'center'
        },
        { id: '3', label: t('employee.phone'), align: 'center' },
        { id: '4', label: t('employee.role'), align: 'center' },
        { id: '5', label: t('employee.status'), align: 'center' },
        { id: '6', label: t('employee.actions'), align: 'center' }
    ]
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        setSearch(value)
        setPage(1)
    }



    const addAction = useActionPermission(ROLE_PERMISSION.EMPLOYEE, ROLE_PERMISSION.ADD_EMPLOYEE)

    return (
        <>
            <Stack alignItems="center">
                <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                    <CustomTableHeader
                        searchQuery={search}
                        onSearch={handleSearch}
                        buttonTitle={t('employee.buttonTitle')}
                        title={t('employee.title')}
                        onClick={addEmployee}
                        addPermission={addAction}
                        dataFilter={dataFilter}
                        setFilters={setFilters}
                    />

                    <CustomTableContainer
                        rowCount={listEmployee.length}
                        headCells={tableHead}
                        data={listEmployee}
                        CustomRow={EmployeeRows}
                        title={'employee'}
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
            <AddEmployeeView open={open} closeModal={handleClose} />
        </>
    )
}
export default EmployeeListView
