import { Card, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import useCustomPaginationTable from '../reusable/hook-form/custom-table'
import CustomTableContainer from '../reusable/table/custom-table-container'
import CustomPagination from '../reusable/customPagination/custom-pagination'
import CustomTableHeader from '../reusable/table/custom-table-header'
import React from 'react'
import { THeadCell } from '../../interfaces/table'
import FundRows from './fund-list-rows'
import AddFund from './addFund-view'
import { useGetFindList } from '../../hooks/fund.hook'
import { TFund } from '../../interfaces/fund'
import LimitFundAlert from './limit-fund-alert'
import { useActionPermission } from '../auth/utils/commonRole'
import { ROLE_PERMISSION } from '../../utils/constants'

const FundListView = () => {
    const {
        rowsPerPage,
        page,
        setPage,
        handleChangePage
    } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    //add fund modal
    const [open, setOpen] = React.useState(false)
    //limit fund creation
    const [alertModal, setAlertModal] = React.useState(false)
    const [search, setSearch] = useState('')

    const handleClose = () => {
        setOpen(false)
    }
    const closeAlertModal = () => {
        setAlertModal(false)
    }
    const upgrade = () => {}

    const { data} = useGetFindList({
        page,
        itemsPerPage: rowsPerPage,
        searchKeyword: search.length >= 2 ? search : undefined,
    })
    const fundList = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)
    }

    const createFund = () => {
        return data?.data?.canAddCashRegister ? setOpen(true) : setAlertModal(true)
    }
    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('fundList.name'),
            align: 'center'
        },
        {
            id: '2',
            label: t('fundList.bankAccount'),
            align: 'center'
        },
        { id: '3', label: t('fundList.initialAmount'), align: 'center' },
        { id: '4', label: t('fundList.status'), align: 'center' },
        { id: '5', label: t('fundList.action'), align: 'center' }
    ]
    const addAction = useActionPermission(ROLE_PERMISSION.FUND, ROLE_PERMISSION.ADD_FUND)

    return (
        <>
            <Stack>
                <Typography variant="h2" pb={5} pl="8%" fontWeight="bold">
                    {t('fundDetails.title')}
                </Typography>
                <Stack alignItems="center">
                    <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                        <CustomTableHeader
                            searchQuery={search}
                            buttonTitle={t('fundList.buttonTitle')}
                            onSearch={handleSearch}
                            title={t('fundList.title')}
                            onClick={createFund}
                            addPermission={addAction}
                        />

                        <CustomTableContainer
                            rowCount={fundList.length}
                            headCells={tableHead}
                            data={fundList}
                            CustomRow={FundRows}
                            title={'fundList'}
                        />

                        {data && (
                            <Stack width="100%" alignItems="flex-end" mt={2}>
                                <CustomPagination
                                    totalCount={data.data?.total}
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

            <AddFund open={open} handleClose={handleClose} />
            <LimitFundAlert open={alertModal} handleClose={closeAlertModal} onClick={upgrade} />
        </>
    )
}
export default FundListView
