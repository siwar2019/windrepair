import { Box, Card, Stack, TableCellProps, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'

import { useMemo, useState } from 'react'
import useCustomPaginationTable from '../reusable/hook-form/custom-table'
import { useGetCustomerList } from '../../hooks/customer.hook'
import { ROLES } from '../../utils/constants'
import { ICustomer } from '../../interfaces/customer'
import { THeadCell } from '../../interfaces/table'
import CustomTableHeader from '../reusable/table/custom-table-header'
import CustomTableContainer from '../reusable/table/custom-table-container'
import CustomerRows from '../customer/customers-list-rows'
import CustomPagination from '../reusable/customPagination/custom-pagination'
import SettingsRows from './settings-list-rows'
import { useGetSettingList } from '../../hooks/settings.hook'
import AddSettings from './add-settings'
import { secondaryFont } from '../../theme/typography'
import { useNavigate } from 'react-router-dom'
import { IAddSetting } from '../../interfaces/settings'

const ListSettings = () => {
    const {
        rowsPerPage,
        page,

        handleChangePage
    } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { t } = useTranslation()
    const [search, setSearch] = useState('')
    const [addNewApi, setAddNewApi] = useState(false)
    const navigate = useNavigate()
    const { data } = useGetSettingList()
    const handleAddApi = () => {
        setAddNewApi(true)
    }
    const closeModal = () => {
        setAddNewApi(false)
    }
    const handleTest = () => {
        navigate('/test-settings')
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
    }
    const settingsList = useMemo(() => {
        return data?.data ?? []
    }, [data])
    const settingsFilter = (settingsList: IAddSetting[], search: string) => {
        if (search) {
            settingsList = settingsList.filter(
                (setting) =>
                    setting.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    setting.endPointProd.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    setting.typeEndPoint.toLowerCase().indexOf(search.toLowerCase()) !== -1 
            )
        }
        return settingsList
    }
    const filteredSettings = useMemo(() => settingsFilter(settingsList, search), [settingsList, search])

    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('settingsPage.header.name'),
            align: 'center'
        },
        {
            id: '2',
            label: t('settingsPage.header.endPoint'),
            align: 'center'
        },
        { id: '3', label: t('settingsPage.header.typeEndPoint'), align: 'center' },
        { id: '4', label: t('settingsPage.header.params'), align: 'center' }
    ]
    return (
        <Stack alignItems="center">
            <Box sx={{ width: '85%', height: '100%' }}>
                <Typography variant="h3" mb={3} sx={{ fontFamily: secondaryFont }}>
                    {t('settingsPage.title')}
                </Typography>
            </Box>
            <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                <CustomTableHeader
                    searchQuery={search}
                    onSearch={handleSearch}
                    title={t('settingsPage.subTitle')}
                    showButton={true}
                    addPermission={true}
                    extraButton={true}
                    buttonTitle={t('settingsPage.buttonTitle')}
                    extraButtonTitle={t('settingsPage.tester')}
                    onClick={handleAddApi}
                    onClickFunction={handleTest}
                />

                <CustomTableContainer
                    rowCount={filteredSettings.length}
                    headCells={tableHead}
                    data={filteredSettings}
                    CustomRow={SettingsRows}
                    title={'settingsPage'}
                />

                {data && (
                    <Stack width="100%" alignItems="flex-end" mt={2}>
                        <CustomPagination
                            totalCount={data?.data?.total}
                            itemsPerPage={rowsPerPage}
                            page={page}
                            handleChangePage={handleChangePage}
                            currentPage={page}
                        />
                    </Stack>
                )}
            </Card>
            {addNewApi && <AddSettings open={addNewApi} onClose={closeModal} />}
        </Stack>
    )
}
export default ListSettings
