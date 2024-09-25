import { Card, Stack } from '@mui/material'
import CustomTableHeader from '../../reusable/table/custom-table-header'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import CustomPagination from '../../reusable/customPagination/custom-pagination'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import useCustomPaginationTable from '../../reusable/hook-form/custom-table'
import { THeadCell } from '../../../interfaces/table'
import DeliveryRows from '../delivery-list-rows'
import { useGetAllDelivery } from '../../../hooks/settings.hook'
import ErpLogin from '../../product/ERP/erpConnection'

const DeliveryListView = () => {
    const { rowsPerPage, page, setPage, handleChangePage } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    const [search, setSearch] = useState('')
    const [openErpConnection, setOpenErpConnection] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('erpToken') || null)
    const { data } = useGetAllDelivery({
        token: token,
        pageSize: rowsPerPage,
        pageIndex: page,
        enabled: !!token
    })

    useEffect(() => {
        if (!token) {
            setOpenErpConnection(true)
        } else {
            setOpenErpConnection(false)
        }
    }, [token])

    const deliveryList = useMemo(() => {
        let productList = []
        if (data && data.data.length !== 0) {
            productList.push(...data.data.list)
        }
        return productList
    }, [data])

    const handleClose = () => {
        if (token) {
            setOpenErpConnection(false)
        }
    }

    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('deliveryList.invoiceNumber'),
            align: 'center'
        },
        { id: '2', label: t('deliveryList.invoiceDate'), align: 'center' },
        {
            id: '3',
            label: t('deliveryList.deliveryDate'),
            align: 'center'
        },
        { id: '4', label: t('deliveryList.status'), align: 'center' },
        { id: '5', label: t('deliveryList.paymentStatus'), align: 'center' },
        { id: '6', label: t('deliveryList.totalTtc'), align: 'center' },
        { id: '7', label: t('deliveryList.leftToPay'), align: 'center' }
    ]

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)
    }

    return token ? (
        <Stack alignItems="center">
            <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                <CustomTableHeader
                    searchQuery={search}
                    onSearch={handleSearch}
                    dataFilter={[]}
                    title={t('deliveryList.title')}
                    showButton={false}
                />
                <CustomTableContainer
                    rowCount={deliveryList.length}
                    headCells={tableHead}
                    data={deliveryList}
                    CustomRow={DeliveryRows}
                    title={'deliveryList'}
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
    ) : (
        <ErpLogin open={openErpConnection} handleClose={handleClose} setToken={setToken} />
    )
}
export default DeliveryListView
