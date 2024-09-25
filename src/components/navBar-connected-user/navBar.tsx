import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import AppBarConnectedUser from './appBar'
import Image from '../reusable/reusableImage'
import { useTheme } from '@mui/material'
import { useTranslations } from '../../translation'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { ROLES, ROLE_PERMISSION, drawersWidth } from '../../utils/constants'
import { secondaryFont } from '../../theme/typography'
import { COMMON } from '../../theme/palette'
import { useResponsive } from '../../utils/use-responsive'
import { paths } from '../../routes/paths'
import { handleRedirect } from '../../utils/redirect'
import { useLocation, useNavigate } from 'react-router-dom'
import Person4Icon from '@mui/icons-material/Person4'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { RootState, useSelector } from '../../redux/store'
import GroupsIcon from '@mui/icons-material/Groups'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'

import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import { useGetUsersList } from '../../hooks/customer.hook'
import { useActionPermission } from '../auth/utils/commonRole'
import { useGetUser } from '../../hooks/profile/profile.hook'
import SettingsIcon from '@mui/icons-material/Settings'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const drawerWidth = drawersWidth

interface Props {
    window?: () => Window
    children: React.ReactNode
}

const NavBarConnectedUser = ({ window, children, ...other }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)
    const location = useLocation()
    const { data: data } = useGetUser()

    const dataUser = React.useMemo(() => {
        return data
    }, [data])

    const theme = useTheme()

    const mdUp = useResponsive('up', 'md')
    const { t } = useTranslations()
    const navigate = useNavigate()
    const { data: userData } = useGetUsersList(user?.tenantId)
    const { data: getUserData } = useGetUser()

    const handleDrawerClose = () => {
        setIsClosing(true)
        setMobileOpen(false)
    }

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false)
    }

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen)
        }
    }

    const handleItemClick = (itemId: number, href: string) => {
        setSelectedItem(itemId)
        handleRedirect(navigate, href)
    }

    const canShowTicket = useActionPermission(ROLE_PERMISSION.TICKET, ROLE_PERMISSION.VIEW_TICKET_MENU)

    const sideBarItems = [
        {
            id: 1,
            text: t('connectedSideBar.dashBoard'),
            href: paths.app.dashBoard,
            icon: <HomeIcon />,
            roles: [ROLES.ADMIN, ROLES.CLIENT, ROLES.EMPLOYEE, ROLES.PARTNER],
            isDisplayed: true
        },
        {
            id: 2,

            text: t('connectedSideBar.customer'),
            href: paths.app.customer,
            icon: <PersonIcon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.CUSTOMER, ROLE_PERMISSION.VIEW_CUSTOMER_MENU)
        },
        {
            id: 3,
            text: t('connectedSideBar.ticket'),
            href: paths.app.product,
            icon: <LocalMallIcon />,
            roles: [ROLES.CLIENT, ROLES.EMPLOYEE, ROLES.PARTNER],
            isDisplayed: user?.role === ROLES.CLIENT || canShowTicket
        },
        {
            id: 4,
            text: t('connectedSideBar.employee'),
            href: paths.app.employee,
            icon: <Person4Icon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.EMPLOYEE, ROLE_PERMISSION.VIEW_EMPLOYEE_MENU)
        },
        {
            id: 5,
            text: t('connectedSideBar.partners'),
            href: paths.app.partners,
            roles: [ROLES.ADMIN],
            icon: <GroupsIcon />,
            isDisplayed: true
        },
        {
            id: 6,
            text: t('connectedSideBar.payment'),
            href: paths.app.payment,
            roles: [ROLES.ADMIN],
            icon: <CreditScoreIcon />,
            isDisplayed: true
        },
        {
            id: 7,
            text: t('connectedSideBar.role'),
            href: paths.app.role,
            icon: <ManageAccountsOutlinedIcon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.ROLE, ROLE_PERMISSION.VIEW_ROLES_MENU)
        },
        {
            id: 8,
            text: t('connectedSideBar.invoice'),
            href: paths.app.invoice,
            icon: <RequestQuoteIcon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.INVOICE, ROLE_PERMISSION.VIEW_INVOICES_MENU)
        },
        {
            id: 9,
            text: t('connectedSideBar.fund'),
            href: paths.app.fund,
            icon: <PointOfSaleIcon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.FUND, ROLE_PERMISSION.VIEW_FUND_MENU)
        },
        {
            id: 10,
            text: t('connectedSideBar.menu'),
            href: paths.app.menu,
            roles: [ROLES.ADMIN],
            icon: <MenuIcon />,
            isDisplayed: true
        },
        {
            id: 11,
            text: t('connectedSideBar.settings'),
            href: paths.app.store,
            icon: <SettingsIcon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.STORE, ROLE_PERMISSION.VIEW_STORES)
        },
        {
            id: 12,
            text: t('connectedSideBar.delivery'),
            href: paths.app.delivery,
            icon: <LocalShippingIcon />,
            roles: [ROLES.PARTNER, ROLES.EMPLOYEE],
            isDisplayed: useActionPermission(ROLE_PERMISSION.DELIVERY, ROLE_PERMISSION.VIEW_DELIVERY) && dataUser?.isErpClient
        }
    ]

    const getSelectedItem = () => {
        const path = location.pathname
        const itemSelected = sideBarItems.find((item) => item.href === path)
        return itemSelected ? itemSelected.id : 1
    }
    const [selectedItem, setSelectedItem] = React.useState<number>(getSelectedItem())

    React.useEffect(() => {
        setSelectedItem(getSelectedItem())
    }, [location.pathname])
    const filteredSideBarItems = user ? sideBarItems.filter((item) => item.roles.includes(user.role)) : []

    const drawer = (
        <Box sx={{ backgroundColor: theme.palette.common.black }}>
            {user?.role === ROLES.PARTNER ? (
                <Image
                    src={`${process.env.REACT_APP_HOST_API_ASSEST}${getUserData?.image}`}
                    alt="Logo"
                    width={'7rem'}
                    sx={{ marginTop: '0.5rem', justifyContent: 'center', display: 'flex' }}
                />
            ) : (
                userData && (
                    <Image
                        src={`${process.env.REACT_APP_HOST_API_ASSEST}${userData?.image}`}
                        alt="Logo"
                        width={'7rem'}
                        sx={{ marginTop: '0.5rem', justifyContent: 'center', display: 'flex' }}
                    />
                )
            )}
            <Divider />
            <List sx={{ pt: 9 }}>
                {filteredSideBarItems
                    .filter((item) => item.isDisplayed)
                    .map((item) => (
                        <ListItem
                            key={item.id}
                            disablePadding={mdUp}
                            sx={{
                                '& .MuiListItemButton-root': {
                                    backgroundColor: 'transparent'
                                },
                                '& .Mui-selected': {
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            <ListItemButton
                                selected={selectedItem === item.id}
                                onClick={() => handleItemClick(item.id, item.href)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 'auto',
                                        color: selectedItem === item.id ? theme.palette.primary.main : theme.palette.common.white,
                                        backgroundColor:
                                            selectedItem === item.id
                                                ? mdUp
                                                    ? COMMON.common.opacity
                                                    : COMMON.common.clicked
                                                : theme.palette.primary.main,
                                        padding: 1,
                                        borderRadius: '10%'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        textAlign: 'center',
                                        fontFamily: secondaryFont,
                                        fontWeight: 400,
                                        fontSize: '1',
                                        color: selectedItem === item.id ? theme.palette.primary.main : theme.palette.common.white,
                                        display: { xs: 'none', md: 'flex' }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: theme.palette.common.white,

                        '& .MuiDrawer-paper': {
                            backgroundColor: theme.palette.common.black
                        }
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            ml: 2,
                            display: { sm: 'none' },
                            color: theme.palette.common.black
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AppBarConnectedUser />
                </Box>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.common.black
                    }
                }}
                aria-label="mailbox folders"
            >
                {/* drawer mobile screen        */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: theme.palette.common.black
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                {/* drawer large screen        */}

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar sx={{ padding: '5%' }} />

                {children}
            </Box>
        </Box>
    )
}
export default NavBarConnectedUser
