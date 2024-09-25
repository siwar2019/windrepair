import { TableCell, TableRow, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { COMMON } from '../../../../theme/palette'
import Image from '../../../reusable/reusableImage'
import { ImgPaths } from '../../../../utils/image-paths'
import { ICreateProduct, TEditProductForm, TPart } from '../../../../interfaces/product/product'
import { currency } from '../../../../utils/constants'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import CheckIcon from '@mui/icons-material/Check'
type PartsListProps = {
    rowData: TPart
    index: number
    removePart: (index: number) => void
    fromTicketDetails: boolean
    isLastRow: boolean
    methodsCreate?: UseFormReturn<ICreateProduct>
    methodsEdit?: UseFormReturn<TEditProductForm>
}
const PartRows = ({
    rowData,
    removePart,
    index,
    fromTicketDetails = false,
    isLastRow,
    methodsCreate,
    methodsEdit
}: PartsListProps) => {
    const { t } = useTranslation()
    const { name, category, price, garantie } = rowData
    const [editPrice, setEditPrice] = useState<boolean>(false)
    const [newPrice, setNewPrice] = useState<number>(price)
    const handleSaveClick = () => {
        if (methodsCreate) {
            const parts = methodsCreate.getValues('parts')
            if (parts) {
                const indexPart = parts.findIndex((part) => part.id === rowData.id)
                if (indexPart !== -1) {
                    const updatedParts = [...parts]
                    updatedParts[indexPart] = { ...rowData, price: newPrice }

                    methodsCreate.setValue('parts', updatedParts)
                }
            }
        }

        if (methodsEdit) {
            const parts = methodsEdit.getValues('parts') || []
            const indexPart = parts.findIndex((part) => part.id === rowData.id)

            if (indexPart !== -1) {
                const updatedParts = [...parts]
                updatedParts[indexPart] = { ...rowData, price: newPrice }

                methodsEdit.setValue('parts', updatedParts)
            }
        }
        setEditPrice(false)
    }
    const handleEditClick = () => {
        setEditPrice(true)
    }
    const handleChange = (event: any) => {
        setNewPrice(event.target.value)
    }

    return (
        <>
            <TableRow sx={isLastRow ? { borderBottom: '2px solid', borderBottomColor: COMMON.common.black } : {}}>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={600}>
                        {name}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {category || '_'}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    {editPrice ? (
                        <TextField type="number" value={newPrice} onChange={handleChange} />
                    ) : (
                        <Typography color={COMMON.common.black} fontWeight={500}>
                            {rowData.price} {currency}
                        </Typography>
                    )}
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {garantie !== 0 ? `${garantie}  ${t('addPartPage.fields.months')}` : '-'}
                    </Typography>
                </TableCell>
                {!fromTicketDetails && index !== 0 && (
                    <TableCell align="center">
                        <Image
                            alt={t('ticketPage.removeModal.title')}
                            width="1rem"
                            src={ImgPaths.delete_icon}
                            onClick={() => {
                                removePart(index)
                            }}
                            sx={{ cursor: 'pointer' }}
                        />
                    </TableCell>
                )}
                {index === 0 && (
                    <TableCell align="center">
                        {editPrice ? (
                            <CheckIcon sx={{ cursor: 'pointer', color: COMMON.common.black }} onClick={handleSaveClick} />
                        ) : (
                            <Image
                                src={ImgPaths.edit_icon}
                                sx={{ cursor: 'pointer', color: COMMON.common.black }}
                                onClick={handleEditClick}
                            />
                        )}
                    </TableCell>
                )}
            </TableRow>
        </>
    )
}
export default PartRows
