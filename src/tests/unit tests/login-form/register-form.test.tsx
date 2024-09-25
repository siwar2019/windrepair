import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../../redux/store'
import i18n from '../../../translation/i18n'
import '@testing-library/jest-dom'
import { paths } from '../../../routes/paths'
import axiosInstance from '../../../utils/axios'
import { requestRegister } from '../../../controllers/auth.api'
import { ApiPaths } from '../../../utils/api-paths'
import { registerResponse, registerResponseParameters } from './register-form.data.mock'
import RegisterForm from '../../../components/auth/register/register-form'

describe('registerForm', () => {
    afterEach(() => {
        // clean up
        cleanup()
        //  clearing all mocks
        jest.clearAllMocks()
    })
    beforeAll(() => {
        //mocking axios before all tests
        jest.mock('axios')
    })

    //integration of reactQuery & store in test

    beforeEach(() => {
        const mockQueryClient = new QueryClient()

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <QueryClientProvider client={mockQueryClient}>
                        <I18nextProvider i18n={i18n}>
                            <RegisterForm />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })
    test('Register form', () => {
        expect(screen.getByPlaceholderText('Company Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    })
    test('navigate to login page', async () => {
        const toLogin = screen.getByTestId('forwardToLogin')
        expect(toLogin).toBeInTheDocument()
        await act(async () => {
            fireEvent.click(toLogin)
            await waitFor(() => {
                expect(window.location.pathname).toBe(paths.auth.login)
            })
        })
    })
    test('should mock the registerApi function', async () => {
        const mockPost = jest.fn()
        axiosInstance.post = mockPost
        ;(axiosInstance.post as jest.Mock).mockResolvedValue(registerResponse)

        const result = await requestRegister({
            email: registerResponseParameters.email,
            password: registerResponseParameters.password,
            companyName: registerResponseParameters.companyName,
            phone: registerResponseParameters.phone,
            typePayment: registerResponseParameters.typePayment,
            subscriptionId: registerResponseParameters.subscriptionId,
            nbrEmploye: registerResponseParameters.nbrEmploye
        })

        expect(result).toEqual(registerResponse)

        expect(axiosInstance.post).toHaveBeenCalledWith(ApiPaths.REGISTER, {
            email: registerResponseParameters.email,
            password: registerResponseParameters.password,
            name: registerResponseParameters.companyName,
            phone: registerResponseParameters.phone
        })
    })
})
