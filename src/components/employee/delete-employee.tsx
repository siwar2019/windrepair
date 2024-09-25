import { Box, DialogContent } from '@mui/material'
import DeleteModal from '../reusable/customModal/delete-modal'
import { IEmployee } from '../../interfaces/employee'
import { useTranslations } from '../../translation'
import { useDeleteEmployee } from '../../hooks/employee.hook'
import Toast from '../reusable/custom-toast'
type DeleteEmployeeProps = {
    open: boolean
    onClose: () => void
    id: number
}
const DeleteEmployee = ({ open, onClose, id }: DeleteEmployeeProps) => {
    const { t } = useTranslations()
    const { mutateAsync: removeEmployee } = useDeleteEmployee()
    const deleteEmployee = async () => {
        await removeEmployee(id, {
            onSuccess(data, _variables, _context) {
                if (data.status === 200) {
                    Toast({
                        message: t('employee.messages.deletedSuccess'),
                        type: 'success'
                    })
                }
            }
        }).catch((data) => {
            Toast({
                message: t(`employee.messages.${data.message}`),
                type: 'error'
            })
        })
        onClose()
    }
    const cancelDeleteEmployee = () => {
        onClose()
    }
    return (
        <DeleteModal
            open={open}
            handleClose={onClose}
            onDelete={deleteEmployee}
            onCancel={cancelDeleteEmployee}
            dialogTitle={t('employee.deleteEmployee')}
            dialogContent={'employee'}
        ></DeleteModal>
    )
}
export default DeleteEmployee
