import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../../../translation/i18n'
import { store } from '../../../redux/store'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import axiosInstance from '../../../utils/axios'
import { requestAddEmployee } from '../../../controllers/employee.api'
import { ApiPaths } from '../../../utils/api-paths'
import AddEmployeeView from '../../../components/employee/addEmployee-view'
import { employee } from './addEmployee.data.mock'

const mockQueryClient = new QueryClient()
const email = 'test@gmail.com'
const name = 'testName'
const phone = '23558899'
const role = '1'

describe('EmployeeList', () => {
    afterEach(() => {
        cleanup()
        jest.clearAllMocks()
    })

    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <QueryClientProvider client={mockQueryClient}>
                        <I18nextProvider i18n={i18n}>
                            <AddEmployeeView
                                open={true}
                                closeModal={function (): void {
                                    throw new Error('')
                                }}
                            />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })
    beforeAll(() => {
        jest.mock('axios')
    })

    test('renders all input fields and confirm button', () => {
        expect(screen.getByText('First Name')).toBeInTheDocument()
        expect(screen.getByText('Last Name')).toBeInTheDocument()
        expect(screen.getByText('Phone')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Role')).toBeInTheDocument()
        expect(screen.getByTestId('confirm')).toBeInTheDocument()
    })
    test('mock the addEmployee API function', async () => {
        const mockPost = jest.fn()
        axiosInstance.post = mockPost
        ;(axiosInstance.post as jest.Mock).mockResolvedValue(requestAddEmployee)
        await requestAddEmployee(email, name, phone, role)

        expect(axiosInstance.post).toHaveBeenCalledWith(
            `${ApiPaths.ADD_EMPLOYEE}`,

            employee
        )
    })
})
