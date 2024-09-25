import { TableCell, TableRow, useTheme } from '@mui/material'
import CustomLabel from '../reusable/hook-form/custom-label'
import { useTranslation } from 'react-i18next'
import { ImgPaths } from '../../utils/image-paths'
import Image from '../reusable/reusableImage'
import { useState } from 'react'
import { IEmployee } from '../../interfaces/employee'
import DeleteEmployee from './delete-employee'
import EditEmployee from './edit-employee'
import { COMMON } from '../../theme/palette'
import { useActionPermission } from '../auth/utils/commonRole'
import { ROLE_PERMISSION } from '../../utils/constants'

type EmployeeListProps = {
    rowData: IEmployee
}
const EmployeeRows = ({ rowData }: EmployeeListProps) => {
    const { id, name, email, phone, role, isActive } = rowData
    const theme = useTheme()
    const { t } = useTranslation()
    const [openEditModal, setOpenEdiModal] = useState<boolean>(false)
    const [openDeleteModal, setDeleteModal] = useState<boolean>(false)

    const handleModalEdit = (value: boolean) => {
        setOpenEdiModal(value)
    }
    const handleModalDelete = (value: boolean) => {
        setDeleteModal(value)
    }
    const editAction = useActionPermission(ROLE_PERMISSION.EMPLOYEE, ROLE_PERMISSION.EDIT_EMPLOYEE)
    const deleteAction = useActionPermission(ROLE_PERMISSION.EMPLOYEE, ROLE_PERMISSION.DELETE_EMPLOYEE)

    return (
        <>
            <TableRow>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{email}</TableCell>

                <TableCell align="center">{phone}</TableCell>
                <TableCell align="center">{role[0]?.name}</TableCell>
                <TableCell align="center">
                    <CustomLabel
                        backgroundColor={isActive ? COMMON.common.primary : theme.palette.primary.main}
                        label={isActive ? t('employee.active') : t('employee.inactive')}
                    />
                </TableCell>
                <TableCell align="center" sx={{ gap: 2 }}>
                    {editAction && (
                        <Image
                            alt={t('employee.editModal')}
                            onClick={() => handleModalEdit(true)}
                            src={ImgPaths.edit_icon}
                            sx={{ cursor: 'pointer', pr: 1 }}
                        />
                    )}
                    {deleteAction && (
                        <Image
                            alt={t('employee.deleteEmployee')}
                            onClick={() => handleModalDelete(true)}
                            src={ImgPaths.delete_icon}
                            sx={{ cursor: 'pointer' }}
                        />
                    )}
                </TableCell>
            </TableRow>
            {openEditModal && <EditEmployee employee={rowData} open={openEditModal} onClose={() => handleModalEdit(false)} />}
            {openDeleteModal && <DeleteEmployee open={openDeleteModal} id={id} onClose={() => handleModalDelete(false)} />}
        </>
    )
}
export default EmployeeRows
