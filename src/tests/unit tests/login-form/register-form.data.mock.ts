import { TYPE_PAYMENT } from '../../../utils/constants'

const registerResponse = {
    success: true,
    message: 'partnerAddedSuccessfully',
    data: {
        isActive: true,
        id: 18,
        email: 'siwarbougrinesz@gmail.com',
        phone: '21311553',
        companyName: 'siwar',
        typeId: 1,
        updatedAt: '2024-05-21T10:19:16.138Z',
        createdAt: '2024-05-21T10:19:16.138Z'
    }
}
const registerResponseParameters = {
    email: 'test@gmail.com',
    password: 'password123',
    phone: '23558822',
    companyName: 'phoneRepair',
    nbrEmploye: 2,
    subscriptionId: 2,
    typePayment: TYPE_PAYMENT.FREE
}

export { registerResponse, registerResponseParameters }
