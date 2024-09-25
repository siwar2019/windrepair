import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
    Box,
    Card,
    Checkbox,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Typography,
    useTheme
} from '@mui/material'
import { useTranslations } from '../../translation'
import { useAddNewRole } from '../../hooks/role.hook'
import { IAddRole } from '../../interfaces/role'
import Toast from '../reusable/custom-toast'
import { paths } from '../../routes/paths'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../reusable/hook-form/custom-button'
import { useGetMenuPermission } from '../../hooks/menu.hook'
import { useEffect, useMemo, useState } from 'react'
import { IPermission, IPrivileges } from '../../interfaces/permission'
import { StyledTextField } from '../../styles/employee.style'
import { BorderedTableCell } from '../../styles/role.style'
import { grey } from '../../theme/palette'
import { secondaryFont } from '../../theme/typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const AddRolePage = () => {
    const { t } = useTranslations()
    const theme = useTheme()
    const { mutateAsync: createNewRole } = useAddNewRole()
    const navigate = useNavigate()

    const { data } = useGetMenuPermission()
    const permissionList = useMemo(() => {
        return data?.data ?? []
    }, [data])

    const [copiedPermissionList, setCopiedPermissionList] = useState<IPermission[]>([])

    useEffect(() => {
        setCopiedPermissionList(permissionList)
    }, [permissionList])

    const Schema = Yup.object().shape({
        name: Yup.string().required(t('role.roleRequired')),
        menus: Yup.array()
            .of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    name: Yup.string().required(),
                    buttons: Yup.array()
                        .of(
                            Yup.object().shape({
                                id: Yup.number().required(),
                                name: Yup.string().required(),
                                menuId: Yup.number().required(),
                                checked: Yup.boolean().required()
                            })
                        )
                        .required()
                })
            )
            .required()
    })

    const defaultValues = {
        name: '',
        menus: []
    }

    const methods = useForm({
        resolver: yupResolver(Schema),
        defaultValues,
        mode: 'all'
    })

    const { reset } = methods

    const handleBack = () => {
        navigate(paths.app.role)
    }

    const maxButtons = useMemo(() => {
        return Math.max(...permissionList.map((role: IPermission) => role.buttons.length), 0)
    }, [permissionList])

    const handleCheckboxChange = (permissionId: number, buttonId: number | null, checked: boolean) => {
        setCopiedPermissionList((prevList: IPermission[]) =>
            prevList.map((permission: IPermission) => {
                if (permission.id === permissionId) {
                    const buttons = permission.buttons.map((button) => {
                        if (buttonId === null || button.id === buttonId) {
                            return { ...button, checked }
                        }
                        return button
                    })

                    const isAnyButtonChecked = buttons.some((button) => button.checked)

                    if (isAnyButtonChecked) {
                        buttons[0] = { ...buttons[0], checked: true }
                    }

                    return { ...permission, buttons }
                }

                return permission
            })
        )
    }

    const onSubmit = async (values: IAddRole) => {
        await createNewRole(
            {
                name: values.name,
                menus: copiedPermissionList
            },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        Toast({
                            message: t('role.message.addRole'),
                            type: 'success'
                        })
                    }
                }
            }
        ).catch((err) => {
            Toast({
                message: t(`backendMsg.${err.message}`),
                type: 'error'
            })
        })
        reset()
        navigate(paths.app.role)
    }

    const handleReset = () => {
        reset()
        setCopiedPermissionList(permissionList)
    }

    return (
        <>
            <Stack alignItems="center">
                <Box sx={{ width: '85%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h3" mb={3} sx={{ fontFamily: secondaryFont }}>
                        {t('role.addRoleTitle')}
                    </Typography>
                    <IconButton
                        onClick={handleBack}
                        sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '0.5rem', height: '2rem' }}
                    >
                        <ArrowBackIcon sx={{ color: theme.palette.common.white }} />
                    </IconButton>
                </Box>
                <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Stack spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.dark }}>
                                    {t('role.name')}
                                </Typography>
                                <StyledTextField name="name" sx={{ width: '40%' }} />

                                <Typography variant="h3" sx={{ fontWeight: 'bold', pt: '1.5rem', color: theme.palette.primary.main }}>
                                    {t('role.permission')}
                                </Typography>

                                <TableContainer>
                                    <Table>
                                        <TableBody
                                            sx={{
                                                border: '1px solid',
                                                borderColor: grey['1100']
                                            }}
                                        >
                                            {copiedPermissionList.map((role: IPermission) => (
                                                <TableRow key={role.id}>
                                                    <BorderedTableCell
                                                        sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: '1rem' }}
                                                    >
                                                        <Checkbox
                                                            sx={{
                                                                transform: 'scale(1.25)',
                                                                '& .MuiSvgIcon-root': {
                                                                    color: theme.palette.error.main,
                                                                    boxShadow: `0px${theme.palette.error.main}`
                                                                },
                                                                '&:hover': {
                                                                    backgroundColor: 'transparent'
                                                                }
                                                            }}
                                                            checked={role.buttons.every((button) => button.checked)}
                                                            indeterminate={
                                                                role.buttons.some((button) => button.checked) &&
                                                                !role.buttons.every((button) => button.checked)
                                                            }
                                                            onChange={(e) => handleCheckboxChange(role.id, null, e.target.checked)}
                                                        />
                                                        {role.name}
                                                    </BorderedTableCell>
                                                    {role.buttons.map((button: IPrivileges) => (
                                                        <BorderedTableCell key={button.id} align="left">
                                                            {button.name}
                                                            <Checkbox
                                                                sx={{
                                                                    transform: 'scale(1.25)',
                                                                    '& .MuiSvgIcon-root': {
                                                                        color: button.checked
                                                                            ? theme.palette.error.main
                                                                            : grey['1200'],
                                                                        boxShadow: button.checked
                                                                            ? `0px${theme.palette.error.main}`
                                                                            : `0px  ${theme.palette.grey['500']}`
                                                                    },
                                                                    '&:hover': {
                                                                        backgroundColor: 'transparent'
                                                                    }
                                                                }}
                                                                name="menus"
                                                                checked={button.checked}
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(role.id, button.id, e.target.checked)
                                                                }
                                                            />
                                                        </BorderedTableCell>
                                                    ))}
                                                    {Array.from({ length: maxButtons - role.buttons.length }).map((_, index) => (
                                                        <BorderedTableCell key={`empty-${index}`} />
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box display="flex" justifyContent="flex-end">
                                    <Box width="30%" display="flex" gap="15px" pt={10}>
                                        <CustomButton
                                            variant="contained"
                                            data-testid="registerButton"
                                            backGroundColor={theme.palette.common.white}
                                            textColor={theme.palette.primary.main}
                                            onClick={handleReset}
                                            hoover={false}
                                            border="none"
                                            sx={{ width: '10rem' }}
                                        >
                                            {t('role.cancel')}
                                        </CustomButton>
                                        <CustomButton
                                            variant="contained"
                                            data-testid="registerButton"
                                            backGroundColor={theme.palette.primary.main}
                                            textColor={theme.palette.common.white}
                                            hoover={false}
                                            border="none"
                                            type="submit"
                                            sx={{ width: '10rem' }}
                                        >
                                            {t('role.save')}
                                        </CustomButton>
                                    </Box>
                                </Box>
                            </Stack>
                        </form>
                    </FormProvider>
                </Card>
            </Stack>
        </>
    )
}

export default AddRolePage
