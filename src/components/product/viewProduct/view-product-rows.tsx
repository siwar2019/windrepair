import { TableCell, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { COMMON } from '../../../theme/palette'
import { TPart } from '../../../interfaces/product/product'
import { currency } from '../../../utils/constants'

type PartsListProps = {
    rowData: TPart
}
const PartRowsView = ({ rowData }: PartsListProps) => {
    const { t } = useTranslation()
    const { name, category, price, garantie } = rowData
    return (
        <TableRow>
            <TableCell align="center">
                <Typography color={COMMON.common.black} fontWeight={600}>
                    {name}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography color={COMMON.common.black} fontWeight={500}>
                    {category ? category : '_'}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography color={COMMON.common.black} fontWeight={500}>
                    {price} {currency}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography color={COMMON.common.black} fontWeight={500}>
                    {garantie === 0 ? '-' : `${garantie} ${t('addPartPage.fields.months')}`}
                </Typography>
            </TableCell>
        </TableRow>
    )
}
export default PartRowsView
