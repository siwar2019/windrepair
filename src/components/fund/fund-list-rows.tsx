import { TableCell, TableRow } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ImgPaths } from '../../utils/image-paths'
import Image from '../reusable/reusableImage'
import { useState } from 'react'
import { TFund } from '../../interfaces/fund'
import UpdateFund from './updateFund'
import DeleteFund from './deleteFund-view'
import { handleRedirect } from '../../utils/redirect'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../routes/paths'
import { ROLE_PERMISSION } from '../../utils/constants'
import { useActionPermission } from '../auth/utils/commonRole'
import Toast from '../reusable/custom-toast'
import { useUpdateFund } from '../../hooks/fund.hook'
import UpdateModal from '../reusable/customModal/update-modal'

type FundListProps = {
    rowData: TFund
}
const FundRows = ({ rowData }: FundListProps) => {
    const { id, name, bankAccount, initialValue, status, main } = rowData
    const { t } = useTranslation()
    const [openEditModal, setOpenEdiModal] = useState<boolean>(false)
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [openConfirmStatus, setOpenconfirmStatus] = useState<boolean>(false)
    const navigate = useNavigate()
    const { mutateAsync: updateFund, isPending } = useUpdateFund()

    const handleModalEdit = (value: boolean) => {
        setOpenEdiModal(value)
    }
    const handleModalDelete = (value: boolean) => {
        setDeleteModal(value)
    }
    const handleClose = () => {
        setDeleteModal(false)
        setOpenconfirmStatus(false)
    }
    const changeStatus = () => {
        setOpenconfirmStatus(true)
    }
    const handleConfirm = async () => {
        try {
            let booleanStatus: boolean | undefined
            if (status === 'true') {
                booleanStatus = true
            } else if (status === 'false') {
                booleanStatus = false
            }

            await updateFund(
                {
                    id: id,

                    status: !status
                },
                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t(`fundList.cashRegisterUpdatedSuccessfully`),
                                type: 'success'
                            })
                        }
                    }
                }
            )
            handleClose()
        } catch (_err) {
            Toast({
                message: t(`fundList.error`),
                type: 'error'
            })
        }
    }

    const editAction = useActionPermission(ROLE_PERMISSION.FUND, ROLE_PERMISSION.EDIT_FUND)
    const deleteAction = useActionPermission(ROLE_PERMISSION.FUND, ROLE_PERMISSION.DELETE_FUND)
    const viewDetailsAction = useActionPermission(ROLE_PERMISSION.FUND, ROLE_PERMISSION.VIEW_DETAILS_FUND)

    return (
        <>
            <TableRow>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{bankAccount}</TableCell>

                <TableCell align="center">{initialValue}</TableCell>
                <TableCell align="center">
                    <Image
                        sx={{ cursor: main ? 'default' : 'pointer' }}
                        src={status ? ImgPaths.isOpen : ImgPaths.isClosed}
                        onClick={() => {
                            if (!main) {
                                changeStatus()
                            }
                        }}
                    />
                </TableCell>
                <TableCell align="center" sx={{ gap: 2 }}>
                    {!main && (
                        <>
                            {editAction && (
                                <Image
                                    onClick={() => handleModalEdit(true)}
                                    src={ImgPaths.edit_icon}
                                    sx={{ cursor: 'pointer', pr: 1 }}
                                />
                            )}
                            {deleteAction && (
                                <Image onClick={() => handleModalDelete(true)} src={ImgPaths.delete_icon} sx={{ cursor: 'pointer' }} />
                            )}
                        </>
                    )}
                    {viewDetailsAction && (
                        <Image
                            onClick={() => {
                                if (id !== undefined) {
                                    handleRedirect(navigate, paths.app.details(id.toString()))
                                }
                            }}
                            src={ImgPaths.details}
                            sx={{ cursor: 'pointer', ml: 1 }}
                        />
                    )}
                </TableCell>
            </TableRow>
            {openEditModal && <UpdateFund fund={rowData} open={openEditModal} onClose={() => handleModalEdit(false)} />}
            {openDeleteModal && <DeleteFund open={openDeleteModal} handleClose={handleClose} id={id} />}
            {openConfirmStatus && (
                <UpdateModal open={openConfirmStatus} close={handleClose} description="status" onConfirm={handleConfirm} />
            )}
        </>
    )
}
export default FundRows
