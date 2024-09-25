export const default_route = 'HOME'
export const drawersWidth = 120
export const currency = 'TND'
export const currencyInput = 'DAYS'
export const amountPayment = 50
export const amountPaymentFree = 0
export enum ROLES {
    ADMIN = 'admin',
    PARTNER = 'partner',
    EMPLOYEE = 'employee',
    CLIENT = 'client'
}
export enum Type {
    QR_CODE = 'qrCode',
    CODE = 'code'
}

export enum Password {
    PASSWORD = 'password',
    WITHOUT_PASSWORD = 'withoutPassword'
}

export enum PRODUCT_STATUS {
    PENDING = 'pending',
    CLOSED_SUCCESS = 'closedSuccess',
    CLOSED_FAIL = 'closedFail',
    IN_PROGRESS = 'inProgress'
}

export enum PAYMENT_METHOD {
    CASH = 'cash',
    CHEQUE = 'cheque'
}

export enum PARTNER_STATUS {
    ACTIVE = 1,
    INACTIVE = 0
}

export enum TYPE_PAYMENT {
    FREE = 'free',
    STANDARD = 'standard'
}

export enum STATUS_PAYMENT {
    PAID = 'PAID',
    UNPAID = 'UNPAID',
    EXPIRED = 'EXPIRED'
}

export enum subscription {
    EXPIRED = 'subscriptionExpired',
    NOT_PAID = 'subscriptionNotPaid'
}
export const PERIOD_LIST = ['12m', '30d', '7d', '1d']

export enum ROLE_PERMISSION {
    //ticket
    ADD_TICKET = 'add_ticket',
    EDIT_TICKET = 'edit_ticket',
    DELETE_TICKET = 'delete_ticket',
    VIEW_TICKET = 'view_tickets',
    PAY_TICKET = 'add_mouvement',
    AFFECT_TO_ME = 'assign_ticket',
    VIEW_DETIALS_TICKET = 'view_details_ticket',
    TICKET = 'ticket',

    //employee
    EMPLOYEE = 'employee',
    ADD_EMPLOYEE = 'add_employee',
    EDIT_EMPLOYEE = 'edit_employee',
    DELETE_EMPLOYEE = 'delete_employee',

    //fund
    FUND = 'fund',
    ADD_FUND = 'add_fund',
    EDIT_FUND = 'edit_fund',
    DELETE_FUND = 'delete_fund',
    VIEW_DETAILS_FUND = 'view_details_fund',

    //role
    ROLE = 'role',
    ADD_ROLE = 'add_role',
    EDIT_ROLE = 'edit_role',
    DELETE_ROLE = 'delete_role',

    //customer
    CUSTOMER = 'customer',
    EDIT_CUSTOMER = 'edit_customer',

    //invoice
    INVOICE = 'invoice',

    //sideBar Menu
    VIEW_CUSTOMER_MENU = 'view_customer',
    VIEW_TICKET_MENU = 'view_tickets',
    VIEW_EMPLOYEE_MENU = 'view_employees',
    VIEW_ROLES_MENU = 'view_roles',
    VIEW_INVOICES_MENU = 'view_invoices',
    VIEW_FUND_MENU = 'view_funds',

    //store
    STORE = 'store',
    VIEW_STORES = 'view_stores',
    ADD_STORE = 'add_store',

    //delivery
    DELIVERY = 'deliver',
    VIEW_DELIVERY = 'view_delivery',
    CONFIRM_DELIVERY = 'confirm_delivery',
    PAY_DELIVERY = 'pay_delivery',
    CREATE_DELIVERY = 'create_delivery'
}

export enum Language {
    FR = 'fr',
    EN = 'en'
}
export enum EndPointType {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete'
}
export enum TypeParamsSetting {
    STRING = 'string',
    INTEGER = 'integer',
    BOOLEAN = 'boolean'
}

export enum StatusDelivred {
    DELIVRED = 'LIVRE',
    NOT_DELIVRED = 'NON_LIVRE'
}

export enum PaymentStatusDelivred {
    PAYED = 'PAYE',
    NOT_PAYED = 'NON_PAYE'
}
