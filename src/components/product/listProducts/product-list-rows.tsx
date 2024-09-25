import { Box, Button, IconButton, Menu, MenuItem, TableCell, TableRow, Typography, useTheme } from '@mui/material'
import { IProduct } from '../../../interfaces/product/product'
import { PRODUCT_STATUS, ROLES, ROLE_PERMISSION, currency } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'
import { COMMON } from '../../../theme/palette'
import moment from 'moment'
import { RootState, useSelector } from '../../../redux/store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Toast from '../../reusable/custom-toast'
import DeleteProduct from '../modalProducts/deleteProduct'
import { useUpdateStatusProduct, useAssignProduct, useDeleteProduct } from '../../../hooks/product/product.hook'
import ProblemModal from '../modalProducts/problemModal'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import UpdateProductForm from '../updateProduct/update-product-form'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CustomSelectMenu from '../../reusable/custom-select-menu'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import React from 'react'
import { primaryFont } from '../../../theme/typography'
import ViewProduct from '../viewProduct/view-product'
import { useActionPermission } from '../../auth/utils/commonRole'
import CircleIcon from '@mui/icons-material/Circle'
import { StyledSwitch } from '../../../styles/product.style'
import CustomButton from '../../reusable/hook-form/custom-button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AssignToEmployee from './tiket-assignement/assignToEmployeeModal'
import { useGetEmployeeList } from '../../../hooks/employee.hook'
import { IEmployee } from '../../../interfaces/employee'
import CancelIcon from '@mui/icons-material/Cancel'
import { Tooltip } from '@mui/material'

type ProductsListProps = {
    rowData: IProduct
}

const ProductRows = ({ rowData }: ProductsListProps) => {
    const { id, serialNumber, name, model, problemDescription, status, client, employeeId, repairticket } = rowData
    const currentDate = moment()
    const [openEditModal, setOpenEdiModal] = useState<boolean>(false)
    const [currentStatus, setCurrentStatus] = useState<string | boolean | null>('')
    const PRODUCT_STATUSES = Object.values(PRODUCT_STATUS)
    const [availableStatuses, setAvailableStatuses] = useState(PRODUCT_STATUSES)
    const user = useSelector((state: RootState) => state.auth.user)
    const { t } = useTranslation()
    const [openProblem, setOpenProblem] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { mutateAsync: removeProduct } = useDeleteProduct()
    const { mutateAsync: assignProductToMe } = useAssignProduct()
    const { mutateAsync: changeStatus } = useUpdateStatusProduct()

    const [openDeleteProduct, setOpenDeleteProduct] = useState(false)
    const [openModalView, setOpenModalView] = useState(false)

    const theme = useTheme()

    useEffect(() => {
        let filteredStatuses: PRODUCT_STATUS[] = []

        if (status === PRODUCT_STATUS.PENDING) {
            filteredStatuses = PRODUCT_STATUSES.filter((availableStatus) => availableStatus === PRODUCT_STATUS.IN_PROGRESS)
        } else if (status === PRODUCT_STATUS.IN_PROGRESS) {
            filteredStatuses = PRODUCT_STATUSES.filter(
                (availableStatus) =>
                    availableStatus === PRODUCT_STATUS.PENDING ||
                    availableStatus === PRODUCT_STATUS.CLOSED_FAIL ||
                    availableStatus === PRODUCT_STATUS.CLOSED_SUCCESS
            )
        } else {
            filteredStatuses = []
        }

        setAvailableStatuses(filteredStatuses)
    }, [status])

    const { data } = useGetEmployeeList({
        typeUser: ROLES.EMPLOYEE
    })

    const listEmployee = useMemo(() => {
        return data && data.data.length !== 0 ? data.data.list : []
    }, [data])

    const findEmployee = listEmployee.filter((employee: IEmployee) => employee.id === employeeId)

    const [assigned, setAssigned] = useState<boolean>(false)
    useEffect(() => {
        setAssigned(!!employeeId)
    }, [employeeId])

    const [openModal, setOpenModal] = useState(false)

    const closeModal = () => {
        setOpenModal(false)
    }
    const handleModalEdit = (value: boolean) => {
        setOpenEdiModal(value)
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [anchorElAffected, setAnchorElAffected] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const openSelect = Boolean(anchorElAffected)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleCloseAffectation = () => {
        setAnchorElAffected(null)
    }

    const [openStaus, setOpenStatus] = useState(false)

    const handleCloseStatus = () => {
        setOpenStatus(false)
    }

    const handleStatusChange = (status: string | boolean | null) => {
        setCurrentStatus(status)
        setOpenStatus(true)
    }

    const labelColor = (status: unknown) => {
        switch (status) {
            case PRODUCT_STATUS.IN_PROGRESS:
                return COMMON.common.orange
            case PRODUCT_STATUS.PENDING:
                return COMMON.common.yellow
            case PRODUCT_STATUS.CLOSED_FAIL:
                return COMMON.common.red
            case PRODUCT_STATUS.CLOSED_SUCCESS:
                return COMMON.common.green
            default:
                return ''
        }
    }

    const labelTraduction = (status: unknown) => {
        switch (status) {
            case PRODUCT_STATUS.IN_PROGRESS:
                return t('ticketPage.fields.inProgress')
            case PRODUCT_STATUS.PENDING:
                return t('ticketPage.fields.pending')
            case PRODUCT_STATUS.CLOSED_SUCCESS:
                return t('ticketPage.fields.closedSuccess')
            case PRODUCT_STATUS.CLOSED_FAIL:
                return t('ticketPage.fields.closedFail')
            default:
                return status as string
        }
    }

    const hasAccess = !!user && [ROLES.PARTNER].includes(user.role)
    const isEmployee = !!user && [ROLES.EMPLOYEE].includes(user.role)
    const casAccessProblemModel = !!user && [ROLES.PARTNER, ROLES.EMPLOYEE].includes(user.role)

    const affectToMe = useCallback(
        async (employeeId?: number) => {
            if (status === PRODUCT_STATUS.CLOSED_FAIL || status === PRODUCT_STATUS.CLOSED_SUCCESS) {
                Toast({
                    message: t('ticketPage.messages.cannotAssignClosedTicket'),
                    type: 'error'
                })
                return
            }
            try {
                await assignProductToMe({ id, isAssigned: true, employeeId })
                    .then(() => {
                        Toast({
                            message: t('ticketPage.messages.affected'),
                            type: 'success'
                        })
                    })
                    .catch(() => {
                        Toast({
                            message: t('ticketPage.messages.error'),
                            type: 'error'
                        })
                    })
            } catch (error) {
                Toast({
                    message: t('ticketPage.messages.error'),
                    type: 'error'
                })
            }
        },
        [assignProductToMe, id, status, t, employeeId]
    )

    const handleUnAssign = async () => {
        try {
            await assignProductToMe({ id, isAssigned: false, employeeId })
                .then(() => {
                    Toast({
                        message: t('ticketPage.messages.notAffected'),
                        type: 'success'
                    })
                })
                .catch(() => {
                    Toast({
                        message: t('ticketPage.messages.error'),
                        type: 'error'
                    })
                })
        } catch (error) {
            Toast({
                message: t('ticketPage.messages.error'),
                type: 'error'
            })
        }
        setAnchorElAffected(null)
        setAnchorEl(null)
    }

    const handleOpenDeleteProduct = () => {
        setOpenDeleteProduct(true)
        handleClose()
    }

    const handleCloseDeleteProduct = () => {
        setOpenDeleteProduct(false)
    }

    const handleOpenProblem = () => {
        setOpenProblem(true)
        setIsModalOpen(!isModalOpen)
        handleClose()
    }

    const handleCloseProblem = () => {
        setOpenProblem(false)
        setIsModalOpen(false)
    }

    const editProduct = () => {
        setOpenEdiModal(true)
        setAnchorEl(null)
        handleClose()
    }

    const handleViewProduct = () => {
        setOpenModalView(true)
        handleClose()
    }

    const handleClickCloseModalView = () => {
        setOpenModalView(false)
    }

    const deleteProduct = useCallback(async () => {
        await removeProduct(id, {
            onSuccess(data, _variables, _context) {
                if (data.status === 200) {
                    Toast({
                        message: t('ticketPage.messages.deleteProduct'),
                        type: 'success'
                    })
                }
                setAnchorEl(null)
            }
        }).catch((data) => {
            Toast({
                message: t(`ticketPage.messages.${data.message}`),
                type: 'error'
            })
        })
        handleCloseDeleteProduct()
    }, [removeProduct, id])

    const menuRole = ROLE_PERMISSION.TICKET

    const canAffect = useActionPermission(menuRole, ROLE_PERMISSION.AFFECT_TO_ME)
    const canEdit = useActionPermission(menuRole, ROLE_PERMISSION.EDIT_TICKET)
    const canDelete = useActionPermission(menuRole, ROLE_PERMISSION.DELETE_TICKET)
    const canView = useActionPermission(menuRole, ROLE_PERMISSION.VIEW_DETIALS_TICKET)

    const menuArray = [
        {
            id: 1,
            name: t('role.edit'),
            icon: <EditIcon />,
            onClick: editProduct,
            isDisplayed: canEdit && !rowData.repairticket?.payed && ![PRODUCT_STATUS.CLOSED_FAIL].includes(status)
        },
        {
            id: 2,
            name: t('modal.delele'),
            icon: <DeleteIcon />,
            onClick: handleOpenDeleteProduct,
            isDisplayed: canDelete
        },
        {
            id: 3,
            name: t('movement.viewDetails'),
            icon: <VisibilityIcon />,
            onClick: handleViewProduct,
            isDisplayed: canView
        }
    ]

    const handleAssignmentChange = useCallback(async () => {
        if (status === PRODUCT_STATUS.CLOSED_FAIL || status === PRODUCT_STATUS.CLOSED_SUCCESS) {
            Toast({
                message: t('ticketPage.messages.cannotAssignClosedTicket'),
                type: 'error'
            })
            return
        }
        try {
            await assignProductToMe({ id, isAssigned: !assigned, employeeId })
                .then(() => {
                    setAssigned((prev) => !prev)
                    Toast({
                        message: assigned ? t('ticketPage.messages.notAffected') : t('ticketPage.messages.affected'),
                        type: 'success'
                    })
                })
                .catch(() => {
                    Toast({
                        message: t('ticketPage.messages.error'),
                        type: 'error'
                    })
                })
        } catch (error) {
            Toast({
                message: t('ticketPage.messages.error'),
                type: 'error'
            })
        }
    }, [assignProductToMe, id, assigned, status, t])

    const onChange = async () => {
        await changeStatus(
            { id, status: currentStatus },
            {
                onSuccess(data, _variables, _context) {
                    if (data.status === 200) {
                        Toast({
                            message: t('productPage.messages.updateProduct'),
                            type: 'success'
                        })
                    }
                    setCurrentStatus(status)
                }
            }
        ).catch((data) => {
            Toast({
                message: t(`productPage.messages.${data.message}`),
                type: 'error'
            })
        })
        handleCloseStatus()
    }

    const handleClickAssignement = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAffected(event.currentTarget)
    }

    return (
        <>
            <TableRow>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={600}>
                        #{id}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {serialNumber || '-'}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {client.name}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {model}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {name || '-'}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {repairticket?.estimatedCost} {currency}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {repairticket?.estimatedTime} {t('common.days')}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography color={COMMON.common.black} fontWeight={500}>
                        {repairticket?.startDate ? moment(repairticket?.startDate).format('YYYY-MM-DD') : '-'}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography
                        color={
                            repairticket?.endDate &&
                            !moment(repairticket.endDate).isAfter(currentDate) &&
                            status == PRODUCT_STATUS.IN_PROGRESS
                                ? theme.palette.primary.main
                                : COMMON.common.black
                        }
                        fontWeight={500}
                    >
                        {repairticket?.endDate ? moment(repairticket?.endDate).format('YYYY-MM-DD') : '-'}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    {isModalOpen ? (
                        <KeyboardArrowUpIcon onClick={handleOpenProblem} />
                    ) : (
                        <KeyboardArrowDownIcon onClick={handleOpenProblem} />
                    )}
                </TableCell>
                <TableCell align="center">
                    {user?.role !== ROLES.CLIENT ? (
                        <CustomSelectMenu
                            openConfirmation={openStaus}
                            handleCloseConfirmation={handleCloseStatus}
                            handleOpenConfirmation={handleStatusChange}
                            handleChangeStatus={onChange}
                            description={t('updateModal.status')}
                            labelColor={labelColor}
                            labelTraduction={labelTraduction}
                            status={status}
                            listStatus={availableStatuses}
                            displayMenu={!!employeeId}
                            disabled={
                                status === PRODUCT_STATUS.CLOSED_FAIL ||
                                status === PRODUCT_STATUS.CLOSED_SUCCESS ||
                                employeeId !== user?.id
                            }
                        />
                    ) : (
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{
                                borderRadius: 1,
                                justifyContent: 'center',
                                width: 105,
                                fontSize: '0.75rem',
                                padding: '1rem',
                                height: '32px',
                                lineHeight: '1.5',
                                minHeight: '1',
                                color: theme.palette.common.white,
                                backgroundColor: labelColor(status),
                                cursor: 'default',
                                '&:hover': {
                                    backgroundColor: labelColor(status)
                                }
                            }}
                        >
                            {labelTraduction(status)}
                        </Button>
                    )}
                </TableCell>
                {!!user && user.role !== ROLES.CLIENT && (
                    <TableCell align="center">
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.1, alignItems: 'center' }}>
                            {hasAccess && (
                                <>
                                    <Menu
                                        id="affectation menu"
                                        keepMounted
                                        open={Boolean(anchorElAffected)}
                                        anchorEl={anchorElAffected}
                                        onClose={handleCloseAffectation}
                                        sx={{ display: employeeId ? 'none' : 'inherit' }}
                                        elevation={0}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 2.5
                                            }
                                        }}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <MenuItem onClick={() => affectToMe(user.id)}>{t('productPage.messages.affect')}</MenuItem>
                                        <MenuItem onClick={() => setOpenModal(true)}>{t('productPage.affectToEmployee')}</MenuItem>
                                    </Menu>

                                    <Button
                                        size="small"
                                        onClick={handleClickAssignement}
                                        sx={{
                                            borderRadius: '20px',
                                            backgroundColor: COMMON.common.pink,
                                            width: '8rem',
                                            fontSize: '0.8rem',
                                            Height: '0.1rem !important',
                                            display: employeeId ? 'none' : 'inherit',
                                            mr: 1.5
                                        }}
                                    >
                                        {t('productPage.affectation')}
                                        <ArrowDropDownIcon />
                                    </Button>

                                    {employeeId && (
                                        <CustomButton
                                            backGroundColor={COMMON.common.pink}
                                            textColor={theme.palette.primary.main}
                                            variant={'text'}
                                            hoover={false}
                                            border={''}
                                            size="small"
                                            onClick={handleClickAssignement}
                                            sx={{
                                                borderRadius: '5px',
                                                width: '8rem',
                                                fontSize: '0.8rem',
                                                Height: '0.1rem !important',
                                                mr: 1.5
                                            }}
                                        >
                                            {employeeId === user?.id
                                                ? t('productPage.affectedToMe')
                                                : `${t('productPage.affectedTo')} ${findEmployee.map((employee: IEmployee) => employee.name)}`}
                                        </CustomButton>
                                    )}

                                    {employeeId &&
                                        status !== PRODUCT_STATUS.CLOSED_FAIL &&
                                        status !== PRODUCT_STATUS.CLOSED_SUCCESS && (
                                            <IconButton onClick={handleUnAssign}>
                                                <Tooltip title={t('ticketPage.messages.cancelAssignment')}>
                                                    <CancelIcon
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            '&:hover': {
                                                                backgroundColor: 'transparent !important'
                                                            }
                                                        }}
                                                    />
                                                </Tooltip>
                                            </IconButton>
                                        )}
                                </>
                            )}
                            {isEmployee && (
                                <>
                                    <StyledSwitch
                                        checked={assigned}
                                        onChange={handleAssignmentChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        icon={
                                            !assigned && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <CircleIcon sx={{ fontSize: 30, color: theme.palette.grey[100] }} />
                                                    <Typography
                                                        sx={{ fontSize: 8, fontWeight: 'bold', color: theme.palette.common.black }}
                                                    >
                                                        {t('productPage.messages.affect')}
                                                    </Typography>
                                                </Box>
                                            )
                                        }
                                        checkedIcon={<CheckCircleIcon sx={{ fontSize: 30 }} />}
                                    />
                                </>
                            )}
                            <Button
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                disableElevation
                                onClick={handleClick}
                                sx={{
                                    '&:hover': { backgroundColor: 'transparent' },
                                    display: menuArray.every((menu) => !menu.isDisplayed) ? 'none' : 'inline-flex' //when have no access role
                                }}
                                endIcon={<MoreHorizIcon sx={{ color: theme.palette.common.black }} />}
                            ></Button>
                            <Menu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button'
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {menuArray.map(
                                    (menu) =>
                                        menu.isDisplayed && (
                                            <MenuItem key={menu.id} onClick={menu.onClick} disableRipple>
                                                {menu.icon}
                                                <Typography
                                                    sx={{
                                                        ml: 1,
                                                        fontFamily: primaryFont,
                                                        color: COMMON.grey['600']
                                                    }}
                                                >
                                                    {menu.name}
                                                </Typography>
                                            </MenuItem>
                                        )
                                )}
                            </Menu>
                        </Box>
                        {openModal && <AssignToEmployee openModal={openModal} closeModal={closeModal} onClickMethod={affectToMe} />}
                    </TableCell>
                )}
            </TableRow>
            <ProblemModal
                product={rowData}
                open={openProblem}
                handleClose={handleCloseProblem}
                problemDescription={problemDescription}
                casAccessProblemModel={casAccessProblemModel}
            />
            <DeleteProduct open={openDeleteProduct} onClose={handleCloseDeleteProduct} handleDelete={deleteProduct} />
            {openEditModal && hasAccess && (
                <UpdateProductForm
                    assigned={!!employeeId}
                    product={rowData}
                    open={openEditModal}
                    onClose={() => handleModalEdit(false)}
                />
            )}

            {/*  {openEditModal && isEmployee && (
                <UpdateProductForm assigned={assigned} product={rowData} open={openEditModal} onClose={() => handleModalEdit(false)} />
            )} */}
            <ViewProduct product={rowData} open={openModalView} onClose={handleClickCloseModalView} />
        </>
    )
}
export default ProductRows
