const ROOTS = {
    AUTH: '/auth',
    APP: '/',
    NEW_APP: '/app',
    TICKET: './ticket'
}

export const paths = {
    page403: '/403',
    page404: '/404',
    page500: '/500',

    // AUTH
    auth: {
        login: `${ROOTS.AUTH}/login`,
        register: `${ROOTS.AUTH}/register`,
        forgotPassword: `${ROOTS.AUTH}/forgot-password`,
        payment: `${ROOTS.AUTH}/payment`
    },

    // APP
    app: {
        root: ROOTS.APP,
        home: `${ROOTS.APP}home `,
        contacts: `${ROOTS.APP}contacts`,
        about: `${ROOTS.APP}about`,
        service: `${ROOTS.APP}service`,
        price: `${ROOTS.APP}price`,
        dashBoard: `${ROOTS.APP}dashboard `,
        customer: `${ROOTS.APP}customer`,
        employee: `${ROOTS.APP}employee`,
        product: `${ROOTS.APP}product`,
        partners: `${ROOTS.APP}partners`,
        invoice: `${ROOTS.APP}invoice`,
        role: `${ROOTS.APP}role`,
        fund: `${ROOTS.APP}fund`,
        details: (id: string) => `${ROOTS.APP}fund/${id}/details`,
        payment: `${ROOTS.APP}payments`,
        menu: `${ROOTS.APP}menu`,
        addRole: `${ROOTS.APP}AddRole`,
        editRole: (id: string) => `${ROOTS.APP}editRole/${id}`,
        store: `${ROOTS.APP}store`,
        delivery: `${ROOTS.APP}delivery`
    },

    // ticket
    ticket: {
        ticket: `/details-ticket`
    }
}
