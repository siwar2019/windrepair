import CustomModal from '../reusable/customModal/custom-modal'
import { Box, Grid, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetDetailsStore } from '../../hooks/store/store.hooks'
import { Loading } from '../reusable/loading'
import CustomButton from '../reusable/hook-form/custom-button'
import { Dispatch, SetStateAction, useState } from 'react'
import StoreButton from './store-button'
import { SubStore } from '../../interfaces/store/store'
import { capitalize } from '../../utils/capitalize'

export interface DisplayStoreProps {
    open: boolean
    onClose: () => void
    selectedStore: number
    setSelectedSubStoreId: Dispatch<SetStateAction<number | null>>
    setSelectedSubStoreName: Dispatch<SetStateAction<string>>
}

const DisplayDetailsStore = ({ open, onClose, selectedStore, setSelectedSubStoreId, setSelectedSubStoreName }: DisplayStoreProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const { data: storeData, isLoading } = useGetDetailsStore(selectedStore)
    const [activeButton, setActiveButton] = useState<{ row: number; col: number } | null>(null)

    const handleButtonClick = (rowIndex: number, colIndex: number, subStoreId: number, subStoreName: string) => {
        setActiveButton({ row: rowIndex, col: colIndex })
        setSelectedSubStoreId(subStoreId)
        const combinedName = `${capitalize(storeData?.data?.name || '')} - ${capitalize(subStoreName || '')}`
        setSelectedSubStoreName(combinedName)
    }

    const handleClose = () => {
        setSelectedSubStoreId(null)
        setSelectedSubStoreName('')
        onClose()
    }

    return (
        <CustomModal open={open} handleClose={onClose} title={t('storePage.detailsStore')}>
            {isLoading ? (
                <Loading />
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Grid container spacing={2} justifyContent="center" alignItems="center" gap={1}>
                        {storeData?.data?.nbrLines &&
                            Array.from({ length: storeData.data.nbrLines }).map((_, rowIndex) => (
                                <Grid item xs={12} key={rowIndex} container justifyContent="center" alignItems="center" spacing={2}>
                                    {storeData.data.subStores
                                        .slice(
                                            rowIndex * storeData.data.columns.length,
                                            (rowIndex + 1) * storeData.data.columns.length
                                        )
                                        .map((subStore: SubStore, colIndex: number) => (
                                            <Grid item key={subStore.id} position="relative">
                                                <StoreButton
                                                    rowIndex={rowIndex}
                                                    colIndex={colIndex}
                                                    subStore={subStore}
                                                    activeButton={activeButton}
                                                    handleButtonClick={(row, col, id) =>
                                                        handleButtonClick(row, col, id, subStore.name)
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            ))}
                        <Grid container spacing={2} justifyContent="center" alignItems="center" paddingTop={4}>
                            <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                    <CustomButton
                                        onClick={handleClose}
                                        variant="contained"
                                        data-testid="closeButton"
                                        backGroundColor={theme.palette.common.white}
                                        textColor={theme.palette.common.black}
                                        hoover={false}
                                        border={'none'}
                                        sx={{ padding: '1px', width: '7rem', fontSize: '1rem' }}
                                    >
                                        {t('common.close')}
                                    </CustomButton>
                                    <CustomButton
                                        variant="contained"
                                        data-testid="confirmButton"
                                        backGroundColor={theme.palette.primary.main}
                                        textColor={theme.palette.common.white}
                                        hoover={false}
                                        border={'none'}
                                        onClick={onClose}
                                        sx={{ padding: '1px', width: '7rem', fontSize: '1rem' }}
                                    >
                                        {t('common.confirm')}
                                    </CustomButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </CustomModal>
    )
}

export default DisplayDetailsStore
