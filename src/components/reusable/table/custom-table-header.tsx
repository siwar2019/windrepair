import { Box, IconButton, InputAdornment, Menu, Stack, Typography, useTheme } from '@mui/material'
import { Icon } from '@iconify/react'
import { useTranslations } from '../../../translation'
import { StyledOutlinedInput } from '../../../styles/table-head.style'
import { StyledButtonAdd } from '../../../styles/custom-buttons.style'
import CustomButton from '../hook-form/custom-button'
import Image from '../reusableImage'
import { ImgPaths } from '../../../utils/image-paths'
import { useCallback, useState } from 'react'
import Fade from '@mui/material/Fade'
import ListWithDynamicItems from '../listWithDynamicItems/list-with-dynamic-items'
import { DataFilterItem } from '../../../interfaces/dataFilter/data-filter'

type CustomHeaderProps = {
    buttonTitle?: string
    title: string
    onClick?: () => void
    onClickFunction?: () => void
    searchQuery?: string
    onSearch?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    showButton?: boolean
    extraButton?: boolean
    extraButtonTitle?: string
    displayFilter?: boolean
    addPermission?: boolean
    dataFilter?: DataFilterItem[]
    onFilterChange?: (filters: Record<string, string[]>) => void
    filters?: Record<string, string[]>
    setFilters?: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

const CustomTableHeader = ({
    buttonTitle,
    title,
    onClick,
    searchQuery,
    onSearch,
    showButton = true,
    extraButton,
    extraButtonTitle,
    addPermission,
    displayFilter = true,
    onClickFunction,
    dataFilter,
    setFilters
}: CustomHeaderProps) => {
    const theme = useTheme()
    const { t } = useTranslations()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [checked, setChecked] = useState<Record<string, string>>({})
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleFilterChange = useCallback(
        (filterName: string, filterValue: string) => {
            setFilters &&
                setFilters((prevFilters) => {
                    const updatedFilters = { ...prevFilters }

                    const currentValues = updatedFilters[filterName] || []

                    if (currentValues.includes(filterValue)) {
                        updatedFilters[filterName] = currentValues.filter((value) => value !== filterValue)
                        if (updatedFilters[filterName].length === 0) {
                            delete updatedFilters[filterName]
                        }
                    } else {
                        updatedFilters[filterName] = [filterValue]
                    }

                    return updatedFilters
                })
        },
        [setFilters]
    )
    const handleClearSearch = () => {
        if (onSearch) {
            onSearch({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
        }
    }
    return (
        <Stack pb={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" color={theme.palette.primary.main}>
                {title}
            </Typography>
            {onSearch && (
                <StyledOutlinedInput
                    value={searchQuery}
                    onChange={onSearch}
                    placeholder={t('customerListPage.search')}
                    size="small"
                    startAdornment={
                        <InputAdornment position="start">
                            <Icon icon="lets-icons:search-light" />
                        </InputAdornment>
                    }
                    endAdornment={
                        searchQuery && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClearSearch}
                                    sx={{
                                        '&.MuiIconButton-root:hover': {
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    <Icon icon="ic:round-clear" />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                />
            )}
            {displayFilter && dataFilter && (
                <Box
                    sx={{
                        p: 0
                    }}
                >
                    <IconButton
                        sx={{
                            cursor: 'pointer',
                            ':hover': { background: 'transparent' }
                        }}
                    >
                        <Image
                            src={ImgPaths.filterIcon}
                            alt="Filter icon"
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        />
                    </IconButton>

                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button'
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <ListWithDynamicItems
                            dataFilter={dataFilter}
                            onFilterChange={handleFilterChange}
                            checked={checked}
                            setChecked={setChecked}
                        />
                    </Menu>
                </Box>
            )}

            <Box>
                {showButton && addPermission && (
                    <StyledButtonAdd
                        size="small"
                        variant="outlined"
                        onClick={onClick}
                        startIcon={<Icon icon="ic:baseline-plus" color={theme.palette.common.white} />}
                        sx={{
                            '& .MuiButton-startIcon': {
                                marginLeft: 0,
                                marginRight: 0
                            }
                        }}
                    >
                        {buttonTitle}
                    </StyledButtonAdd>
                )}
                {extraButton && (
                    <CustomButton
                        backGroundColor={theme.palette.common.white}
                        textColor={theme.palette.primary.main}
                        variant={'text'}
                        onClick={onClickFunction}
                        hoover={true}
                        border={theme.palette.primary.main}
                        sx={{ width: '7rem', ml: '1rem' }}
                    >
                        {extraButtonTitle}
                    </CustomButton>
                )}
            </Box>
        </Stack>
    )
}

export default CustomTableHeader
