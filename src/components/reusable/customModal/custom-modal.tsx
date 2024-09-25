import { Button, Dialog, DialogContent, DialogTitle, Divider, Stack, useTheme } from '@mui/material'
import Image from '../reusableImage'
import CloseIcon from '@mui/icons-material/Close'
import { ReactNode } from 'react'
import { ImgPaths } from '../../../utils/image-paths'
interface IPropsModal {
    open: boolean
    handleClose: () => void
    children: ReactNode
    title?: ReactNode | string
    maxWidth?: string
    imageSrc?: string
}

const CustomModal = (props: IPropsModal) => {
    const { children, title, handleClose, open, maxWidth, imageSrc } = props
    const theme = useTheme()

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                p: 2,
                width: '100%',
                '& .MuiDialog-paper': {
                    width: '100%',
                    maxWidth: maxWidth
                }
            }}
        >
            <Stack direction="row" justifyContent="space-between">
                <Image sx={{ paddingLeft: '3%' }} src={imageSrc || ImgPaths.check_icon} />
                {title && <DialogTitle sx={{ color: theme.palette.common.black }}>{title}</DialogTitle>}
                <Button onClick={handleClose} >
                    <CloseIcon sx={{ color: theme.palette.common.black }} />
                </Button>
            </Stack>
            <Divider />

            <DialogContent>{children}</DialogContent>
        </Dialog>
    )
}

export default CustomModal
