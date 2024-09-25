import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Avatar, Stack } from '@mui/material'
import { useTranslations } from '../../translation'
import { useTheme } from '@mui/material/styles'
import { StyledText } from '../../styles/appBar.style'
import { useDispatch, useSelector } from '../../redux/store'
import { reset } from '../../redux/slices/auth'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../routes/paths'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import SettingsIcon from '@mui/icons-material/Settings'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { COMMON } from '../../theme/palette'
import Notification from '../notification/notification'
import { INotification } from '../../interfaces/notification'
import io from 'socket.io-client'
import { useEditNotifications, useGetNotifications } from '../../hooks/notification/notification.hook'
import LanguageMenu from '../navBar/languageMenu'
import { ROLES } from '../../utils/constants'

const AppBarConnectedUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslations()
    const socket = io(`${process.env.REACT_APP_HOST_API}`)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [anchorElWeb, setAnchorElWeb] = React.useState<null | HTMLElement>(null)
    const theme = useTheme()
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
    const { data } = useGetNotifications()
    const { mutateAsync: editNotification } = useEditNotifications()
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const [openNotification, setOpenNotification] = React.useState(false)
    const [clicked, setClicked] = React.useState(false)
    const [notifications, setNotifications] = React.useState<INotification[]>([])
    const [newNotificationIndices, setNewNotificationIndices] = React.useState<number[]>([])

    const { user } = useSelector((state) => state.auth)

    React.useMemo(() => {
        if (data) {
            setNotifications(data ?? [])
            const statusIndices: number[] = data
                .filter((item: INotification) => item.status === false)
                .map((_: INotification, i: number) => i)
            if (statusIndices.length > 0) {
                setNewNotificationIndices(statusIndices)
            }
        }
    }, [data])
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const notificationBox = document.getElementById('notification-box')
            if (notificationBox && !notificationBox.contains(event.target as Node)) {
                setOpenNotification(false)
            }
        }

        if (openNotification) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openNotification])

    React.useEffect(() => {
        if (user) {
            socket.emit('register', user.id)
        }

        socket.on('product_status_updated', (newNotifications: INotification[]) => {
            const newIndices: number[] = newNotifications.map((_, i) => i)

            setNotifications([...newNotifications, ...notifications])

            if (newIndices.length > 0) {
                setNewNotificationIndices(newIndices)
                setClicked(false)
            }
        })

        return () => {
            socket.off('product_status_updated')
        }
    }, [user, notifications])

    const handleIconClick = async () => {
        setOpenNotification(!openNotification)
        if (!clicked && newNotificationIndices.length > 0) {
            try {
                await editNotification([])
            } catch (error) {
                console.error('Failed to update notifications', error)
            }
        }
        setNewNotificationIndices(clicked ? [] : newNotificationIndices)
        setClicked(true)
    }

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElWeb(event.currentTarget)
    }

    const handleProfile = () => {
        navigate('/edit-profile')
        handleMenuCloseWeb()
        handleMenuClose()
    }

    const handleSettings = () => {
        navigate('/erp-settings')
        handleMenuCloseWeb()
        handleMenuClose()
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuCloseWeb = () => {
        setAnchorElWeb(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(reset())
        navigate(paths.auth.login)
    }

    const mobileMenuId = 'primary-search-account-menu-mobile'
    //mobile menu
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            sx={{
                ' & .MuiMenu-list': {
                    backgroundColor: COMMON.common.blueGray
                }
            }}
            open={isMobileMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfile}>
                <PermIdentityIcon sx={{ mr: 1 }} />
                <Typography> {t('connectedSideBar.profile')}</Typography>
            </MenuItem>
            <MenuItem onClick={handleSettings}>
                <SettingsIcon sx={{ mr: 1 }} />
                <Typography> {t('connectedSideBar.settings')}</Typography>
            </MenuItem>
            <MenuItem onClick={logout}>
                <Image sx={{ cursor: 'pointer', mr: 2 }} src={ImgPaths.logout} />
                <Typography> {t('connectedSideBar.logout')}</Typography>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box position="static" sx={{ backgroundColor: theme.palette.common.white }}>
                <Toolbar>
                    <Image
                        src={ImgPaths.logo}
                        alt=" Logo"
                        width={'7rem'}
                        sx={{ marginTop: '0.5rem', justifyContent: 'center', display: 'flex' }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} pb={1}>
                        <Stack direction="row" pt="2%">
                            <Box sx={{ alignItems: 'center', flexGrow: 0, paddingTop: '9%' }}>
                                <LanguageMenu colorSelected={theme.palette.common.black} colorUnselected={theme.palette.grey['200']} />
                            </Box>
                            {user?.role !== ROLES.PARTNER && (
                                <>
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        sx={{
                                            borderRadius: '50%',
                                            padding: theme.spacing(1.5),
                                            '&:hover': { backgroundColor: 'transparent' }
                                        }}
                                        onClick={handleIconClick}
                                    >
                                        <Badge
                                            badgeContent={newNotificationIndices.length > 0 && !clicked ? 1 : 0}
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor:
                                                        newNotificationIndices.length > 0
                                                            ? theme.palette.primary.main
                                                            : theme.palette.common.black,
                                                    color: 'white',
                                                    fontSize: '32%'
                                                }
                                            }}
                                        >
                                            <NotificationsIcon
                                                sx={{
                                                    color: 'black',
                                                    backgroundColor: 'grey.700',
                                                    borderRadius: '1rem',
                                                    fontSize: 45,
                                                    padding: '10px',
                                                    '&:hover': { opacity: '80%' }
                                                }}
                                            />
                                        </Badge>
                                    </IconButton>
                                    {openNotification && (
                                        <Box id="notification-box">
                                            <Notification
                                                notifications={notifications}
                                                newNotificationIndices={newNotificationIndices}
                                            />
                                        </Box>
                                    )}
                                </>
                            )}
                        </Stack>

                        <Box sx={{ display: 'flex' }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: '1rem',
                                    color: theme.palette.common.black,
                                    fontFamily: 'primaryFont',
                                    ml: theme.spacing(1.5)
                                }}
                            >
                                {t('connectedSideBar.hello')},
                            </Typography>
                            {user?.role === 'partner' ? (
                                <StyledText>{user?.companyName || ''} </StyledText>
                            ) : (
                                <StyledText>{user?.name} </StyledText>
                            )}
                        </Box>
                        <Avatar
                            onClick={handleAvatarClick}
                            alt={t('connectedSideBar.profile')}
                            sx={{
                                width: 45,
                                height: 45,
                                border: '3px solid transparent',
                                cursor: 'pointer',
                                marginLeft: theme.spacing(1),
                                mt: '1rem',
                                '&:hover': { opacity: '80%' }
                            }}
                        />

                        <Menu
                            anchorEl={anchorElWeb}
                            open={Boolean(anchorElWeb)}
                            onClose={handleMenuCloseWeb}
                            sx={{
                                ' & .MuiMenu-list': {
                                    backgroundColor: COMMON.common.blueGray
                                },
                                '& .MuiMenu-paper': {
                                    left: '85%',
                                    borderRadius: '0',
                                    width: '11rem'
                                }
                            }}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem onClick={handleProfile}>
                                <PermIdentityIcon sx={{ mr: 1 }} />
                                <Typography> {t('connectedSideBar.profile')}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleSettings}>
                                <SettingsIcon sx={{ mr: 1 }} />
                                <Typography> {t('connectedSideBar.erpSettings')}</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Image sx={{ cursor: 'pointer', pr: 2 }} src={ImgPaths.logout} />
                                <Typography sx={{ maxWidth: '1rem' }}> {t('connectedSideBar.logout')}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Box sx={{  display: 'flex' }}>
                            {user?.role !== ROLES.PARTNER && (
                                <>
                                    <MenuItem  sx={{ flexDirection: 'column', pl:"0%", pr: "0%" }} onClick={handleIconClick}>
                                        <Badge
                                            badgeContent={newNotificationIndices.length > 0 && !clicked ? 1 : 0}
                                            sx={{
                                                mt: '8%',
                                                mb: '-8%',
                                                '& .MuiBadge-badge': {
                                                    backgroundColor:
                                                        newNotificationIndices.length > 0
                                                            ? theme.palette.primary.main
                                                            : theme.palette.common.black,
                                                    color: 'white',
                                                    fontSize: '8%'
                                                }
                                            }}
                                        >
                                            <NotificationsIcon
                                                sx={{
                                                    color: 'black',
                                                    backgroundColor: 'grey.700',
                                                    borderRadius: '1rem',
                                                    fontSize: 45,
                                                    padding: '10px',
                                                    '&:hover': { opacity: '80%' }
                                                }}
                                            />
                                        </Badge>
                                        <Typography sx={{ ml: 2 }}>{t('notifications')}</Typography>
                                    </MenuItem>
                                    {openNotification && (
                                        <Box id="notification-box-mobile">
                                            <Notification
                                                notifications={notifications}
                                                newNotificationIndices={newNotificationIndices}
                                            />
                                        </Box>
                                    )}
                                </>
                            )}
                            <LanguageMenu colorSelected={theme.palette.common.black} colorUnselected={theme.palette.grey['200']} />
                        </Box>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon sx={{ color: theme.palette.common.black }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Box>
            {renderMobileMenu}
        </Box>
    )
}
export default AppBarConnectedUser
