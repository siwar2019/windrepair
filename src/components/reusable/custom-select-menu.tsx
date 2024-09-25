import { Typography, useTheme } from '@mui/material'

import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import UpdateModal from '../reusable/customModal/update-modal'

interface IMenu {
    openConfirmation: boolean
    handleCloseConfirmation: () => void
    handleOpenConfirmation: (status: boolean | null | string) => void
    description: string
    labelColor: (status: string | boolean | null) => string
    labelTraduction: (status: string | boolean | null) => string
    endIcon?: React.ReactNode
    listStatus: (string | boolean)[]
    status: boolean | string | null
    handleChangeStatus: () => void
    displayMenu?: boolean
    disabled?: boolean
}

const CustomSelectMenu = ({
    openConfirmation,
    handleCloseConfirmation,
    description,
    handleOpenConfirmation,
    labelColor,
    labelTraduction,
    endIcon,
    listStatus,
    status,
    handleChangeStatus,
    displayMenu,
    disabled
}: IMenu) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleChangeItem = (state: string | boolean | null) => {
        handleClose()
        handleOpenConfirmation(state as boolean | null)
    }
    const StyledMenu = styled((props: MenuProps) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 4,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0'
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5)
                },
                '&:active': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
                }
            }
        }
    }))

    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={!disabled ? handleClick : undefined}
                    disabled={disabled}
                    endIcon={endIcon}
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
                        backgroundColor: labelColor ? labelColor(status) : 'yellow',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        '&:hover': {
                            backgroundColor: `${labelColor ? labelColor(status) : 'yellow'} !important`,
                            opacity: 0.7
                        },
                        '&:disabled': {
                            color: theme.palette.common.white
                        }
                    }}
                >
                    {labelTraduction(status)}
                </Button>

                {displayMenu && (
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {listStatus.map((state) => (
                            <MenuItem
                                onClick={() => handleChangeItem(state)}
                                disableRipple
                                sx={{ color: theme.palette.common.black, p: 1, pl: 3, fontWeight: 700 }}
                            >
                                <Typography> {labelTraduction(state)}</Typography>
                            </MenuItem>
                        ))}
                    </StyledMenu>
                )}
            </div>
            <UpdateModal
                close={handleCloseConfirmation}
                open={openConfirmation}
                description={description}
                onConfirm={handleChangeStatus}
            />
        </>
    )
}
export default CustomSelectMenu
