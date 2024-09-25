import { TableCell, TableRow, useTheme } from '@mui/material'
import { ICustomer } from '../../interfaces/customer'
import CustomLabel from '../reusable/hook-form/custom-label'
import { useTranslation } from 'react-i18next'
import { ImgPaths } from '../../utils/image-paths'
import Image from '../reusable/reusableImage'
import { useState } from 'react'
import EditCustomer from './edit-customer'
import { COMMON } from '../../theme/palette'
import { useActionPermission } from '../auth/utils/commonRole'
import { ROLE_PERMISSION } from '../../utils/constants'

type CustomersListProps = {
    rowData: ICustomer
}
const CustomerRows = ({ rowData }: CustomersListProps) => {
    const { name, phone, email, isActive } = rowData
    const theme = useTheme()
    const { t } = useTranslation()
    const [openEditModal, setOpenEdiModal] = useState<boolean>(false)

    const handleModalEdit = (value: boolean) => {
        setOpenEdiModal(value)
    }
    const editAction = useActionPermission(ROLE_PERMISSION.CUSTOMER, ROLE_PERMISSION.EDIT_CUSTOMER)

    return (
        <>
            <TableRow>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{phone}</TableCell>
                <TableCell align="center">{email}</TableCell>
                <TableCell align="center">
                    <CustomLabel
                        backgroundColor={isActive ? COMMON.common.primary : theme.palette.primary.main}
                        label={isActive ? t('customerListPage.action.active') : t('customerListPage.action.inactive')}
                    />
                </TableCell>
                <TableCell align="center">
                    {editAction && (
                        <Image
                            alt={t('customerListPage.editModal.title')}
                            onClick={() => handleModalEdit(true)}
                            sx={{ cursor: 'pointer' }}
                            src={ImgPaths.edit_icon}
                        />
                    )}
                </TableCell>
            </TableRow>
            {openEditModal && <EditCustomer customer={rowData} open={openEditModal} onClose={() => handleModalEdit(false)} />}
        </>
    )
}
export default CustomerRows
