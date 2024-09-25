import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { Loading } from '../../components/reusable/loading'
import HomePage from '../../pages/home/home-page'
import AppLayout from '../../components/layouts/appLayout'
import DashBoardPage from '../../pages/dashBoard/dashBoard-page'
import AddEmployeePage from '../../pages/employee/add-employee-page'
import RolePermission from '../../components/auth/rolePermissions'
import RequireAuth from '../../components/auth/authPermission'
import { ROLES } from '../../utils/constants'
import { useSelector } from '../../redux/store'

const CustomerPage = lazy(() => import('../../pages/customer/customer-page'))
const EmployeePage = lazy(() => import('../../pages/employee/list-employee-page'))
const PartnerPage = lazy(() => import('../../pages/partner/list-partners-page'))
const ProductPage = lazy(() => import('../../pages/product/product-page'))

export const RoutesComponent = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return [
        {
            path: '/',
            element: (
                <AppLayout>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </AppLayout>
            ),
            children: [
                {
                    path: '/',
                    element: (
                        <RequireAuth isLoggedIn={isAuthenticated}>
                            <HomePage />
                        </RequireAuth>
                    )
                },
                { path: '/dashBoard', element: <DashBoardPage /> },
                {
                    path: '/addEmployee',
                    element: (
                        <RolePermission role={[ROLES.PARTNER]}>
                            <AddEmployeePage />
                        </RolePermission>
                    )
                },
                {
                    path: '/customer',
                    element: (
                        <RolePermission role={[ROLES.PARTNER]}>
                            <CustomerPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/employee',
                    element: (
                        <RolePermission role={[ROLES.PARTNER]}>
                            <EmployeePage />
                        </RolePermission>
                    )
                },
                {
                    path: '/product',
                    element: (
                        <RolePermission role={[ROLES.CLIENT, ROLES.EMPLOYEE, ROLES.PARTNER]}>
                            <ProductPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/partners',
                    element: (
                        <RolePermission role={[ROLES.CLIENT, ROLES.EMPLOYEE, ROLES.PARTNER]}>
                            <PartnerPage />
                        </RolePermission>
                    )
                }
            ]
        }
    ]
}
