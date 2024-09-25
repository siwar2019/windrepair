import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../../../translation/i18n'
import { store } from '../../../redux/store'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import axiosInstance from '../../../utils/axios'
import { ApiPaths } from '../../../utils/api-paths'
import { ROLES } from '../../../utils/constants'
import PartnerListView from '../../../components/partner/partner-list-view'
import { requestGetPartners } from '../../../controllers/partners.api'
import partnersResponse from './partners-list-data.mock'

const mockQueryClient = new QueryClient()

describe('PartnersList', () => {
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
                            <PartnerListView />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })
    beforeAll(() => {
        jest.mock('axios')
    })
    test('mock the getPartnersListApi function', async () => {
        const mockGet = jest.fn()
        axiosInstance.get = mockGet
        ;(axiosInstance.get as jest.Mock).mockResolvedValue({
            data: partnersResponse
        })
        const page = 1
        const itemsPerPage = 10
        const typeUser = ROLES.ADMIN
        const filters = {
            isActive: ['true']
        }
        const result = await requestGetPartners({
            page,
            itemsPerPage,
            typeUser: typeUser,
            filters
        })

        expect(result).toEqual(partnersResponse)

        expect(axiosInstance.get).toHaveBeenCalledWith(`${ApiPaths.PARTNER}/${ApiPaths.GET_ALL_PARTNER}`, {
            params: {
                page,
                itemsPerPage,
                typeUser
            }
        })
    })
})
