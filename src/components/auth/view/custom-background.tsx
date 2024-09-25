import { Box } from '@mui/material'
import { useResponsive } from '../../../utils/use-responsive'
import LeftSideBackGround from './Left-side-background'
import { StyledElementBox } from '../../../styles/auth.style'

type CustomBackgroundProps = {
    element: JSX.Element
}
const CustomBackground = ({ element }: CustomBackgroundProps) => {
    const mdUp = useResponsive('up', 'md')
    return (
        <Box display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} sx={{ height: '100%' }}>
            {mdUp && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyItems: 'center',
                        alignItems: 'center'
                    }}
                >
                    <LeftSideBackGround />
                </Box>
            )}
            <StyledElementBox
                sx={{
                    alignItems: { xs: 'flex-start', sm: 'center' }
                }}
            >
                {element}
            </StyledElementBox>
        </Box>
    )
}
export default CustomBackground
