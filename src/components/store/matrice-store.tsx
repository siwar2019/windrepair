import { Box, Grid, Tooltip, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CustomTextField from '../reusable/hook-form/custom-text-field'
import { UseFormReturn } from 'react-hook-form'
import { IAddStoreFormValues, Row, Store } from '../../interfaces/store/store'
import { useTranslations } from '../../translation'
import { AddLineButton, AddColumnButton, NumberButton, SubStoreButton, ProductCountBadge } from '../../styles/store.style'

type MatriceListProps = {
    methods: UseFormReturn<IAddStoreFormValues>
    storeIndex: number
    store: Store
}

const MatrixComponent = ({ methods, storeIndex, store }: MatriceListProps) => {
    const theme = useTheme()
    const { t } = useTranslations()
    const { getValues, setValue } = methods
    const [columns, setColumns] = useState<string[]>(store.columns || [])

    const [headerValues, setHeaderValues] = useState<string[]>(store.columns || [])
    const isReadOnly = store.id !== -1
    const initialRows = store.nbrLines > 0 ? store.nbrLines : 1

    const [rows, setRows] = useState<Row[]>(
        Array.from({ length: initialRows }, (_, index) => ({
            id: index,
            number: index + 1,
            cells: columns.map((col) => `${col}${index + 1}`)
        }))
    )

    const addRow = () => {
        const newRowNumber = rows.length + 1
        const newRowCells = (headerValues || []).map((headerValue) => `${headerValue}${newRowNumber}`)
        setRows((prevRows) => [...prevRows, { id: prevRows.length, number: newRowNumber, cells: newRowCells }])

        const stores = getValues('stores')
        const updatedStores = stores.map((store, index) => {
            if (index === storeIndex) {
                return { ...store, nbrLines: newRowNumber }
            }
            return store
        })
        setValue('stores', updatedStores)
    }

    const addColumn = () => {
        if (isReadOnly) return

        setColumns((prevColumns) => {
            const newColumn = ''
            setRows((prevRows) =>
                prevRows.map((row) => ({
                    ...row,
                    cells: [...(row.cells || []), '']
                }))
            )
            setHeaderValues((prevHeaderValues) => [...prevHeaderValues, newColumn])
            return [...prevColumns, newColumn]
        })

        const stores = getValues('stores')
        const updatedStores = stores.map((store, index) => {
            if (index === storeIndex) {
                return { ...store, columns: [...(columns || []), ''] }
            }
            return store
        })
        setValue('stores', updatedStores)
    }

    const handleHeaderChange = (index: number, value: string) => {
        const updatedHeaderValues = [...headerValues]
        updatedHeaderValues[index] = value
        setHeaderValues(updatedHeaderValues)

        const updatedRows = rows.map((row) => ({
            ...row,
            cells: row.cells.map((cell, colIndex) => `${updatedHeaderValues[colIndex] || ''}${row.number}`)
        }))
        setRows(updatedRows)

        const stores = getValues('stores')
        const updatedStores = stores.map((store, index) => {
            if (index === storeIndex) {
                return { ...store, columns: updatedHeaderValues }
            }
            return store
        })
        setValue('stores', updatedStores)
    }

    return (
        <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Grid container direction="column">
                <Grid container spacing={2} wrap="nowrap" alignItems="center">
                    <Grid item sx={{ paddingBottom: 2 }}>
                        <AddLineButton name="buttonForAddLine" variant="outlined" onClick={addRow} disabled={isReadOnly}>
                            <AddIcon />
                        </AddLineButton>
                    </Grid>
                    {headerValues.map((value, index) => (
                        <Grid item key={`header-field-${index}`}>
                            <CustomTextField
                                name={`header-field-${index}`}
                                type="text"
                                border="simpleTextField"
                                onChange={(e) => handleHeaderChange(index, e.target.value)}
                                value={value}
                                sx={{
                                    paddingBottom: 2,
                                    borderRadius: 5,
                                    width: '80px',
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme.palette.primary.main
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        color: theme.palette.primary.main
                                    },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-input': {
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }
                                }}
                                disabled={isReadOnly}
                            />
                        </Grid>
                    ))}
                    <Grid item sx={{ paddingBottom: 1.5 }}>
                        <AddColumnButton name="buttonForAddColumn" variant="contained" onClick={addColumn} disabled={isReadOnly}>
                            <AddIcon />
                        </AddColumnButton>
                    </Grid>
                </Grid>
                {store && store.subStores && store.subStores.length !== 0 ? (
                    <>
                        {Array.from({ length: store.nbrLines }, (_, rowIndex) => (
                            <Grid container key={rowIndex} spacing={2} wrap="nowrap" alignItems="center">
                                <Grid item sx={{ paddingBottom: 1.8 }}>
                                    <NumberButton name="buttonForNumberOfine" variant="contained">
                                        {rowIndex + 1}
                                    </NumberButton>
                                </Grid>

                                {store.subStores &&
                                    store.subStores
                                        .filter((_, index) => index % store.nbrLines === rowIndex)
                                        .map((subStore, colIndex) => (
                                            <Grid item key={subStore.id} sx={{ position: 'relative' }}>
                                                <Box sx={{ paddingBottom: 1.55 }}>
                                                    <SubStoreButton name={`button-${subStore.id}-${colIndex}`} variant="outlined">
                                                        {subStore.name}
                                                        <Tooltip
                                                            title={
                                                                <Box
                                                                    sx={{
                                                                        fontSize: '12px',
                                                                        display: 'flex',
                                                                        flexDirection: 'column'
                                                                    }}
                                                                >
                                                                    {subStore.productNames && subStore.productNames.length > 0 ? (
                                                                        subStore.productNames.map((name, index) => (
                                                                            <Typography
                                                                                key={index}
                                                                                variant="body2"
                                                                                sx={{ marginBottom: '4px' }}
                                                                            >
                                                                                {name}
                                                                            </Typography>
                                                                        ))
                                                                    ) : (
                                                                        <Typography variant="body2">
                                                                            {t('ticketPage.noData')}
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            }
                                                        >
                                                            <ProductCountBadge>{subStore.productNames.length}</ProductCountBadge>
                                                        </Tooltip>
                                                    </SubStoreButton>
                                                </Box>
                                            </Grid>
                                        ))}
                            </Grid>
                        ))}
                    </>
                ) : (
                    <>
                        {rows.map((row) => (
                            <Grid container key={row.id} spacing={2} wrap="nowrap" alignItems="center">
                                <Grid item sx={{ paddingBottom: 1.8 }}>
                                    <NumberButton name="buttonForAddColumn" variant="contained">
                                        {row.number}
                                    </NumberButton>
                                </Grid>
                                {row.cells.map((cell, colIndex) => (
                                    <Grid item key={`textField-${row.id}-${colIndex}`}>
                                        <CustomTextField
                                            name={`field-${row.id}-${colIndex}`}
                                            value={cell}
                                            type="text"
                                            border="simpleTextField"
                                            sx={{
                                                paddingBottom: 2,
                                                borderRadius: 5,
                                                width: '80px',
                                                '& .MuiOutlinedInput-root .MuiOutlinedInput-input': {
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }
                                            }}
                                            disabled
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
        </Box>
    )
}

export default MatrixComponent
