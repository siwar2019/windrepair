import { Card, Stack } from '@mui/material'
import CustomTableHeader from '../../reusable/table/custom-table-header'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import CustomPagination from '../../reusable/customPagination/custom-pagination'
import CustomTableContainer from '../../reusable/table/custom-table-container'
import useCustomPaginationTable from '../../reusable/hook-form/custom-table'
import { IProduct } from '../../../interfaces/product/product'
import { useGetProductList } from '../../../hooks/product/product.hook'
import CreateProductView from '../createProduct/create-product-view'
import { RootState, useSelector } from '../../../redux/store'
import { PRODUCT_STATUS, ROLES, ROLE_PERMISSION } from '../../../utils/constants'
import { THeadCell } from '../../../interfaces/table'
import { useActionPermission } from '../../auth/utils/commonRole'
import ProductRows from './product-list-rows'
import { DataFilterItem } from '../../../interfaces/dataFilter/data-filter'
import { enumToArray } from '../../../utils/enum-to-array'

const ProductsListView = () => {
    const { rowsPerPage, page, handleChangePage, setPage } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    const user = useSelector((state: RootState) => state.auth.user)

    const [openCreateProductModal, setOpenCreateProductModal] = useState<boolean>(false)
    const handleModalCreateProduct = (value: boolean) => {
        setOpenCreateProductModal(value)
    }
    const [search, setSearch] = useState('')

    const [filters, setFilters] = useState<Record<string, string[]>>({
        status: []
    })

    const statusChilds = enumToArray(PRODUCT_STATUS, 'ticketPage.fields', t)

    const dataFilter: DataFilterItem[] = [
        {
            name: t('common.status'),
            value: 'status',
            childs: statusChilds
        }
    ]

    const { data } = useGetProductList({
        page,
        itemsPerPage: rowsPerPage,
        searchKeyword: search.length >= 2 ? search : undefined,
        filters: filters
    })

    const products = useMemo(() => {
        let productList: IProduct[] = []
        if (data && data.data.length !== 0) {
            productList.push(...data.data.list)
        }
        return productList
    }, [data])

    const hasAccess = !!user && [ROLES.EMPLOYEE, ROLES.PARTNER].includes(user.role)
    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('ticketPage.fields.id'),
            align: 'center'
        },
        {
            id: '2',
            label: t('ticketPage.fields.serialNumber'),
            align: 'center'
        },
        {
            id: '3',
            label: t('ticketPage.fields.customer'),
            align: 'center'
        },
        { id: '4', label: t('ticketPage.fields.model'), align: 'center' },
        { id: '5', label: t('ticketPage.fields.name'), align: 'center' },
        { id: '6', label: t('ticketPage.fields.estimatedCost'), align: 'center' },
        { id: '7', label: t('ticketPage.fields.estimatedTime'), align: 'center' },
        { id: '8', label: t('ticketPage.fields.startDate'), align: 'center' },
        { id: '9', label: t('ticketPage.fields.endDate'), align: 'center' },
        { id: '10', label: t('ticketPage.fields.problemDescription'), align: 'center' },
        { id: '11', label: t('ticketPage.fields.status'), align: 'center' },
        { id: '12', label: t('ticketPage.fields.actions'), align: 'center' }
    ]

    const filteredTableHead = useMemo(() => {
        if (user?.role === ROLES.CLIENT) {
            return tableHead.filter((column) => column.id !== '11')
        }

        return tableHead
    }, [user])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
        setPage(1)
    }

    const addAction = useActionPermission(ROLE_PERMISSION.TICKET, ROLE_PERMISSION.ADD_TICKET)

    return (
        <Stack alignItems="center">
            <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                <CustomTableHeader
                    searchQuery={search}
                    title={t('ticketPage.listProduct')}
                    buttonTitle={hasAccess ? t('ticketPage.addProduct') : ''}
                    onClick={() => handleModalCreateProduct(true)}
                    showButton={hasAccess}
                    addPermission={addAction}
                    onSearch={handleSearch}
                    dataFilter={dataFilter}
                    setFilters={setFilters}
                />

                <CustomTableContainer
                    rowCount={products.length}
                    headCells={filteredTableHead}
                    data={products}
                    CustomRow={ProductRows}
                    title={'ticketPage'}
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
            {openCreateProductModal && (
                <CreateProductView open={openCreateProductModal} onClose={() => handleModalCreateProduct(false)} />
            )}
        </Stack>
    )
}
export default ProductsListView
