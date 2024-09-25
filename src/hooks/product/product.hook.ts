import { useQuery } from '@tanstack/react-query'
import {
    requestCreateProduct,
    requestEditProduct,
    requestGetProducts,
    requestDeleteProduct,
    requestAssignToMe,
    requestUpdateStatusProduct
} from '../../controllers/product/product.api'
import { ICreateProduct, TEditProductForm, TProductList } from '../../interfaces/product/product'
import { useGenericMutation } from '../../utils/react-query'
import { PRODUCT_STATUS } from '../../utils/constants'

export const useCreateProduct = () => {
    return useGenericMutation<ICreateProduct, ICreateProduct>(
        (payload: ICreateProduct) => requestCreateProduct(payload),
        'getAllProduct'
    )
}

export const useGetProductList = (payload: TProductList) => {
    return useQuery({
        queryKey: ['getAllProduct', payload],
        queryFn: () => requestGetProducts(payload)
    })
}

export const useDeleteProduct = () => {
    return useGenericMutation<number, number>((id: number) => requestDeleteProduct(id), 'getAllProduct')
}
export const useEditProduct = () => {
    return useGenericMutation<TEditProductForm, TEditProductForm>(
        (payload: TEditProductForm) => requestEditProduct(payload),
        'getAllProduct'
    )
}

export const useUpdateStatusProduct = () => {
    return useGenericMutation<{ id: number; status: PRODUCT_STATUS }, any>(
        ({ id, status }) => requestUpdateStatusProduct(id, status),
        'getAllProduct'
    )
}
export const useAssignProduct = () => {
    return useGenericMutation<{ id: number; isAssigned: boolean ,employeeId:number}, any>(
        ({ id, isAssigned,employeeId }) => requestAssignToMe(id, isAssigned,employeeId),
        'getAllProduct'
    )
}
