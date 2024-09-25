import React from 'react'
// @mui
import { Box } from '@mui/material'
type AuthLayoutProps = {
    children: React.ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <Box
            sx={{
                height: '100%',
                flexGrow: 1
            }}
        >
            {children}
        </Box>
    )
}

export default AuthLayout
