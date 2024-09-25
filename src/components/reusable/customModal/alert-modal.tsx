import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { primaryFont } from '../../../theme/typography'
import { COMMON } from '../../../theme/palette'
import { useResponsive } from '../../../utils/use-responsive'
import { ImgPaths } from '../../../utils/image-paths'
import {  StyledCloseButton, TrashIcon } from '../../../styles/modal.style'
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
    dialogTitle: string
    dialogContent: string
    children: React.ReactNode
}

const AlertModal = ({ open, handleClose, dialogTitle, dialogContent, children }: modalProps) => {
  
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
            <Box sx={{ display: 'flex' }}>
                <TrashIcon src={ImgPaths.alert} alt="alert" width={'4rem'} sx={{ ml: '1rem', mt: '1rem', mb: '0.1rem' }} />
                <DialogTitle
                    sx={{
                        fontWeight: '700',
                        fontFamily: primaryFont,
                        mt: '1rem',
                        '& .MuiDialogTitle': {
                            padding: '0px'
                        }
                    }}
                >
                    {dialogTitle}
                </DialogTitle>
                <StyledCloseButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </StyledCloseButton>
            </Box>
            <DialogContent>
                <DialogContentText
                    sx={{
                        wordBreak: 'break-word',
                        width: '100%',
                        color: COMMON.grey[1000],
                        fontFamily: primaryFont,
                        lineHeight: '1.5'
                    }}
                >
                    {dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mb: '1rem', ml: '1rem' }}>
                {children}
            </DialogActions>
        </Dialog>
    )
}
export default AlertModal
