import { requestAddMovement } from '../../controllers/mouvement/mouvement.api'
import { IMovement } from '../../interfaces/movement'
import { useGenericMutation } from '../../utils/react-query'

export const useCreateMovement = () => {
    return useGenericMutation<IMovement, IMovement>(
        (payload: IMovement) => requestAddMovement(payload.value, payload.cashRegisterId, payload.invoiceId),
        'invoice'
    )
}
