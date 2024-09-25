import { I18nextProvider } from 'react-i18next'
import { cleanup, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CustomerListView from '../../../components/customer/view/customer-list-view'
import i18n from '../../../translation/i18n'
import { store } from '../../../redux/store'
import { BrowserRouter } from 'react-router-dom'
import axiosInstance from '../../../utils/axios'
import { customerListResponse } from './customer-list.data.mock'
import { requestGetCustomer } from '../../../controllers/customer.api'
import { ApiPaths } from '../../../utils/api-paths'
import { ROLES } from '../../../utils/constants'

const mockQueryClient = new QueryClient()

// Input values
const page = 1
const itemsPerPage = 8
const typeUser = ROLES.CLIENT

describe('CustomersList', () => {
    afterEach(() => {
        // clean up
        cleanup()
        //  clearing all mocks
        jest.clearAllMocks()
    })

    //integration of reactQuery & store in test

    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <QueryClientProvider client={mockQueryClient}>
                        <I18nextProvider i18n={i18n}>
                            <CustomerListView />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })

    beforeAll(() => {
        //mocking axios before all tests
        jest.mock('axios')
    })

    test('should mock the getCustomersListApi function', async () => {
        const mockGet = jest.fn()
        axiosInstance.get = mockGet

        ;(axiosInstance.get as jest.Mock).mockResolvedValue({
            data: customerListResponse
        })
        const filters = {
            isActive: ['true']
        }

        const result = await requestGetCustomer({
            typeUser,
            page,
            itemsPerPage,
            searchKeyword: '',
            filters
        })

        expect(result).toEqual(customerListResponse)

        expect(axiosInstance.get).toHaveBeenCalledWith(`${ApiPaths.USER}/${ApiPaths.GET_ALL_USERS}`, {
            params: {
                page,
                itemsPerPage
            }
        })
    })
})
