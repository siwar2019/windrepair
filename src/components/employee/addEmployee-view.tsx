import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useTranslations } from '../../translation'
import { Box, FormControl, Grid, MenuItem, Select, SelectChangeEvent, useTheme } from '@mui/material'
import CustomButton from '../reusable/hook-form/custom-button'
import { useAddEmployee } from '../../hooks/employee.hook'
import { TAddEmployee } from '../../interfaces/employee'
import Toast from '../reusable/custom-toast'
import { IRoles } from '../../interfaces/role'
import { StyledInputLabel, StyledRoleLabel, StyledTextField } from '../../styles/employee.style'
import { useGetRoles } from '../../hooks/role.hook'
import CustomModal from '../reusable/customModal/custom-modal'
import { useResponsive } from '../../utils/use-responsive'

interface AddEmployeeProps {
    open: boolean
    closeModal: () => void
}

const AddEmployeeView = ({ open, closeModal }: AddEmployeeProps) => {
    const { t } = useTranslations()
    const smUp = useResponsive('up', 'sm')
    const [addRole, setAddRole] = React.useState(false)
    const theme = useTheme()
    const [roleId, setRoleId] = React.useState('')
    const [roleError, setRoleError] = React.useState('') // State for role validation error
    const { mutateAsync: createEmployee, isPending } = useAddEmployee()
    const { data: rolesData } = useGetRoles()
    const handleChange = (event: SelectChangeEvent) => {
        setRoleId(event.target.value as string)
        setRoleError('') // Clear role validation error on change
    }
    const handleClose = () => {
        methods.reset()
        closeModal()
        setRoleId('')
        setRoleError('')
    }
    const addEmployeeSchema = Yup.object().shape({
        email: Yup.string().required(t('addEmployeeForm.errors.mail')).email(t('addEmployeeForm.errors.validEmail')),
        name: Yup.string().required(t('common.name')),
        phone: Yup.string()
            .required(t('addEmployeeForm.errors.phone'))
            .matches(/^\d{8}$/, t('addEmployeeForm.errors.phoneMinLength'))
    })

    const defaultValues = {
        email: '',
        name: '',
        phone: ''
    }

    const methods = useForm({
        resolver: yupResolver(addEmployeeSchema),
        defaultValues,
        mode: 'all'
    })

    const onSubmit = async (values: TAddEmployee) => {
        if (!roleId) {
            setRoleError(t('addEmployeeForm.errors.role'))
            return
        }

        await createEmployee(
            {
                email: values.email,
                name: values.name,
                phone: values.phone,
                roleId: roleId
            },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        Toast({
                            message: t(`addEmployeeForm.messages.${data.data.message}`),
                            type: 'success'
                        })
                        closeModal()
                        methods.reset()
                        setRoleId('')
                    }
                }
            }
        ).catch((data) => {
            Toast({
                message: t(`addEmployeeForm.messages.${data.message}`),
                type: 'error'
            })
        })
    }

    return (
        <Box>
            <CustomModal open={open} handleClose={handleClose} title={t('addEmployeeForm.addEmployee')}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6} item>
                                <StyledInputLabel
                                    htmlFor="component-simple"
                                    sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.6rem' : '0rem' }}
                                >
                                    {t('common.name')}{' '}
                                </StyledInputLabel>
                                <StyledTextField name="name" border="simpleTextField" />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <StyledInputLabel
                                    htmlFor="component-simple"
                                    sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.6rem' : '0rem' }}
                                >
                                    {t('addEmployeeForm.phone')}
                                </StyledInputLabel>
                                <StyledTextField
                                    name="phone"
                                    type="number"
                                    border="simpleTextField"
                                    placeholder={`${t('addEmployeeForm.prefix')}`}
                                />
                            </Grid>

                            <Grid xs={12} sm={6} item>
                                <StyledInputLabel
                                    htmlFor="component-simple"
                                    sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.6rem' : '0rem' }}
                                >
                                    {t('addEmployeeForm.mail')}
                                </StyledInputLabel>
                                <StyledTextField name="email" border="simpleTextField" />
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <FormControl fullWidth>
                                    <StyledRoleLabel
                                        sx={{ paddingBottom: smUp ? '0.2rem' : '0rem', paddingTop: smUp ? '0.45rem' : '0rem' }}
                                    >
                                        {t('addEmployeeForm.roleField')}
                                    </StyledRoleLabel>
                                    <Select
                                        labelId="roleId"
                                        id="roleId"
                                        name="roleId"
                                        value={roleId}
                                        onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-input': { padding: '0.5rem' } }}
                                    >
                                        {rolesData?.data?.length &&
                                            rolesData.data.map((role: IRoles) => (
                                                <MenuItem key={role.id} value={role.id}>
                                                    {role.name}
                                                </MenuItem>
                                            ))}
                                    </Select>

                                    {roleError && (
                                        <span style={{ color: theme.palette.primary.main, fontSize: '0.75rem' }}>{roleError}</span>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <CustomButton
                                variant="contained"
                                data-testid="confirm"
                                backGroundColor={theme.palette.primary.main}
                                textColor={theme.palette.common.white}
                                hoover={false}
                                loading={isPending}
                                border={'none'}
                                type="submit"
                                disabled={addRole}
                                sx={{
                                    padding: '0rem',
                                    width: '40%'
                                }}
                            >
                                {t('addEmployeeForm.confirm')}
                            </CustomButton>
                        </Grid>
                    </form>
                </FormProvider>
            </CustomModal>
        </Box>
    )
}

export default AddEmployeeView
