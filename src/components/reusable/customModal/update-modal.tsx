import { ReactNode } from 'react'
import { useTranslations } from '../../../translation'
import CustomModal from './custom-modal'
import { Box, DialogActions, DialogContent, useTheme } from '@mui/material'
import { StyledActionButton } from '../../../styles/modal.style'
import { ImgPaths } from '../../../utils/image-paths'
interface IUpdateProps {
    close: () => void
    open: boolean
    description: ReactNode | string
    onConfirm?: any
}
const UpdateModal = ({ close, open, description, onConfirm }: IUpdateProps) => {
    const { t } = useTranslations()
    const theme = useTheme()

    return (
        <CustomModal
            open={open}
            maxWidth="fit-content"
            handleClose={close}
            title={t('updateModal.title')}
            imageSrc={ImgPaths.updateIcon}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <DialogContent>{t('updateModal.confirmation', { status: description })}</DialogContent>
                <DialogActions sx={{ width: '20rem' }}>
                    <StyledActionButton
                        variant="contained"
                        data-testid="registerButton"
                        backGroundColor={theme.palette.common.white}
                        textColor={theme.palette.common.black}
                        hoover={false}
                        border={theme.palette.grey['800']}
                        type="submit"
                        onClick={close}
                    >
                        {t('modal.cancel')}
                    </StyledActionButton>
                    <StyledActionButton
                        variant="contained"
                        data-testid="registerButton"
                        backGroundColor={theme.palette.primary.main}
                        textColor={theme.palette.common.white}
                        hoover={false}
                        border={'none'}
                        type="submit"
                        onClick={onConfirm}
                    >
                        {t('updateModal.confirm')}
                    </StyledActionButton>
                </DialogActions>
            </Box>
        </CustomModal>
    )
}
export default UpdateModal
