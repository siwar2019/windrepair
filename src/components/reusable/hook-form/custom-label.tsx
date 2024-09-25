import { forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { StyledLabel } from '../../../styles/custom-status.style'
import { Typography } from '@mui/material'

type CustomLabelProps = {
    backgroundColor?: string
    label: string
}

const CustomLabel = forwardRef<HTMLDivElement, CustomLabelProps>(({ backgroundColor, label }: CustomLabelProps, ref) => {
    const theme = useTheme()

    return (
        <StyledLabel sx={{ backgroundColor }}>
            <Typography color={theme.palette.common.white} align="center" variant="caption">
                {label}
            </Typography>
        </StyledLabel>
    )
})

export default CustomLabel
