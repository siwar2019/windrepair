export type TAddCategory = {
    id: number
    uuid: string
    name: string
    variants?: TVariant
    productPriceDto:TPrice
}
export type TVariant = {
    idVariant: number
    nameVariant: string

}
export type TPrice = {
    purchasePrice: number
    advisedSalePrice: number
}
