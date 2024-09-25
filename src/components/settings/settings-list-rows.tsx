import { IconButton, TableCell, TableRow, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useActionPermission } from '../auth/utils/commonRole'
import { ROLE_PERMISSION } from '../../utils/constants'
import { IListSettings } from '../../interfaces/settings'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DisplayParams from './display-params'
type CustomersListProps = {
    rowData: IListSettings
}

const SettingsRows = ({ rowData }: CustomersListProps) => {
    const { name, endPointProd, typeEndPoint, paramsSettings } = rowData
    const [details, setDetails] = useState(false)
    const openDetails = () => {
        setDetails(true)
    }
    const closeDetails = () => {
        setDetails(false)
    }
    const theme = useTheme()

    const editAction = useActionPermission(ROLE_PERMISSION.CUSTOMER, ROLE_PERMISSION.EDIT_CUSTOMER)

    return (
        <>
            <TableRow>
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{endPointProd}</TableCell>

                <TableCell align="center">{typeEndPoint}</TableCell>
                <TableCell align="center">
                    <IconButton onClick={openDetails}>
                        <KeyboardArrowDownIcon sx={{ color: theme.palette.common.black }} />
                    </IconButton>
                </TableCell>
                <DisplayParams data={paramsSettings} open={details} closeModal={closeDetails} />
            </TableRow>
        </>
    )
}
export default SettingsRows
