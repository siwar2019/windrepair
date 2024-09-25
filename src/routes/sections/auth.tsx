import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Loading } from '../../components/reusable/loading'
import AuthLayout from '../../components/layouts/auth/authLayout'

const LoginPage = lazy(() => import('../../pages/login/login-page'))
const RegisterPage = lazy(() => import('../../pages/register/register-page'))
const ForgotPasswordPage = lazy(() => import('../../pages/forgotPassword/forgot-password-page'))
const ResetPasswordPage = lazy(() => import('../../pages/resetPassword/reset-password-page'))

export const authRoutes = [
    {
        path: 'auth',
        element: (
            <AuthLayout>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </AuthLayout>
        ),
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: 'reset-password/:token',
                element: <ResetPasswordPage />
            }
        ]
    }
]
