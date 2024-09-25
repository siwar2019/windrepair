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
import { loginResponse, loginResponseParameters } from './login-form.data.mock'
import { requestLogin } from '../../../controllers/auth.api'
import { ApiPaths } from '../../../utils/api-paths'
import LoginForm from '../../../components/auth/login/Login-form'

describe('loginForm', () => {
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
                            <LoginForm />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })
    test('login form', () => {
        expect(screen.getByTestId('loginButton')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    })
    test('navigate to register page', async () => {
        const toRegister = screen.getByTestId('forwardRegister')
        expect(toRegister).toBeInTheDocument()
        await act(async () => {
            fireEvent.click(toRegister)
            await waitFor(() => {
                expect(window.location.pathname).toBe(paths.auth.register)
            })
        })
    })
    test('should mock the loginApi function', async () => {
        const mockPost = jest.fn()
        axiosInstance.post = mockPost

        ;(axiosInstance.post as jest.Mock).mockResolvedValue(loginResponse)

        const result = await requestLogin(loginResponseParameters.login, loginResponseParameters.password)

        expect(result).toEqual(loginResponse)

        expect(axiosInstance.post).toHaveBeenCalledWith(ApiPaths.LOGIN, {
            username: loginResponseParameters.login,
            password: loginResponseParameters.password
        })
    })
})
