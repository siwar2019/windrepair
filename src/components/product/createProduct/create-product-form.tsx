import { Box, Grid, useTheme } from '@mui/material'
import { useTranslations } from '../../../translation'
import * as Yup from 'yup'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useCreateProduct } from '../../../hooks/product/product.hook'
import Preferences from './steps/preferences'
import CustomButton from '../../reusable/hook-form/custom-button'
import DetailsProductForm from './steps/details-product-form'
import CreateCustomerForm from './steps/create-customer-form'
import Toast from '../../reusable/custom-toast'
import { ApiPaths } from '../../../utils/api-paths'
import generateRandomPassword from '../../../utils/generate-random-password'
import { useState } from 'react'
import CustomizedSteppers from './stepper/stepper'
import { useResponsive } from '../../../utils/use-responsive'
import { ICreateProduct } from '../../../interfaces/product/product'
import { useSelector } from 'react-redux'
import { setWarrantyEndDate } from '../../../redux/slices/auth'

interface CreateProductProps {
    activeStep: number
    setActiveStep: any
    displayStepper: boolean
    steps?: string[]
    onClose: () => void
}

const CreateProductForm = ({ activeStep, setActiveStep, displayStepper, steps, onClose }: CreateProductProps) => {
    const { t } = useTranslations()
    const navigate = useNavigate()
    const theme = useTheme()
    const { mutateAsync: createProduct, isPending } = useCreateProduct()
    const [code, setCode] = useState('')
    const password = generateRandomPassword()
    const [randomPassword, setRandomPassword] = useState('')
    const mdUp = useResponsive('up', 'md')
    const [selectedStore, setSelectedStore] = useState(0)
    const [selectedSubStoreId, setSelectedSubStoreId] = useState<number | null>(0)
    const warrantyEndDate = useSelector(setWarrantyEndDate)

    const createProductSchema = Yup.object().shape({
        serialNumber: Yup.string(),
        name: Yup.string(),
        model: Yup.string().required(t('ticketPage.errors.model')),
        problemDescription: Yup.string().required(t('ticketPage.errors.problemDescription')),
        customerName: Yup.string().required(t('common.name')),
        phone: Yup.string()
            .required(t('ticketPage.errors.phone'))
            .matches(/^\d{8}$/, t('ticketPage.errors.phoneMinLength')),
        email: Yup.string().email(t('ticketPage.errors.validEmail')),
        estimatedCost: Yup.number().required(t('ticketPage.errors.estimatedCost')).min(1, t('ticketPage.errors.estimatedCostMin')),
        estimatedTime: Yup.number(),
        password: Yup.string().required(),
        parts: Yup.array(),
        subStoreId: Yup.number().nullable(),
        pin: Yup.string(),
        dateFinWarranty: Yup.string()
    })

    const defaultValues: ICreateProduct = {
        serialNumber: '',
        name: '',
        password: password,
        model: '',
        problemDescription: '',
        customerName: '',
        phone: '',
        email: '',
        estimatedCost: 0,
        estimatedTime: 0,
        subStoreId: null,
        parts: [],
        pin: '',
        dateFinWarranty: ''
    }

    const methods = useForm<ICreateProduct>({
        resolver: yupResolver(createProductSchema),
        defaultValues,
        mode: 'all'
    })

    const { control, getValues, formState } = methods
    const parts = useWatch({
        control,
        name: 'parts'
    })

    const onSubmit = async () => {
        console.log(selectedSubStoreId, 'selectedSubStoreId')
        const hasErrors = Object.keys(formState.errors).length > 0
        if (!hasErrors) {
            await createProduct(
                {
                    serialNumber: getValues().serialNumber,
                    name: getValues().name,
                    model: getValues().model,
                    problemDescription: getValues().problemDescription,
                    customerName: getValues().customerName,
                    phone: getValues().phone,
                    email: getValues().email,
                    estimatedCost: getValues().estimatedCost,
                    estimatedTime: getValues().estimatedTime,
                    password: password,
                    subStoreId: selectedSubStoreId !== 0 ? selectedSubStoreId : null,
                    parts: getValues().parts,
                    pin: getValues().pin,
                    dateFinWarranty: warrantyEndDate.payload.auth.warrantyEndDate
                },
                {
                    async onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
                            setCode(data.data.data.repairticket.code)
                            setRandomPassword(password)
                        }
                        Toast({
                            message: t(`ticketPage.${data.data.message}`),
                            type: data.data.success ? 'success' : 'error'
                        })
                    }
                }
            ).catch((err) => {
                Toast({
                    message: t(`ticketPage.${err.message}`),
                    type: 'error'
                })
            })
        }
    }

    const handleNext = async () => {
        if (activeStep === 0) {
            const isFirstStepValid = await methods.trigger(['model', 'problemDescription', 'estimatedCost'])
            if (parts && isFirstStepValid) {
                setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
            }
        } else if (activeStep === 1) {
            methods.handleSubmit(onSubmit)()
        } else {
            setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
        }
    }

    const handleBack = () => {
        if (activeStep !== 0) {
            setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
        } else {
            navigate(ApiPaths.HOME)
        }
    }

    return (
        <Box>
            {displayStepper && (
                <Grid item xs={mdUp ? 0.05 : 2} sx={{ margin: 'auto', zIndex: 1 }}>
                    <CustomizedSteppers steps={steps ?? []} activeStep={activeStep ?? 0} />
                </Grid>
            )}

            <Grid container justifyContent={'center'} gap={2} spacing={2}>
                <Grid item>
                    {(() => {
                        switch (activeStep) {
                            case 0:
                                return (
                                    <DetailsProductForm
                                        methods={methods}
                                        parts={parts}
                                        setSelectedStore={setSelectedStore}
                                        selectedStore={selectedStore}
                                        setSelectedSubStoreId={setSelectedSubStoreId}
                                    />
                                )
                            case 1:
                                return <CreateCustomerForm methods={methods} />
                            case 2:
                                return <Preferences password={randomPassword} code={code} />
                            default:
                                return <></>
                        }
                    })()}
                </Grid>
                <Grid item>
                    {activeStep === 1 && (
                        <CustomButton
                            variant="contained"
                            data-testid="backButton"
                            backGroundColor={theme.palette.common.white}
                            textColor={theme.palette.common.black}
                            hoover={false}
                            border={'none'}
                            onClick={handleBack}
                            sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                        >
                            {t('common.back')}
                        </CustomButton>
                    )}
                </Grid>

                <Grid item>
                    {activeStep === 2 && (
                        <CustomButton
                            variant="contained"
                            data-testid="backButton"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border={'none'}
                            onClick={onClose}
                            sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                        >
                            {t('common.finish')}
                        </CustomButton>
                    )}
                </Grid>
                <Grid item>
                    {activeStep !== 2 && (
                        <CustomButton
                            variant="contained"
                            data-testid="nextButton"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border={'none'}
                            loading={isPending}
                            onClick={handleNext}
                            sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                        >
                            {t('common.next')}
                        </CustomButton>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateProductForm
