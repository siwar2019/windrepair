import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import React, { useCallback, useState } from 'react'
import { Box, Checkbox } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { DataFilterItem } from '../../../interfaces/dataFilter/data-filter'

interface FilterProps {
    dataFilter: DataFilterItem[]
    onFilterChange: (name: string, value: string) => void
    checked: Record<string, string>
    setChecked: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const ListWithDynamicItems = ({ dataFilter, onFilterChange, checked, setChecked }: FilterProps) => {
    const [openCollapse, setOpenCollapse] = useState<string | null>(null)
    const [clickedItems, setClickedItems] = useState<string[]>([])

    const handleClickCollapse = useCallback(
        (name: string) => () => {
            setOpenCollapse((prev) => (prev === name ? null : name))
        },
        []
    )

    const handleToggle = useCallback(
        (name: string, value: string | boolean) => () => {
            const stringValue = String(value)
            setChecked((prevChecked) => {
                const newChecked = { ...prevChecked }
                if (newChecked[name] === stringValue) {
                    delete newChecked[name]
                } else {
                    newChecked[name] = stringValue
                }
                onFilterChange(name, stringValue)
                return newChecked
            })
        },
        [onFilterChange, setChecked]
    )

    const handleClickItem = useCallback(
        (name: string, value: string | boolean) => () => {
            const stringValue = String(value)
            setClickedItems((prev) => {
                const newClickedItems = prev.includes(stringValue)
                    ? prev.filter((item) => item !== stringValue)
                    : [...prev, stringValue]
                onFilterChange(name, stringValue)
                return newClickedItems
            })
        },
        [onFilterChange]
    )

    return (
        <Box sx={{ maxHeight: 300, overflowY: 'auto', width: '200px' }}>
            <List sx={{ bgcolor: 'background.paper', p: 0 }} component="nav" aria-labelledby="nested-list-subheader">
                {dataFilter.map(({ name, value, childs }) => (
                    <React.Fragment key={name}>
                        {childs.length > 0 ? (
                            <>
                                <ListItemButton onClick={handleClickCollapse(name)} sx={{ width: '100%' }}>
                                    <ListItemText primary={name} />
                                    {openCollapse === name ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openCollapse === name} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {childs.map((child) => (
                                            <ListItemButton
                                                key={String(child.value)}
                                                onClick={handleToggle(value, child.value)}
                                                sx={{ pl: 2, width: '100%' }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked[value] === child.value}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </Box>
                                                <ListItemText primary={child.name} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        ) : (
                            <ListItemButton onClick={handleClickItem(name, value)}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {clickedItems.includes(value) && <CheckIcon />} <ListItemText primary={name} />
                                </Box>
                            </ListItemButton>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    )
}

export default ListWithDynamicItems
