import { useTranslations } from '../../../translation'
import DeleteModal from '../../reusable/customModal/delete-modal'

type DeleteProductProps = {
    open: boolean
    onClose: () => void
    handleDelete: VoidFunction
}
const DeleteProduct = ({ open, onClose, handleDelete }: DeleteProductProps) => {
    const { t } = useTranslations()
    return (
        <DeleteModal
            open={open}
            handleClose={onClose}
            onDelete={handleDelete}
            onCancel={onClose}
            dialogTitle={t('ticketPage.deleteProduct')}
            dialogContent={'Ticket'}
        />
    )
}
export default DeleteProduct
