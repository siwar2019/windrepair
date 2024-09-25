import { TableCell, TableRow } from '@mui/material'
import { useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useDeleteRole } from '../../hooks/role.hook'
import { IRoles } from '../../interfaces/role'
import { ImgPaths } from '../../utils/image-paths'
import Toast from '../reusable/custom-toast'
import Image from '../reusable/reusableImage'
import DeleteRole from './modal/deleteRole'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../routes/paths'
import DetailsRole from './modal/detailsRole'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useActionPermission } from '../auth/utils/commonRole'
import { ROLE_PERMISSION } from '../../utils/constants'
type RoleListProps = {
    rowData: IRoles
}
const RoleRows = ({ rowData }: RoleListProps) => {
    const { id, name } = rowData
    const { t } = useTranslation()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [roleIdToDelete, setRoleIdToDelete] = useState(Number)
    const [openDetailModal, setOpenDetailsModal] = useState<boolean>(false)

    const { mutateAsync: removeRole } = useDeleteRole()
    const navigate = useNavigate()

    const handleModalDelete = (id: number) => {
        setRoleIdToDelete(id)
        setOpenDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
        setRoleIdToDelete(Number)
    }
    const deleteRole = useCallback(async () => {
        if (!roleIdToDelete) return

        await removeRole(roleIdToDelete, {
            onSuccess(data, _variables, _context) {
                if (data.status === 200) {
                    Toast({
                        message: t('role.message.deleteRole'),
                        type: 'success'
                    })
                }
            }
        }).catch((data) => {
            Toast({
                message: t(`role.message.${data.message}`),
                type: 'error'
            })
        })

        handleCloseDeleteModal()
    }, [roleIdToDelete, removeRole])
    const handleRedirect = (id: number, name: string) => {
        navigate(paths.app.editRole(id as unknown as string), { state: { name } })
    }

    const handleClickDetails = (value: boolean) => {
        setOpenDetailsModal(value)
    }
    const editAction = useActionPermission(ROLE_PERMISSION.ROLE, ROLE_PERMISSION.EDIT_ROLE)
    const deleteAction = useActionPermission(ROLE_PERMISSION.ROLE, ROLE_PERMISSION.DELETE_ROLE)

    return (
        <>
            <TableRow>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">
                    <ExpandMoreIcon sx={{ cursor: 'pointer' }} onClick={() => handleClickDetails(true)} />
                </TableCell>

                <TableCell align="center" sx={{ gap: 2 }}>
                    {editAction && (
                        <Image
                            alt={t('employee.editModal')}
                            src={ImgPaths.edit_icon}
                            sx={{ cursor: 'pointer', pr: 1 }}
                            onClick={() => handleRedirect(id, name)}
                        />
                    )}
                    {deleteAction && (
                        <Image
                            alt={t('role.deletePermission')}
                            src={ImgPaths.delete_icon}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleModalDelete(id)}
                        />
                    )}
                </TableCell>
            </TableRow>
            {openDetailModal && <DetailsRole roleId={id} open={openDetailModal} onClose={() => handleClickDetails(false)} />}

            <DeleteRole open={openDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={deleteRole} />
        </>
    )
}

export default RoleRows
