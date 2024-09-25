const loginResponse = {
    success: true,
    message: 'loggedIn!',
    data: {
        id: 2,
        email: 'siwarbougrine@gmail.com',
        name: 'siwar',
        phone: '21311553',
        isActive: true,
        resetToken: null,
        typeId: 1,
        tenantId: null,
        createdAt: '2024-05-20T09:38:30.000Z',
        updatedAt: '2024-05-20T09:38:30.000Z'
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGFydG5lciIsImlkIjoyLCJ0ZW5hbnRJZCI6bnVsbCwiaWF0IjoxNzE2MTk3OTc1LCJleHAiOjE3MTYyODQzNzV9.jDuBoFxi1KC_uAzGqm4ad98jXyzC1GrHgOfoeZqFj8E'
}

const loginResponseParameters = {
    login: 'Test@example.com',
    password: 'Password123'
}

export { loginResponseParameters, loginResponse }
