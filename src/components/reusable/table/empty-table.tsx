import { TableCell, TableRow } from '@mui/material'
import { useTranslation } from 'react-i18next'

type EmptyTableProps = {
    title: string
}
const EmptyTable = ({ title }: EmptyTableProps) => {
    const { t } = useTranslation()
    return (
        <TableRow>
            <TableCell align="center" colSpan={12}>
                {t(`${title}.noData`)}
            </TableCell>
        </TableRow>
    )
}

export default EmptyTable
