import { Typography, styled } from '@mui/material'

export const UnderlinedTypography = styled(Typography)(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    textDecoration: "underline",
    color: theme.palette.primary.main
  
}))
