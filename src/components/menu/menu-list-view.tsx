import { Box, Card, IconButton, Stack, Table, TableBody, TableContainer, TableRow, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomTableHeader from '../reusable/table/custom-table-header'
import { useCallback, useMemo, useState } from 'react'
import AddMenuModal from './add-menu-modal'
import { useDeleteMenu, useGetMenuList } from '../../hooks/menu/menu.hook'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import DeleteModal from '../reusable/customModal/delete-modal'
import Toast from '../reusable/custom-toast'
import { grey } from '../../theme/palette'
import { BorderedTableCell } from '../../styles/role.style'
import { IButton, IMenu } from '../../interfaces/menu/menu'
import UpdateMenuModal from './update-menu-modal'

const MenuListView = () => {
    const { t } = useTranslation()
    const theme = useTheme()

    const [openAddModal, setOpenAddModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [idMenuToDelete, setIdMenuToDelete] = useState(Number)
    const [idMenuToUpdate, setIdMenuToUpdate] = useState(Number)

    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)

    const { data } = useGetMenuList()
    const { mutateAsync: deleteMenu } = useDeleteMenu()

    const listMenus = useMemo(() => {
        return data?.data ?? []
    }, [data])

    const handleClose = () => {
        setOpenAddModal(false)
    }

    const handleCloseModalUpdate = () => {
        setOpenUpdateModal(false)
    }

    const toggleDeleteModal = () => {
        setOpenDeleteModal((prev) => !prev)
    }

    const MenuIdToUpdate = listMenus.find((menu: IMenu) => menu.id === idMenuToUpdate)

    const handleDeleteMenu = useCallback(async () => {
        await deleteMenu(idMenuToDelete, {
            onSuccess(data, _variables, _context) {
                if (data.status === 200) {
                    Toast({
                        message: t(`menuPage.messages.deleteMenuSuccess`),
                        type: 'success'
                    })
                }
            }
        }).catch((data) => {
            Toast({
                message: t(`ticketPage.messages.${data.message}`),
                type: 'error'
            })
        })
        toggleDeleteModal()
    }, [deleteMenu, idMenuToDelete, t])

    const handleOpenDeleteModal = (id: number) => {
        setIdMenuToDelete(id)
        setOpenDeleteModal(true)
    }

    const handleModalEdit = (menuId: number) => {
        setIdMenuToUpdate(menuId)
        setOpenUpdateModal(true)
    }

    const addMenu = () => {
        setOpenAddModal(true)
    }

    const maxButtons = useMemo(() => {
        if (listMenus) {
            return Math.max(...listMenus.map((menu: IMenu) => menu?.buttons.length), 0)
        } else {
            return 0
        }
    }, [listMenus])

    return (
        <>
            <Stack alignItems="center">
                <Card sx={{ p: 2, width: '85%', height: '100%' }}>
                    <CustomTableHeader
                        buttonTitle={t('menuPage.addMenu.title')}
                        title={t('menuPage.menuList')}
                        onClick={addMenu}
                        displayFilter={false}
                        addPermission={true}
                    />

                    <TableContainer>
                        <Table>
                            <TableBody
                                sx={{
                                    border: '1px solid',
                                    borderColor: grey[1100],
                                    color: grey[1100]
                                }}
                            >
                                {listMenus.map((menu: IMenu) => (
                                    <TableRow key={menu.id}>
                                        <BorderedTableCell
                                            sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: '1rem' }}
                                        >
                                            {menu.name}
                                        </BorderedTableCell>
                                        {menu.buttons.map((button: IButton) => (
                                            <BorderedTableCell key={button.id} align="left" sx={{ fontWeight: 700 }}>
                                                {button.name}
                                            </BorderedTableCell>
                                        ))}
                                        {Array.from({ length: maxButtons - menu?.buttons.length }).map((_, index) => (
                                            <BorderedTableCell key={`empty-${index}`} />
                                        ))}

                                        <BorderedTableCell align="left">
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'end'
                                                }}
                                            >
                                                <IconButton
                                                    onClick={() => handleModalEdit(menu.id)}
                                                    sx={{ ':hover': { background: 'transparent' }, cursor: 'pointer' }}
                                                >
                                                    <Image src={ImgPaths.edit_icon} />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => handleOpenDeleteModal(menu.id)}
                                                    sx={{ ':hover': { background: 'transparent' }, cursor: 'pointer' }}
                                                >
                                                    <Image src={ImgPaths.delete_icon} />
                                                </IconButton>
                                            </Stack>
                                        </BorderedTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
            <AddMenuModal open={openAddModal} closeModal={handleClose} />
            <DeleteModal
                open={openDeleteModal}
                handleClose={toggleDeleteModal}
                onDelete={handleDeleteMenu}
                onCancel={toggleDeleteModal}
                dialogTitle={t('menuPage.deleteMenu')}
                dialogContent={'menu'}
            />
            {openUpdateModal && <UpdateMenuModal open={openUpdateModal} onClose={handleCloseModalUpdate} menu={MenuIdToUpdate} />}
        </>
    )
}
export default MenuListView
