export enum ApiPaths {
    // Auth
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    FORGOT_PASSWORD = '/auth/forgot-password',
    RESET_PASSWORD = '/auth/reset-password',
    //home
    HOME = '/',

    //user
    USER = '/user',
    GET_ALL_USERS = 'all-users',
    UPDATE_USER = 'update-user',
    EDIT_PROFILE = '/edit-profile',
    CHANGE_PASSWORD = '/change-password',
    GET_USER_DATA = 'get-user-data',
    ADD_EMAIL_ERP = 'add-email-erp',

    //employee
    ADD_EMPLOYEE = '/user/create-employee',
    DELETE_EMPLOYEE = '/delete-user',
    GET_USER = '/get-user',

    //roles
    GET_ALL_ROLES = '/all-roles',
    ROLE = '/role',
    ADD_NEW_ROLE = '/create-role',
    UPDATE_ROLE = '/update-role',
    DELETE_ROLE = '/delete-role',
    //Permissions
    GET_PERMISSION = '/permessions',

    // ticket
    GET_DEATILS_TICKET = '/ticket/details-ticket',

    //Product
    CREATE_PRPODUCT = '/product/create-product',
    PRODUCT = '/product',
    GET_ALL_PRODUCTS = '/all-products',
    DELETE_PRODUCT = '/delete-product',
    UPDATE_PRODUCT = '/update-product',
    ASSIGN_PRODUCT = '/assign-product',

    //partner
    PARTNER = '/partner',
    GET_ALL_PARTNER = '/all-partners',
    UPDATE_STATUS = '/update-partner',

    //invoice
    INVOICE = '/invoice',
    GET_ALL_INVOICES = '/all-invoices',

    //fund
    FUND = '/cash-register',
    GET_CASH_FUND = 'all',
    CREATE_CASH_FUND = 'create',
    UPDATE_CASH_FUND = '/update',
    DELETE_CASH_FUND = '/delete',
    UPDATE_STATUS_PRODUCT = 'update-product',

    //movement
    MOVEMENT = '/movement',
    CREATE_MOVEMENT = '/create',
    GET_DETAIL_FUND = '/all',

    //payment
    PAYMENT = '/payment',
    GET_ALL_PAYMENT = '/all',
    GET_PARTNER_PAYMENTS = '/partner-payments',

    //menu permissions
    MENU = '/menu',
    GET_ALL_MENUS_PARTNERS = '/all-menus-partner',
    GET_ALL_MENU_ROLE = '/all-menus-role',
    GENERATE_QR_IMAGE = '/generate-qr-image',
    GET_STATUS = '/status',
    GET_ALL_MENUS_ROLE = '/all-menus-role',
    GET_ALL_MENU = '/all-menus',
    CREATE_MENU = '/create-menu',

    DELETE_MENU = '/delete-menu',
    UPDATE_MENU = '/update-menu',

    // statistique
    STATISTIC = '/statistic',
    GET_STATISTIC = '/all/',

    //settings
    SETTINGS = '/settings',
    CREATE_SETTINGS = '/create',
    GET_SETTINGS = '/all',
    GET_SETTINGS_BY_ID = '/get-setting',
    GET_DETAILS_ERP_SETTINGS = '/get-details-erp-test',

    //connect to erp plateform
    GET_TOKEN_ERP = '/auth-erp',
    CREATE_ERP_SETTING = '/create-erp-setting',
    GET_ALL_CATEGORY_AND_PRODUCTS_ERP = '/get-category-products-by-name',
    GET_SELLING_DATE = '/get-selling-date',
    GET_ALL_CATEGORY_AND_PRODUCTS_COUNT_ERP = '/get-category-products-count',

    GET_ALL_DELIVERY = '/getAllDelivery',
    CONFIRM_DELIVERY = '/confirm-delivery',
    PAY_DELIVERY = '/pay-delivery',
    CREATE_DELIVERY = '/create-delivery',

    //notification
    NOTIFICATIONS = '/notifications',
    GET_ALL_NOTIFICATIONS = '/all',
    UPDATE_NOTIFICATIONS = '/update',

    //store
    STORE = '/store',
    CREATE_STORE = '/create-store',
    GET_STORES = '/all',
    GET_DETAILS_STORE = '/get-details'
}
