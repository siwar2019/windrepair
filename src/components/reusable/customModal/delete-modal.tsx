import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { primaryFont } from '../../../theme/typography'
import { COMMON } from '../../../theme/palette'
import { useResponsive } from '../../../utils/use-responsive'
import { ImgPaths } from '../../../utils/image-paths'
import { useTranslations } from '../../../translation'
import { StyledActionButton, StyledIconButton, TrashIcon } from '../../../styles/modal.style'
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})
interface modalProps {
    open: boolean
    handleClose: () => void
    onDelete: () => void
    onCancel: () => void
    dialogTitle: string
    dialogContent: string
}

const DeleteModal = ({ open, handleClose, onDelete, onCancel, dialogTitle, dialogContent }: modalProps) => {
    const theme = useTheme()
    const { t } = useTranslations()
    const mdUp = useResponsive('up', 'md')
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
                width: '100%',
                ' & .MuiDialog-paper': {
                    width: mdUp ? '40%' : '100%'
                }
            }}
        >
            <TrashIcon src={ImgPaths.trash_icon_modal} alt="Logo" width={'4rem'} sx={{ ml: '1rem', mt: '1rem', mb: '0.1rem' }} />
            <DialogTitle
                sx={{
                    fontWeight: '700',
                    fontFamily: primaryFont,
                    '& .MuiDialogTitle': {
                        padding: '0px'
                    }
                }}
            >
                {dialogTitle}

                <StyledIconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </StyledIconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        wordBreak: 'break-word',
                        width:  '100%',
                        color: COMMON.grey[1000],
                        fontFamily: primaryFont,
                        lineHeight: '1.5',
                        mt: '0.01rem'
                    }}
                >
                    {t('employee.deleteConfirmation', { dialogContent: dialogContent })}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: '1rem', ml: '1rem' }}>
                <StyledActionButton
                    variant="contained"
                    onClick={onCancel}
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
                    onClick={onDelete}
                    backGroundColor={theme.palette.primary.main}
                    textColor={theme.palette.common.white}
                    hoover={false}
                    border={'none'}
                    type="submit"
                >
                    {t('modal.delele')}
                </StyledActionButton>
            </DialogActions>
        </Dialog>
    )
}
export default DeleteModal
