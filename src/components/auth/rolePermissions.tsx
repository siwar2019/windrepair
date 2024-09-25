import React from 'react'
import { Theme, SxProps } from '@mui/material/styles'
import { useSelector } from '../../redux/store'
import NotFoundPage from '../../pages/notFound/not-found-page'
import { Navigate } from 'react-router-dom'
import { paths } from '../../routes/paths'

type RoleGuardProps = {
    role: string[]
    children: React.ReactNode
    sx?: SxProps<Theme>
}

const RolePermission = ({ role, children }: RoleGuardProps): JSX.Element => {
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    if (!isAuthenticated) {
        return <Navigate to={paths.auth.login} />
    }

    const currentRole = user?.role
    const hasAccess = currentRole && role.includes(currentRole)

    if (!hasAccess) {
        return <NotFoundPage />
    }

    return <>{children}</>
}

export default RolePermission
