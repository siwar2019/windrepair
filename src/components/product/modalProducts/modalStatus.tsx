import { Button } from '@mui/base'
import { DialogActions, Typography, useTheme } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { onChange } from 'react-toastify/dist/core/store'
import { IUpdateProduct } from '../../../interfaces/product/product'
import { StyledActionButton } from '../../../styles/modal.style'
import CustomModal from '../../reusable/customModal/custom-modal'

type PropsStatus = {
    open: boolean
    handleClose: () => void
    currentStatus: null
    onChange: VoidFunction
}
const ModalStatus = ({ open, handleClose, currentStatus, onChange }: PropsStatus) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <CustomModal open={open} handleClose={handleClose} title="change status">
            <Stack spacing={3}>
                <Typography>
                    {t('productPage.titleUpdate')} : {currentStatus}
                </Typography>
                <DialogActions sx={{ mb: '1rem', ml: '1rem' }}>
                    <StyledActionButton
                        variant="contained"
                        onClick={handleClose}
                        data-testid="registerButton"
                        backGroundColor={theme.palette.common.white}
                        textColor={theme.palette.common.black}
                        hoover={false}
                        border={theme.palette.grey['800']}
                        type="submit"
                    >
                        {t('modal.cancel')}
                    </StyledActionButton>
                    <StyledActionButton
                        variant="contained"
                        data-testid="registerButton"
                        onClick={onChange}
                        backGroundColor={theme.palette.primary.main}
                        textColor={theme.palette.common.white}
                        hoover={false}
                        border={'none'}
                        type="submit"
                    >
                        {t('productPage.update')}
                    </StyledActionButton>
                </DialogActions>
            </Stack>
        </CustomModal>
    )
}

export default ModalStatus
