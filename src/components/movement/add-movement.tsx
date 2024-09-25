import { Grid, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useTranslations } from '../../translation'
import CustomModal from '../reusable/customModal/custom-modal'
import FormProvider from '../reusable/hook-form/form-provider'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as Yup from 'yup'
import React, { useMemo } from 'react'
import { StyledTextField } from '../../styles/employee.style'
import CustomButton from '../reusable/hook-form/custom-button'
import { useTheme } from '@mui/material'
import { useCreateMovement } from '../../hooks/movement/movement.hook'
import useCustomPaginationTable from '../reusable/hook-form/custom-table'
import { useGetFindList } from '../../hooks/fund.hook'
import { TFund } from '../../interfaces/fund'
import Toast from '../reusable/custom-toast'
interface IAddMovement {
    open: boolean
    handleClose: () => void
    id: number
    tiketAmount: number
}
const addMovementSchema = Yup.object().shape({
    value: Yup.number().required(),
    cashRegisterId: Yup.number().required()
})
const AddMovement = ({ open, handleClose, id, tiketAmount }: IAddMovement) => {
    const { t } = useTranslations()
    const defaultValues = {
        value: tiketAmount,
        cashRegisterId: 0
    }
    const [cashRegisterId, setCashRegisterId] = React.useState<number>(0)
    const { mutateAsync: createMovement, isPending } = useCreateMovement()
    const [error, setError] = React.useState('')

    const theme = useTheme()
    const methods = useForm({
        resolver: yupResolver(addMovementSchema),
        defaultValues,
        mode: 'all'
    })
    const handleChange = (event: SelectChangeEvent) => {
        setCashRegisterId(Number(event.target.value))
    }

    const { rowsPerPage, page } = useCustomPaginationTable({ defaultRowsPerPage: 5 })
    const { data } = useGetFindList({
        page,
        itemsPerPage: rowsPerPage,
        name: '',
        bankAccount: '',
        initialValue: 0,
        status: true,
        isMain:false
    })
    const fundList = useMemo(() => {
        return data?.data?.list ?? []
    }, [data])
    const { handleSubmit, reset } = methods
    const onSubmit = handleSubmit(async (values) => {
        if (!cashRegisterId) {
            setError(t('movement.required'))
            return
        }
        return (
            await createMovement({
                value: values.value,
                cashRegisterId: cashRegisterId as number,
                invoiceId: id
            }),
            Toast({
                message: t(`movement.addedSuccess`),
                type: 'success'
            }),
            handleClose(),
            setError(''),
            reset()
        )
    })
    return (
        <CustomModal open={open} handleClose={handleClose} title={t('movement.title')} maxWidth={'30%'}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{t('movement.amount')}</Typography>
                            <StyledTextField border="simpleTextField" variant="outlined" name="value" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4">{t('movement.fund')}</Typography>
                            <Select
                                fullWidth
                                labelId="cashRegisterId"
                                id="cashRegisterId"
                                name="cashRegisterId"
                                value={cashRegisterId.toString()}
                                onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-input': { padding: '0.6rem' } }}
                            >
                                {fundList.map((fund: TFund) => (
                                    <MenuItem key={fund.id} value={fund.id}>
                                        {fund.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {error && (
                                <span style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}>{t('movement.required')}</span>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <CustomButton
                            variant="contained"
                            data-testid="loginButton"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border={'none'}
                            type="submit"
                            sx={{
                                padding: '0rem',
                                width: '40%'
                            }}
                        >
                            {t('addEmployeeForm.confirm')}
                        </CustomButton>
                    </Grid>
                </Stack>
            </FormProvider>
        </CustomModal>
    )
}
export default AddMovement
