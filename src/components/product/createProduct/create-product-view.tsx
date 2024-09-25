import { useState } from 'react'
import { useTranslations } from '../../../translation'
import CustomModal from '../../reusable/customModal/custom-modal'
import CreateProductForm from './create-product-form'
import { QueryObserverResult } from '@tanstack/react-query'

interface CreateProductProps {
    open: boolean
    onClose: () => void
}

const CreateProductView = ({ open, onClose }: CreateProductProps) => {
    const [activeStep, setActiveStep] = useState(0)
    const { t } = useTranslations()

    return (
        <CustomModal open={open} handleClose={onClose} title={t('ticketPage.addNewProduct')}>
            <CreateProductForm
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                steps={['details', 'customer', 'preferences']}
                displayStepper={true}
                onClose={onClose}
            />
        </CustomModal>
    )
}
export default CreateProductView
