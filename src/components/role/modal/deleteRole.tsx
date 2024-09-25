import React from 'react'
import { useTranslation } from 'react-i18next'
import DeleteModal from '../../reusable/customModal/delete-modal'
type PropsRole = {
    open: boolean
    handleClose: () => void
    handleDelete: VoidFunction
}
const DeleteRole = ({ open, handleClose, handleDelete }: PropsRole) => {
    const { t } = useTranslation()
    return (
        <DeleteModal
            open={open}
            handleClose={handleClose}
            onDelete={handleDelete}
            onCancel={handleClose}
            dialogTitle={t('role.delete')}
            dialogContent={'role'}
        />
    )
}

export default DeleteRole
