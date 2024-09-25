import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import CustomButton from '../reusable/hook-form/custom-button'
import LanguageMenu from './languageMenu'
import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Drawer, useTheme } from '@mui/material'
import { StyledDivider } from '../../styles/home.style'
import { useResponsive } from '../../utils/use-responsive'
import { paths } from '../../routes/paths'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { INavbarItem } from '../../interfaces/navbar'
import { useTranslations } from '../../translation'
const NavBar = () => {
    const { t } = useTranslations()

    const pages: INavbarItem[] = [
        { label: t('navBar.pages.home'), href: paths.app.root },
        { label: t('navBar.pages.ourServices'), href: paths.app.service },
        { label: t('navBar.pages.about'), href: paths.app.about },
        { label: t('navBar.pages.prices'), href: paths.app.price },
        { label: t('navBar.pages.contacts'), href: paths.app.contacts }
    ]
    const theme = useTheme()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const mdUp = useResponsive('up', 'md')
    const [selectedPage, setSelectedPage] = useState<string>()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleClickedItem = (href: string) => {
        setSelectedPage(href)
        navigate(href)
        handleCloseNavMenu()
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const [expanded, setExpanded] = React.useState<string | false>(false)

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }
    const navigate = useNavigate()
    return (
        <AppBar
            position="absolute"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                                src={ImgPaths.logo_white}
                                alt="Logo"
                                width={'9rem'}
                                sx={{
                                    mr: 1,

                                    ml: mdUp ? 3 : 'inherit'
                                }}
                            />
                        </Box>
                        <Drawer
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiDrawer-paper': {
                                    height: '80%'
                                }
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            <IconButton sx={{ ml: '82%' }} onClick={handleCloseNavMenu}>
                                <CloseIcon sx={{ color: theme.palette.common.black }} />
                            </IconButton>
                            {pages.map((page) => (
                                <>
                                    {page.label === t('navBar.pages.ourServices') ? (
                                        <Accordion onChange={handleChange('ourServices')} sx={{ boxShadow: 'none' }} key={page.label}>
                                            <AccordionSummary
                                                expandIcon={expanded === 'ourServices' ? <RemoveIcon /> : <AddIcon />}
                                                aria-controls="panel2-content"
                                                id="panel2-header"
                                            >
                                                <Typography variant="subtitle1" textAlign="center">
                                                    {page.label}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <MenuItem>{t('navBar.pages.serviceMenuOne')}</MenuItem>
                                                <MenuItem>{t('navBar.pages.serviceMenuTwo')}</MenuItem>
                                                <MenuItem>{t('navBar.pages.serviceMenuThree')}</MenuItem>
                                            </AccordionDetails>
                                        </Accordion>
                                    ) : page.label === t('navBar.pages.prices') ? (
                                        <Accordion
                                            onChange={handleChange('prices')}
                                            sx={{
                                                boxShadow: 'none',
                                                '&::before': {
                                                    backgroundColor: 'transparent'
                                                }
                                            }}
                                            key={page.label}
                                        >
                                            <AccordionSummary
                                                expandIcon={expanded === 'prices' ? <RemoveIcon /> : <AddIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <Typography variant="subtitle1" textAlign="center">
                                                    {page.label}
                                                </Typography>
                                            </AccordionSummary>
                                        </Accordion>
                                    ) : (
                                        <MenuItem onClick={() => handleClickedItem(page.href)}>
                                            <Typography variant="subtitle1" textAlign="center">
                                                {page.label}
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    <Divider sx={{ width: '90%', ml: 'auto', mr: 'auto' }} />
                                </>
                            ))}
                            <MenuItem sx={{ mb: 30 }}>
                                <CustomButton
                                    variant="contained"
                                    backGroundColor={theme.palette.primary.main}
                                    textColor={theme.palette.common.white}
                                    hoover={true}
                                    border={'none'}
                                    sx={{
                                        width: '9rem',
                                        display: { xs: 'flex', md: 'none' },
                                        marginRight: '0.5rem'
                                    }}
                                    onClick={() => {
                                        navigate(paths.auth.register)
                                    }}
                                >
                                    {t('navBar.signUp')}
                                </CustomButton>
                                <CustomButton
                                    variant="contained"
                                    backGroundColor={'transparent'}
                                    textColor={theme.palette.primary.main}
                                    hoover={true}
                                    border={theme.palette.primary.main}
                                    sx={{
                                        width: '9rem',
                                        display: { xs: 'flex', md: 'none' }
                                    }}
                                    onClick={() => {
                                        navigate(paths.auth.login)
                                    }}
                                >
                                    {t('auth.loginForm.login')}
                                </CustomButton>
                            </MenuItem>
                        </Drawer>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            flexGrow: 1
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => handleClickedItem(page.href)}
                                sx={{
                                    my: 2,
                                    color: theme.palette.common.white,
                                    display: 'block',
                                    padding: '1rem',
                                    textDecoration: selectedPage === page.href ? 'underline' : 'none',
                                    textUnderlineOffset: '20%'
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ alignItems: 'center', flexGrow: 0 }}>
                    <LanguageMenu colorSelected={theme.palette.common.white} colorUnselected={theme.palette.grey['200']} />
                    </Box>
                    <CustomButton
                        variant="contained"
                        backGroundColor={theme.palette.primary.main}
                        textColor={theme.palette.common.white}
                        hoover={true}
                        border={'none'}
                        sx={{
                            width: '9rem',
                            display: { xs: 'none', md: 'flex' },
                            marginRight: '0.5rem'
                        }}
                        onClick={() => {
                            navigate(paths.auth.register)
                        }}
                    >
                        {t('navBar.signUp')}
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        backGroundColor={'transparent'}
                        textColor={theme.palette.common.white}
                        hoover={true}
                        border={theme.palette.common.white}
                        sx={{
                            width: '9rem',
                            display: { xs: 'none', md: 'flex' }
                        }}
                        onClick={() => {
                            navigate(paths.auth.login)
                        }}
                    >
                        {t('auth.loginForm.login')}
                    </CustomButton>
                </Toolbar>
                <StyledDivider sx={{ display: { sx: 'flex', md: 'none' } }} />
            </Container>
        </AppBar>
    )
}

export default NavBar
