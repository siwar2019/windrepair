import { Box, Button, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import useTranslations from '../../translation/use-translations'
import CustomButton from '../reusable/hook-form/custom-button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Icon } from '@iconify/react'
import { useState, MouseEvent } from 'react'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
interface LanguageMenuProps {
    colorSelected?: string
    colorUnselected?: string
}
const LanguageMenu: React.FC<LanguageMenuProps> = ({ colorSelected, colorUnselected }) => {
    const { t, onChangeLang, currentLang, languages } = useTranslations()
    const theme = useTheme()
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
    interface Language {
        label: string
        value: string
        systemValue: any
        icon: string
    }
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLang)
    const open = Boolean(menuAnchor)
    const handleLanguageChange = (language: Language) => {
        setSelectedLanguage(language)
        onChangeLang(language.value)
        handleCloseMenu()
    }
    const handleIconClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget as HTMLElement)
    }

    const handleCloseMenu = () => {
        setMenuAnchor(null)
    }
    return (
        <>
            <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
                <Button
                    onClick={handleIconClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={<Icon icon={currentLang.icon} />}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    aria-controls={open ? 'basic-menu' : undefined}
                >
                    {t('navBar.emptyButton')}
                </Button>
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                    disableScrollLock
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                    {languages.map((language) => (
                        <MenuItem
                            key={language.value}
                            value={language.value}
                            onClick={() => {
                                onChangeLang(language.value)
                                handleCloseMenu()
                            }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Icon icon={language.icon} style={{ marginRight: '0.5rem' }} />
                                {t(language.label)}
                            </Stack>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        md: 'flex',
                        paddingRight: '2rem',
                        gap: '1rem'
                    }
                }}
            >
                <Stack>
                    <Button
                        onClick={handleIconClick}
                        startIcon={<Image sx={{mt:"-35%"}} src={ImgPaths.langIcon} />}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                            textTransform: 'capitalize',
                            color: colorSelected,
                            cursor: 'pointer'
                        }}
                    >
                        {t(selectedLanguage.value)}
                    </Button>
                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={handleCloseMenu}
                        disableScrollLock
                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    >
                        {languages.map((language) => (
                            <MenuItem
                                key={language.value}
                                value={language.value}
                                onClick={() => {
                                    handleLanguageChange(language)
                                }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Icon icon={language.icon} style={{ marginRight: '0.5rem' }} />
                                    {t(language.label)}
                                </Stack>
                            </MenuItem>
                        ))}
                    </Menu>
                </Stack>
            </Box>
        </>
    )
}
export default LanguageMenu
