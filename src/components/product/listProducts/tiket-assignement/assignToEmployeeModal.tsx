import { Box, Typography, useTheme } from '@mui/material'
import CustomModal from '../../../reusable/customModal/custom-modal'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetEmployeeList } from '../../../../hooks/employee.hook'
import { ROLES } from '../../../../utils/constants'
import useCustomPaginationTable from '../../../reusable/hook-form/custom-table'
import { IEmployee } from '../../../../interfaces/employee'
import CustomButton from '../../../reusable/hook-form/custom-button'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import FormProvider from '../../../reusable/hook-form/form-provider'
import CustomSelect from '../../../reusable/hook-form/custom-select'
import React from 'react'

interface ISelectEmployee {
    openModal: boolean
    closeModal: () => void
    onClickMethod: (employeeId: number) => void
}

const AssignToEmployee = ({ openModal, closeModal, onClickMethod }: ISelectEmployee) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const theme = useTheme()

    const [error, setError] = React.useState('')

    const { data } = useGetEmployeeList({
        typeUser: ROLES.EMPLOYEE,
 
    })

    const listEmployee = useMemo(() => {
        return (
            data?.data.list.map((employee: IEmployee) => ({
                value: employee.id,
                label: `${employee.name}`
            })) || []
        )
    }, [data])

    const goBack = () => {
        navigate('/product')
        closeModal()
    }

    const defaultValues = {
        employeeId: 0
    }

    const employeeIdSchema = Yup.object().shape({
        employeeId: Yup.number().required(t('productPage.messages.selectOption'))
    })

    const methods = useForm({
        resolver: yupResolver(employeeIdSchema),
        defaultValues,
        mode: 'all'
    })

    const { handleSubmit, reset } = methods

    const onSubmit = handleSubmit(async (values) => {
        if (!values.employeeId) {
            setError(t('productPage.required'))
            return
        }
        return onClickMethod(values.employeeId), closeModal()
    })
    return (
        <CustomModal open={openModal} handleClose={closeModal} title={t('productPage.assignement')}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box display="flex" flexDirection="column" justifyContent="center" pl={20}>
                    <Typography>{t('role.employee')}</Typography>
                    <CustomSelect
                        name="employeeId"
                        options={listEmployee}
                        idSelect="employeeId"
                        idInputLabel="employeeId"
                        placeholder={t('common.selectOption')}
                        sx={{ width: '60%', height: '40%' }}
                    />
                    {error && (
                        <span style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}>{t('productPage.required')}</span>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                    <CustomButton
                        variant="contained"
                        backGroundColor={theme.palette.common.white}
                        textColor={theme.palette.common.black}
                        hoover={false}
                        border={'none'}
                        onClick={goBack}
                        sx={{
                            padding: '1rem',
                            width: '25%',
                            marginRight: '1rem'
                        }}
                    >
                        {t('payment.Back')}
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        data-testid="confirm"
                        backGroundColor={theme.palette.primary.main}
                        textColor={theme.palette.common.white}
                        hoover={false}
                        border={'none'}
                        type="submit"
                        sx={{
                            padding: '1rem',
                            width: '25%'
                        }}
                    >
                        {t('addEmployeeForm.confirm')}
                    </CustomButton>
                </Box>
            </FormProvider>
        </CustomModal>
    )
}

export default AssignToEmployee
