export interface IAddSettings {
    name: string
    endPoint: string
    params: string
    paramsValue?: string
    pathToGuarantee: string
    pathToSaleDate: string
    output: string
    authEndPoint: string
    username: string
    password: string
}
export interface IListSettings {
    name: string
    endPointProd: string
    typeEndPoint: string
    paramsSettings: IParamsSettings[]
}
export interface IParamsSettings {
    name: string
    type: string
    value: string
    id?: number
}
export interface IAddSetting {
    id?: number | null
    name: string
    endPointProd: string
    endPointTest: string
    typeEndPoint: string
    paramsSettings: IParamsSettings[]
    isAuth: boolean
}
export interface ITestSetting {
    id?: number
    name: string
    endPointTest: string
    typeEndPoint: string
    paramsSettings: IParamsSettings[]
}
export type TLoginErp = {
    username: string
    password: string
}
export type TCreateErp = {
    token: string | null
}

export interface IconfirmDelivery {
    updatedItemUuid: string
    token: string
}

export interface IpayDelivery {
    uuid: string
    token: string
}

export interface IProductErp {
    uuidProduct: string
    productInfoDto: any | null
    productname: string
    quantite: number
    prixunitaire: number
    prixtotal: number
    tvaAmount: number
    prixnet: number
    subtotalprice?: number | null
    subtotaldesc?: string | null
    uuidDepot?: string | null
    uuidVariant: string
    remise: number
    isService: boolean
    linePurshaseSource?: any | null
}

export interface IcreateDelivery {
    token: string
    products: IProductErp[]
}

export type TDeliveryList = {
    token: string | null
    pageSize?: number
    pageIndex?: number
    enabled: boolean
}

export interface catgeoryProduct {
    tenantId: number
    creator: number
    created: string
    modifier: number
    modified: string
    version: number
    id: number
    uuid: string
    name: string
    categoryId: number | null
    description: string
    level: number
    quantity: number
    icon: string | null
    children: any[]
    reelQuantity: number | null
    availableQuantity: number | null
    reservedQuantity: number | null
    selledQuantity: number | null
    returnedQuantity: number | null
    damagedQuantity: number | null
    price: number | null
}
