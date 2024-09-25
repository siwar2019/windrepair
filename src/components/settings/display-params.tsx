import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import CustomModal from '../reusable/customModal/custom-modal'
import { StyledTableHead, StyledTableCell } from '../../styles/table-head.style'
import { useTranslations } from '../../translation'
import { IParamsSettings } from '../../interfaces/settings'

export interface IParamsInterface {
    data: IParamsSettings[]
    open: boolean
    closeModal: () => void
}
const DisplayParams = ({ data, open, closeModal }: IParamsInterface) => {
    const { t } = useTranslations()
    const headCells = [t('settingsPage.detailsParams.name'), t('settingsPage.detailsParams.type')]

    return (
        <CustomModal open={open} handleClose={closeModal} title={t('settingsPage.titleDetailsParam')}>
            <TableContainer>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <StyledTableCell align="center">{headCell}</StyledTableCell>
                            ))}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((value) => (
                                <TableRow key={value.id}>
                                    <TableCell align="center">{value.name}</TableCell>
                                    <TableCell align="center">{value.type}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell align="center" colSpan={12}>
                                    {t(`settingsPage.noDataParams`)}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomModal>
    )
}
export default DisplayParams
