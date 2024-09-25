import React from 'react'
import { Button, Box, Tooltip, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { COMMON } from '../../theme/palette'
import { SubStore } from '../../interfaces/store/store'
import { useTranslations } from '../../translation'

interface StoreButtonProps {
    rowIndex: number
    colIndex: number
    subStore: SubStore
    activeButton: { row: number; col: number } | null
    handleButtonClick: (rowIndex: number, colIndex: number, subStoreId: number) => void
}

const StoreButton: React.FC<StoreButtonProps> = ({ rowIndex, colIndex, subStore, activeButton, handleButtonClick }) => {
    const theme = useTheme()
    const { t } = useTranslations()
    return (
        <Button
            name="buttonStore"
            variant="contained"
            onClick={() => handleButtonClick(rowIndex, colIndex, subStore.id)}
            sx={{
                backgroundColor:
                    activeButton?.row === rowIndex && activeButton?.col === colIndex
                        ? COMMON.common.orangeWhite
                        : theme.palette.common.white,
                color:
                    activeButton?.row === rowIndex && activeButton?.col === colIndex
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                borderRadius: 1,
                border: `2px solid ${
                    activeButton?.row === rowIndex && activeButton?.col === colIndex
                        ? theme.palette.primary.main
                        : theme.palette.common.black
                }`,
                '&:hover': {
                    backgroundColor:
                        activeButton?.row === rowIndex && activeButton?.col === colIndex
                            ? COMMON.common.orangeWhite
                            : theme.palette.common.white,
                    border: `2px solid ${
                        activeButton?.row === rowIndex && activeButton?.col === colIndex
                            ? theme.palette.primary.main
                            : theme.palette.common.black
                    }`
                },
                width: '80px',
                height: '56px',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                position: 'relative'
            }}
        >
            {subStore.name}
            <Tooltip
                title={
                    <Box sx={{ fontSize: '12px', display: 'flex', flexDirection: 'column' }}>
                        {subStore.productNames.length > 0 ? (
                            subStore.productNames.map((name, index) => (
                                <Typography key={index} variant="body2" sx={{ marginBottom: '4px' }}>
                                    {name}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2"> {t('ticketPage.noData')}</Typography>
                        )}
                    </Box>
                }
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor:
                            activeButton?.row === rowIndex && activeButton?.col === colIndex
                                ? theme.palette.primary.main
                                : theme.palette.common.black,
                        color: theme.palette.common.white,
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        borderRadius: '0 25% 0 25%',
                        zIndex: 1
                    }}
                >
                    {subStore.productCount}
                </Box>
            </Tooltip>
        </Button>
    )
}

export default StoreButton
