import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useTranslations } from '../../../translation'
import * as Yup from 'yup'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../reusable/custom-toast'
import { IProduct, TEditProductForm } from '../../../interfaces/product/product'
import CustomTextField from '../../reusable/hook-form/custom-text-field'
import CustomTextarea from '../../reusable/hook-form/custom-text-area'
import CustomModal from '../../reusable/customModal/custom-modal'
import CustomButton from '../../reusable/hook-form/custom-button'
import { PRODUCT_STATUS, currency, currencyInput } from '../../../utils/constants'
import { useEditProduct } from '../../../hooks/product/product.hook'
import AddIcon from '@mui/icons-material/Add'
import CreatePartForm from '../createProduct/addPart/create-part'
import { useEffect, useState } from 'react'
import CustomSelect from '../../reusable/hook-form/custom-select'
import { useGetStoresList } from '../../../hooks/store/store.hooks'
import { capitalize } from '../../../utils/capitalize'
import DisplayDetailsStore from '../../store/display-details-store'
import { Options } from '../../../interfaces/options'
import { Loading } from '../../reusable/loading'

interface UpdateProductProps {
    open: boolean
    onClose: () => void
    product: IProduct
    assigned: boolean
}

const UpdateProductForm = ({ onClose, product, open, assigned }: UpdateProductProps) => {
    const { t } = useTranslations()
    const theme = useTheme()
    const { id, model, name, problemDescription, repairticket, serialNumber, status, parts, pin, subStore } = product
    const { mutateAsync: editProduct, isPending } = useEditProduct()
    const { data: storesList, isLoading } = useGetStoresList()
    const [openAddPartModal, setOpenAddPartModal] = useState<boolean>(false)
    const [openSelectStoreModal, setOpenSelectStoreModal] = useState<boolean>(false)
    const [showMainDoeuvre, setShowMainDoeuvre] = useState<boolean>(true)
    const [idsDeleted, setIdsDeleted] = useState<number[]>([])
    const [selectedStore, setSelectedStore] = useState(subStore && subStore.storeId)
    const [selectedSubStoreId, setSelectedSubStoreId] = useState(subStore ? subStore.id : null)
    const [selectedSubStoreName, setSelectedSubStoreName] = useState<string>(
        `${capitalize(subStore?.store.name || '')} - ${capitalize(subStore?.name || '')}`
    )

    const handleModalAddPart = (value: boolean) => {
        setOpenAddPartModal(value)
        if (!value && parts?.length) {
            setShowMainDoeuvre(false)
        }
    }

    useEffect(() => {
        return () => {
            setShowMainDoeuvre(true)
        }
    }, [])

    const updateProductSchema = Yup.object().shape({
        id: Yup.number().required(),
        serialNumber: Yup.string().required(t('ticketPage.errors.serialNumber')),
        name: Yup.string(),
        model: Yup.string().required(t('ticketPage.errors.model')),
        problemDescription: Yup.string().required(t('ticketPage.errors.problemDescription')),
        estimatedCost: Yup.number().required(t('ticketPage.errors.estimatedCost')),
        estimatedTime: Yup.number(),
        status: Yup.string().oneOf(Object.values(PRODUCT_STATUS)).required(t('ticketPage.errors.status')),
        subStoreId: Yup.number().nullable(),
        parts: Yup.array(),
        idsDeleted: Yup.array().of(Yup.number()),
        pin: Yup.string()
    })

    const defaultValues: TEditProductForm = {
        id: id,
        serialNumber: serialNumber,
        name: name,
        model: model,
        problemDescription: problemDescription,
        estimatedCost: repairticket.estimatedCost,
        estimatedTime: repairticket.estimatedTime,
        status: status,
        subStoreId: selectedSubStoreId,
        parts: parts,
        idsDeleted: idsDeleted,
        pin: pin
    }

    const methods = useForm<TEditProductForm>({
        resolver: yupResolver(updateProductSchema),
        defaultValues,
        mode: 'all'
    })

    const { control, handleSubmit, setValue } = methods

    const partsData = useWatch({
        control,
        name: 'parts'
    })

    const totalEstimatedCost = partsData?.reduce((total, part) => total + Number(part.price), 0) || 0
    const fieldDisabled = status === PRODUCT_STATUS.CLOSED_SUCCESS

    useEffect(() => {
        setValue('estimatedCost', totalEstimatedCost)
    }, [totalEstimatedCost, setValue])

    const onSubmit = async () => {
        const formData = methods.getValues()
        formData.idsDeleted = idsDeleted
        try {
            await editProduct({
                ...formData,
                subStoreId: selectedSubStoreId
            })
            Toast({
                message: t(`ticketPage.editModal.success`),
                type: 'success'
            })
        } catch (_err) {
            Toast({
                message: t(`ticketPage.editModal.error`),
                type: 'error'
            })
        } finally {
            onClose()
        }
    }

    const storesOptions =
        storesList?.data?.map((store: { id: number; name: string }) => ({
            value: store.id,
            label: capitalize(store.name)
        })) ?? []

    const handleStoreChange = (event: any) => {
        if (storesOptions.length === 0) return

        const selectedStoreId = event.target.value || selectedStore

        setSelectedStore(selectedStoreId)
        setOpenSelectStoreModal(true)

        const selectedStoreOption = storesOptions.find((store: Options) => store.value === selectedStoreId)
        setSelectedSubStoreName(selectedStoreOption ? capitalize(selectedStoreOption.label) : '')
    }

    return (
        <CustomModal open={open} handleClose={onClose} title={t('ticketPage.editModal.title')}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ padding: '20px 0px 20px 0px' }}>
                        <Typography variant="h4" color="primary">
                            {t('ticketPage.title')}
                        </Typography>
                    </Box>

                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.serialNumber')}</Typography>
                                <CustomTextField
                                    border="simpleTextField"
                                    variant="outlined"
                                    name="serialNumber"
                                    disabled={fieldDisabled}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.name')}</Typography>
                                <CustomTextField border="simpleTextField" variant="outlined" name="name" disabled={fieldDisabled} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.model')}</Typography>
                                <CustomTextField
                                    className=""
                                    border="simpleTextField"
                                    variant="outlined"
                                    name="model"
                                    disabled={fieldDisabled}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.store')}</Typography>
                                <CustomSelect
                                    options={storesOptions}
                                    name="subStoreId"
                                    onChange={handleStoreChange}
                                    value={selectedStore}
                                    displayValue={selectedSubStoreName}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.pin')}</Typography>
                                <CustomTextField border="simpleTextField" variant="outlined" name="pin" disabled={fieldDisabled} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.estimatedTime')}</Typography>
                                <CustomTextField
                                    disabled={fieldDisabled}
                                    type="date"
                                    border="simpleTextField"
                                    variant="outlined"
                                    name="estimatedTime"
                                    endIcon={
                                        <Typography sx={{ color: theme.palette.grey['A400'], margin: '1rem' }}>
                                            {currencyInput}
                                        </Typography>
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h4">{t('ticketPage.fields.problemDescription')}</Typography>
                                <Stack flexDirection="row" alignItems="center">
                                    <CustomTextarea border="simpleTextField" minRows={2} name="problemDescription" />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Stack flexDirection="row" alignItems="center">
                                    <Button
                                        disabled={fieldDisabled}
                                        onClick={() => {
                                            setOpenAddPartModal(true)
                                        }}
                                        sx={{
                                            cursor: 'pointer',
                                            ':hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        <AddIcon
                                            sx={{
                                                color: theme.palette.primary.main,
                                                fontSize: '1.8rem'
                                            }}
                                        />
                                        <Typography variant="h4" color="primary">
                                            {t('ticketPage.fields.addPartDetails')}
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6} mr="auto">
                                <Typography variant="h4">{t('ticketPage.fields.estimatedCost')}</Typography>
                                <CustomTextField
                                    disabled={fieldDisabled}
                                    type="number"
                                    border="simpleTextField"
                                    variant="outlined"
                                    name="estimatedCost"
                                    endIcon={
                                        <Typography sx={{ color: theme.palette.grey['A400'], margin: '1rem' }}>{currency}</Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Grid display="flex" justifyContent="center" gap={2} p={2} spacing={2}>
                        <CustomButton
                            variant="contained"
                            backGroundColor={theme.palette.primary.main}
                            textColor={theme.palette.common.white}
                            hoover={false}
                            border={'none'}
                            loading={isPending}
                            type="submit"
                            sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                        >
                            {t('common.save')}
                        </CustomButton>
                    </Grid>
                </form>
            </FormProvider>
            {openAddPartModal && (
                <CreatePartForm
                    open={openAddPartModal}
                    onClose={() => handleModalAddPart(false)}
                    parts={partsData}
                    methodsEdit={methods}
                    setIdsDeleted={setIdsDeleted}
                    showMainDoeuvre={showMainDoeuvre}
                />
            )}
            {openSelectStoreModal && selectedStore && (
                <DisplayDetailsStore
                    open={openSelectStoreModal}
                    onClose={() => setOpenSelectStoreModal(!openSelectStoreModal)}
                    selectedStore={selectedStore}
                    setSelectedSubStoreId={setSelectedSubStoreId}
                    setSelectedSubStoreName={setSelectedSubStoreName}
                />
            )}
        </CustomModal>
    )
}

export default UpdateProductForm
