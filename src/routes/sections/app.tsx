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
import ContactUsPage from '../../pages/contact-us/contact-us-page'
import AboutPage from '../../pages/about/about-page'
import ServicePage from '../../pages/service/service-page'
import PricePage from '../../pages/price/price-page'
import RolePage from '../../pages/role/role-page'
import PaymentPage from '../../pages/payment/payment-admin-page'
import AddRolePage from '../../components/role/addRolePage'
import EditRolePage from '../../components/role/editRolePage'
import { paths } from '../paths'
import ListMenuPage from '../../pages/menu/list-menu-page'
import AddStore from '../../components/store/add-store'

const CustomerPage = lazy(() => import('../../pages/customer/customer-page'))
const EmployeePage = lazy(() => import('../../pages/employee/list-employee-page'))
const PartnerPage = lazy(() => import('../../pages/partner/list-partners-page'))
const ProductPage = lazy(() => import('../../pages/product/product-page'))
const InvoicePage = lazy(() => import('../../pages/invoice/invoice-page'))
const FundPage = lazy(() => import('../../pages/fund/list-find-page'))
const FundDetails = lazy(() => import('../../pages/fund/product-details-page'))

const EditProfilePage = lazy(() => import('../../pages/profile/edit-profile-page'))
const AddSettingsPage = lazy(() => import('../../pages/settings/add-setting'))
const ListSettingsPage = lazy(() => import('../../pages/settings/listSettings'))
const TestSettingsPage = lazy(() => import('../../pages/settings/testSettings'))

const DeliveryPage = lazy(() => import('../../pages/delivery/delivery-page'))

export const useAppRoutes = () => {
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
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <AddEmployeePage />
                        </RolePermission>
                    )
                },
                {
                    path: '/customer',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <CustomerPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/employee',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
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
                        <RolePermission role={[ROLES.ADMIN]}>
                            <PartnerPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/payments',
                    element: (
                        <RolePermission role={[ROLES.ADMIN]}>
                            <PaymentPage />
                        </RolePermission>
                    )
                },

                {
                    path: '/fund',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <FundPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/fund/:id/details',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <FundDetails />
                        </RolePermission>
                    )
                },
                {
                    path: '/invoice',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <InvoicePage />
                        </RolePermission>
                    )
                },
                {
                    path: '/edit-profile',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE, ROLES.CLIENT]}>
                            <EditProfilePage />
                        </RolePermission>
                    )
                },
                { path: '/contacts', element: <ContactUsPage /> },
                { path: '/about', element: <AboutPage /> },
                { path: '/service', element: <ServicePage /> },
                { path: '/price', element: <PricePage /> },
                {
                    path: '/role',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <RolePage />
                        </RolePermission>
                    )
                },
                {
                    path: '/AddRole',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <AddRolePage />
                        </RolePermission>
                    )
                },
                {
                    path: '/EditRole/:id',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <EditRolePage />
                        </RolePermission>
                    )
                },

                {
                    path: paths.app.menu,
                    element: (
                        <RolePermission role={[ROLES.ADMIN]}>
                            <ListMenuPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/store',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <AddStore />
                        </RolePermission>
                    )
                },
                {
                    path: '/addSettings',
                    element: (
                        <RolePermission role={[ROLES.PARTNER]}>
                            <AddSettingsPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/erp-settings',
                    element: (
                        <RolePermission role={[ROLES.PARTNER]}>
                            <ListSettingsPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/test-settings',
                    element: (
                        <RolePermission role={[ROLES.PARTNER]}>
                            <TestSettingsPage />
                        </RolePermission>
                    )
                },
                {
                    path: '/delivery',
                    element: (
                        <RolePermission role={[ROLES.PARTNER, ROLES.EMPLOYEE]}>
                            <DeliveryPage />
                        </RolePermission>
                    )
                }
            ]
        }
    ]
}
