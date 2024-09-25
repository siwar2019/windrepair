import CustomModal from '../reusable/customModal/custom-modal'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Toast from '../reusable/custom-toast'
import { Grid, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomButton from '../reusable/hook-form/custom-button'
import { IEmployee } from '../../interfaces/employee'
import { TextFieldStyled } from '../../styles/employee.style'
import { useGetRoles } from '../../hooks/role.hook'
import { IRoles } from '../../interfaces/role'
import React from 'react'
import { useEditEmployee } from '../../hooks/employee.hook'
type EditEmployeeProps = {
    employee: IEmployee
    open: boolean
    onClose: () => void
}
const EditEmployee = ({ employee, open, onClose }: EditEmployeeProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const [roleError, setRoleError] = React.useState('')
    const { id, name, phone, email, role } = employee
    const { mutateAsync: editEmployee, isPending } = useEditEmployee()
    const { data: rolesData } = useGetRoles()
    const [roleId, setRoleId] = React.useState(String(role[0]?.id))

    const editEmployeeSchema = Yup.object().shape({
        name: Yup.string().required(t('common.name')),
        phone: Yup.string()
            .required(t('auth.registerForm.errors.phoneRequired'))
            .matches(/^\d{8}$/, t('addEmployeeForm.errors.phoneMinLength')),
        email: Yup.string().required(t('auth.registerForm.errors.email')).email(t('auth.registerForm.errors.validEmail')),
        role: Yup.string().required()
    })
    const handleCloseModal = () => {
        onClose()
        methods.reset()
    }
    const handleChange = (event: SelectChangeEvent) => {
        setRoleId(event.target.value as string)

        setRoleError('')
    }
    const defaultValues = {
        name: name,
        phone: phone,
        email: email,
        role: role[0]?.name
    }

    const methods = useForm({
        resolver: yupResolver(editEmployeeSchema),
        mode: 'all',
        defaultValues
    })

    const onSubmit = async () => {
        const formData = methods.getValues()
        if (!roleId) {
            setRoleError(t('addEmployeeForm.errors.role'))
            return
        }
        try {
            const data = await editEmployee(
                {
                    id: id,
                    roleId: roleId,
                    ...formData
                },
                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t(`employee.successEdit`),
                                type: 'success'
                            })
                        }
                    }
                }
            ).catch((data) => {
                Toast({
                    message: t(`addEmployeeForm.messages.${data.message}`),
                    type: 'error'
                })
            })
            onClose()
        } catch (_err) {
            Toast({
                message: t(`employee.messages.error`),
                type: 'error'
            })
        }
    }

    return (
        <CustomModal open={open} handleClose={handleCloseModal} title={t('employee.editModal')} data-testid="editEmployee">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Grid container item flexDirection="row" pt={5} spacing={2} justifyContent="center">
                        <Grid item md={6} xs={12}>
                            <Typography>{t('common.name')}</Typography>
                            <TextFieldStyled name="name" border="simpleTextField" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography>{t('customerListPage.email')}</Typography>
                            <TextFieldStyled name="email" border="simpleTextField" />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Typography>{t('customerListPage.phone')}</Typography>
                            <TextFieldStyled type="number" name="phone" border="simpleTextField" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Typography>{t('customerListPage.role')}</Typography>

                            <Select
                                fullWidth
                                labelId="roleId"
                                id="roleId"
                                value={roleId}
                                onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-input': { padding: '0.45rem' } }}
                            >
                                {rolesData?.data?.length &&
                                    rolesData.data.map((role: IRoles) => (
                                        <MenuItem key={role.id} value={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    ))}
                            </Select>

                            {roleError && <span style={{ color: theme.palette.primary.main, fontSize: '0.75rem' }}>{roleError}</span>}
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" pt={5}>
                        <CustomButton
                            onClick={onClose}
                            backGroundColor={theme.palette.common.white}
                            textColor={theme.palette.common.black}
                            variant={'text'}
                            hoover={true}
                            border={theme.palette.common.white}
                            sx={{ width: '9rem' }}
                        >
                            {t('customerListPage.action.cancel')}
                        </CustomButton>

                        <CustomButton
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            variant={'text'}
                            hoover={false}
                            border="2px solid red"
                            sx={{ width: '9rem' }}
                            loading={isPending}
                            type="submit"
                        >
                            {t('customerListPage.action.save')}
                        </CustomButton>
                    </Stack>
                </form>
            </FormProvider>
        </CustomModal>
    )
}
export default EditEmployee
