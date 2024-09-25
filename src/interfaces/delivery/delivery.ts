export interface LineModel {
    tenantId: number
    creator: number
    created: string
    modifier: number
    modified: string
    version: number
    id: number
    uuid: string
    uuidProduct: string
    productInfoDto: any
    productname: string
    descriptionproduct: string | null
    quantite: number
    quantityToDeliver: number | null
    linePurshaseSource: string
    prixunitaire: number
    prixtotal: number
    tvaAmount: number
    prixnet: number
    subtotalprice: number | null
    subtotaldesc: string | null
    removed: boolean | null
    returnedQuantity: number | null
    uuidDepot: string
    uuidStock: string | null
    uuidVariant: string
    remise: number
    isService: boolean
}

export interface Delivery {
    tenantId: number
    creator: number
    created: string
    modifier: number
    modified: string
    version: number
    id: number
    invoicetype: string
    uuid: string
    isdeleted: boolean
    totalHtt: number
    uuidCollaborator: string | null
    customer: string
    customerName: string | null
    totalTtc: number
    timbre: string | null
    customerRib: string
    customerAdress: string | null
    purchaseType: string
    tva: number | null
    langue: string
    partner: string
    partnerAdress: string | null
    partnerRIB: string | null
    invoiceNumber: string
    invoiceDate: string
    deliveryDate: string
    dueDate: string
    note: string | null
    devise: string | null
    model: string | null
    color: string
    status: string
    taxList: any[]
    devis: string | null
    purshase_order: string
    invoice: string | null
    lineModels: LineModel[]
    has_invoice: boolean | null
    payMode: string | null
    type: string
    left_to_pay: number
    remise: number
    paymentStatus: string
    cancellation_nb_days_BL: number | null
    createdBy: string | null
    isService: boolean | null
    descriptionInvoice: string
    isPaid: boolean | null
    discount: number | null
    partial: boolean
}
