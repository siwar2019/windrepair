import { useTranslation } from 'react-i18next'
import { Table, TableBody, TableContainer, TableRow, Typography, useTheme } from '@mui/material'
import CustomModal from '../../reusable/customModal/custom-modal'
import { useDetailsRole } from '../../../hooks/role.hook'
import { useMemo } from 'react'
import { IRoles } from '../../../interfaces/role'
import { IPermission, IPrivileges } from '../../../interfaces/permission'
import EmptyTable from '../../reusable/table/empty-table'
import { BorderedTableCell } from '../../../styles/role.style'

type DetailsRole = {
    open: boolean
    onClose: () => void
    roleId: number
}
const DetailsRole = ({ open, onClose, roleId }: DetailsRole) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { data } = useDetailsRole(roleId)
    const roleDetails = useMemo(() => {
        return data?.data ?? []
    }, [data])

    const filteredRoles = useMemo(() => {
        return roleDetails.filter((role: IRoles) => role.buttons?.some((button: IPrivileges) => button.checked))
    }, [roleDetails])
    
    const filteredButtonsChecked = (buttons: IPrivileges[]) => {
        return buttons?.filter((button) => button.checked) 
    }

    const maxButtons = useMemo(() => {
        return Math.max(...filteredRoles.map((role: IRoles) => filteredButtonsChecked(role.buttons).length), 0)
    }, [filteredRoles])
    return (
        <CustomModal open={open} handleClose={onClose} title={t('detailRole.detailModal.title')} data-testid="editCustomer">
            <TableContainer>
                <Table
                    sx={{
                        borderRadius: '12px 12px 0 0',
                        overflow: 'hidden',
                        borderCollapse: 'separate',
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}
                >
                    <TableBody>
                        {filteredRoles.length === 0 ? (
                            <EmptyTable title="detailRole" />
                        ) : (
                            filteredRoles.map((role: IPermission) => (
                                <TableRow key={role.id}>
                                    <BorderedTableCell>
                                        <Typography variant="h4" color={theme.palette.primary.main}>
                                            {role.name}
                                        </Typography>
                                    </BorderedTableCell>

                                    {filteredButtonsChecked(role.buttons).map((button: IPrivileges) => (
                                        <BorderedTableCell
                                            align="left"
                                            key={button.id}
                                            sx={{ borderBottom: `1px solid ${theme.palette.grey[200]}` }}
                                        >
                                                {button.name}
                                        </BorderedTableCell>
                                    ))}
                                    {Array.from({ length: maxButtons - filteredButtonsChecked(role.buttons).length }).map((_, index) => (
                                        <BorderedTableCell key={`empty-${index}`} />
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomModal>
    )
}
export default DetailsRole
