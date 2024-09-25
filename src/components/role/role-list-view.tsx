import { Box, Card, Stack, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import CustomTableHeader from '../reusable/table/custom-table-header'
import CustomTableContainer from '../reusable/table/custom-table-container'
import { THeadCell } from '../../interfaces/table'
import RoleRows from './role-list-rows'
import { useGetRoles } from '../../hooks/role.hook'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../routes/paths'
import { secondaryFont } from '../../theme/typography'
import { Loading } from '../reusable/loading'
import { IRole } from '../../interfaces/employee'
import { ROLE_PERMISSION } from '../../utils/constants'
import { useActionPermission } from '../auth/utils/commonRole'

const RoleView = () => {
    const { t } = useTranslation()
    const { data: rolesData } = useGetRoles()
    const [search, setSearch] = React.useState('')
    const addAction = useActionPermission(ROLE_PERMISSION.ROLE, ROLE_PERMISSION.ADD_ROLE)

    const navigate = useNavigate()
    const theme = useTheme()
    const tableHead: THeadCell[] = [
        {
            id: '1',
            label: t('Name Role'),
            align: 'center'
        },

        { id: '2', label: t('Permissions'), align: 'center' },
        { id: '3', label: t('Actions'), align: 'center' }
    ]
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(event.target.value)
    }
    const roleFilter = (rolesData: IRole[], search: string) => {
        if (search) {
            rolesData = rolesData.filter((role) => role.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        }
        return rolesData
    }

    const filteredRoles = useMemo(() => roleFilter(rolesData?.data || [], search), [rolesData, search])
    const handleRedirect = () => {
        navigate(paths.app.addRole)
    }
    if (!rolesData) {
        return <Loading />
    }
    const handleBack = () => {
        navigate(paths.app.role)
    }

    return (
        <>
            <Stack alignItems="center">
                <Box sx={{ width: '85%', height: '100%' }}>
                    <Typography variant="h3" mb={3} sx={{ fontFamily: secondaryFont }}>
                        {t('role.roleTitle')}
                    </Typography>
                </Box>

                <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                    <CustomTableHeader
                        onSearch={handleSearch}
                        buttonTitle={t('role.addRole')}
                        title={t('role.list')}
                        onClick={handleRedirect}
                        addPermission={addAction}
                    />
                    <CustomTableContainer headCells={tableHead} CustomRow={RoleRows} title={'role'} data={filteredRoles || []} />
                </Card>
            </Stack>
        </>
    )
}

export default RoleView
