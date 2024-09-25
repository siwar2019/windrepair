import { TableCell, TableRow, Typography } from '@mui/material'
import { THistory } from '../../../interfaces/history'
import { COMMON } from '../../../theme/palette'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

type HistoryListProps = {
    rowData: THistory
    isLastRow: boolean
}
const HistoryRows = ({ rowData, isLastRow }: HistoryListProps) => {
    const { status, createdAt } = rowData
    const { t } = useTranslation()
    const formattedDate = moment(createdAt).format('DD-MM-YYYY')

    return (
        <>
            <TableRow sx={isLastRow ? { borderBottom: '2px solid', borderBottomColor: COMMON.common.black } : {}}>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={600}>
                        {t(`ticketPage.fields.${status}`)}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {formattedDate}
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    )
}
export default HistoryRows
