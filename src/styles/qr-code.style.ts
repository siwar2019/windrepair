import { Box, styled } from '@mui/material'
import { COMMON } from '../theme/palette'

export const SectionOneBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '2rem'
}))

export const InnerBox = styled(Box)(({ theme }) => ({
    backgroundColor: COMMON.common.grey,
    width: '52%',
    minHeight: '45vh',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    position: 'relative'
}))

export const ImageBox = styled(Box)(({ theme }) => ({
    position: 'relative'
}))

export const OverlayBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    pointerEvents: 'none',
    zIndex: 1
}))

export const CornerImage = styled(Box)(({ theme }) => ({
    position: 'absolute'
}))

export const TopLeftImage = styled(CornerImage)(({ theme }) => ({
    top: '1px',
    left: '1px'
}))

export const TopRightImage = styled(CornerImage)(({ theme }) => ({
    top: '1px',
    right: '1px'
}))

export const BottomLeftImage = styled(CornerImage)(({ theme }) => ({
    bottom: '1px',
    left: '1px'
}))

export const BottomRightImage = styled(CornerImage)(({ theme }) => ({
    bottom: '1px',
    right: '1px'
}))
