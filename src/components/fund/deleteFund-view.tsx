import DeleteModal from '../reusable/customModal/delete-modal'
import { useTranslations } from '../../translation'
import { useDeleteFund } from '../../hooks/fund.hook'
interface IDeleteProps {
    open: boolean
    handleClose: () => void
    id?: number
}
const DeleteFund = ({ open, handleClose, id }: IDeleteProps) => {
    const { t } = useTranslations()
    const { mutateAsync: removeFund } = useDeleteFund()
    const onDelete = () => {
        removeFund(id)
        handleClose()
    }
    return (
        <DeleteModal
            open={open}
            handleClose={handleClose}
            onDelete={onDelete}
            onCancel={handleClose}
            dialogTitle={t('fundList.deleteFund')}
            dialogContent={'Fund'}
        ></DeleteModal>
    )
}
export default DeleteFund
