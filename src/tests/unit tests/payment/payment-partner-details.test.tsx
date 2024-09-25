import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import i18n from '../../../translation/i18n'
import { store } from '../../../redux/store'
import { cleanup, render } from '@testing-library/react'
import axiosInstance from '../../../utils/axios'
import { ApiPaths } from '../../../utils/api-paths'
import { ROLES } from '../../../utils/constants'
import {  requestGetPaymentPartner } from '../../../controllers/partners.api'
import PaymentPartnerDetailsView from '../../../components/payment/view/payment-partner-details'
import paymentPartnerDetailsResponse from './payment-partner-details.data.mock'

const mockQueryClient = new QueryClient()

describe('PaymentPartnerDetails', () => {
    const id = 8
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
                            <PaymentPartnerDetailsView id={id} open={true}
                                onClose={function (): void {
                                    throw new Error('')
                                }} />
                        </I18nextProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </Provider>
        )
    })
    beforeAll(() => {
        jest.mock('axios')
    })
    test('mock the getPaymentPartnerDetailsApi function', async () => {
        const mockGet = jest.fn()
        axiosInstance.get = mockGet
        ;(axiosInstance.get as jest.Mock).mockResolvedValue({
            data: paymentPartnerDetailsResponse
        })
        const page = 1
        const itemsPerPage = 10
        const typeUser = ROLES.ADMIN
        const result = await requestGetPaymentPartner(id)

        expect(result).toEqual(paymentPartnerDetailsResponse)

        expect(axiosInstance.get).toHaveBeenCalledWith(`${ApiPaths.PAYMENT}/${ApiPaths.GET_PARTNER_PAYMENTS}`, {
            params: {
                page,
                itemsPerPage,
                typeUser
            }
        })
    })
})
