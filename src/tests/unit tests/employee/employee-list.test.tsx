import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../../../translation/i18n'
import { store } from '../../../redux/store'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import axiosInstance from '../../../utils/axios'
import { requestGetEmployee } from '../../../controllers/employee.api'
import { employeeListResponse } from './employee-list.data.mock'
import { ApiPaths } from '../../../utils/api-paths'
import { ROLES } from '../../../utils/constants'
import EmployeeListView from '../../../components/employee/employee-list-view'

const mockQueryClient = new QueryClient()

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
                            <EmployeeListView />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })
    beforeAll(() => {
        jest.mock('axios')
    })
    test('mock the getEmployeeListApi function', async () => {
        const mockGet = jest.fn()
        axiosInstance.get = mockGet

        ;(axiosInstance.get as jest.Mock).mockResolvedValue({
            data: employeeListResponse
        })
        const page = 1
        const itemsPerPage = 10
        const typeUser = ROLES.PARTNER
        const filters = {
            isActive: ['true']
        }
        const result = await requestGetEmployee({
            page,
            itemsPerPage,
            typeUser: typeUser,
            filters
        })

        expect(result).toEqual(employeeListResponse)

        expect(axiosInstance.get).toHaveBeenCalledWith(`${ApiPaths.USER}/${ApiPaths.GET_ALL_USERS}`, {
            params: {
                page,
                itemsPerPage,
                typeUser
            }
        })
    })
})
