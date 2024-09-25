import { UseFormReturn, useForm, useFormContext } from 'react-hook-form'
import { Box, Button, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { ICreateProduct, TPart } from '../../../../interfaces/product/product'
import { useTranslations } from '../../../../translation'
import FormProvider from '../../../reusable/hook-form/form-provider'
import CustomTextField from '../../../reusable/hook-form/custom-text-field'
import AddIcon from '@mui/icons-material/Add'
import CustomTextarea from '../../../reusable/hook-form/custom-text-area'
import { SetStateAction, useEffect, useState, Dispatch, useMemo } from 'react'
import CreatePartForm from '../addPart/create-part'
import { currency, currencyInput } from '../../../../utils/constants'
import { useGetStoresList } from '../../../../hooks/store/store.hooks'
import CustomSelect from '../../../reusable/hook-form/custom-select'
import { Loading } from '../../../reusable/loading'
import DisplayDetailsStore from '../../../store/display-details-store'
import { capitalize } from '../../../../utils/capitalize'
import CustomButton from '../../../reusable/hook-form/custom-button'
import ErpLogin from '../../ERP/erpConnection'
import { useGetSellingDate } from '../../../../hooks/settings.hook'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import { useWarrantyCheck } from '../../../auth/utils/utils'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Options } from '../../../../interfaces/options'
import { useGetUser } from '../../../../hooks/profile/profile.hook'
export interface CreateProductProps {
    methods: UseFormReturn<ICreateProduct>
    parts?: TPart[]
    setSelectedStore: Dispatch<SetStateAction<number>>
    selectedStore: number
    setSelectedSubStoreId: Dispatch<SetStateAction<number | null>>
}

const DetailsProductForm = ({ methods, parts, setSelectedStore, selectedStore, setSelectedSubStoreId }: CreateProductProps) => {
    const { isUnderWarranty } = useWarrantyCheck()

    const { t } = useTranslations()
    const theme = useTheme()
    const { setValue } = methods
    const { data: storesList, isLoading } = useGetStoresList()
    const [openAddPartModal, setOpenAddPartModal] = useState<boolean>(false)
    const [openSelectStoreModal, setOpenSelectStoreModal] = useState<boolean>(false)
    const [showMainDoeuvre, setShowMainDoeuvre] = useState<boolean>(true)
    const [selectedSubStoreName, setSelectedSubStoreName] = useState<string>('')
    const [openErpConnection, setOpenErpConnection] = useState<boolean>(false)
    const [underWarranty, setUnderWarranty] = useState<string>('')
    const erpToken = localStorage.getItem('erpToken')

    const guaranteeSchema = yup.object().shape({
        guranteeValidite: yup
            .number()
            .required(t('erpLogin.fields.warrantyRequired'))
            .min(1, t('erpLogin.fields.minValue', { min: 1 }))
    })

    const guaranteeMethods = useForm<{ guranteeValidite: number }>({
        defaultValues: {
            guranteeValidite: 0
        },
        resolver: yupResolver(guaranteeSchema)
    })

    const handleOpen = () => {
        if (!erpToken) {
            setOpenErpConnection(true)
        }
        if (erpToken && methods.watch('serialNumber')) {
            refetch()
            methods.setValue('guranteeValidite', 0)

            setUnderWarranty('')
        }
    }

    const {
        data,
        error,
        isLoading: loading,
        refetch
    } = useGetSellingDate(localStorage.getItem('erpToken'), methods.getValues('serialNumber'))

    const handleClose = () => {
        setOpenErpConnection(false)
    }

    const checkGuaranteeValidite = async () => {
        const isValid = await guaranteeMethods.trigger('guranteeValidite')
        if (isValid) {
            const warrantyPeriod = guaranteeMethods.getValues().guranteeValidite
            const warranty = isUnderWarranty(sellingDate, warrantyPeriod)
            setUnderWarranty(warranty ? 'notExpired' : 'expired')
        } else {
            setUnderWarranty('')
        }
    }

    const totalEstimatedCost = parts?.reduce((total, part) => total + Number(part.price), 0) || 0

    const storesOptions =
        storesList?.data?.map((store: { id: number; name: string }) => ({
            value: store.id,
            label: capitalize(store.name)
        })) ?? []

    useEffect(() => {
        return () => {
            setShowMainDoeuvre(true)
        }
    }, [])

    useEffect(() => {
        setValue('estimatedCost', totalEstimatedCost)
    }, [totalEstimatedCost, setValue])

    const handleStoreChange = (event: any) => {
        if (storesOptions.length === 0) return

        const selectedStoreId = event.target.value || selectedStore

        setSelectedStore(selectedStoreId)
        setOpenSelectStoreModal(true)

        const selectedStoreOption = storesOptions.find((store: Options) => store.value === selectedStoreId)
        setSelectedSubStoreName(selectedStoreOption ? capitalize(selectedStoreOption.label) : '')
    }

    const handleModalAddPart = (value: boolean) => {
        setOpenAddPartModal(value)
        if (!value && parts?.length) {
            setShowMainDoeuvre(false)
        }
    }

    const sellingDate = useMemo(() => {
        return data && data?.data ? data?.data?.sellingDate : undefined
    }, [data])
    const { data: getUserData } = useGetUser()

    const isErpClient = useMemo(() => getUserData?.isErpClient, [getUserData])

    const addPartDetails = () => {
        if (!isErpClient) {
            setOpenAddPartModal(true)
        } else if (isErpClient && !erpToken) {
            setOpenErpConnection(true)
            setOpenAddPartModal(true)
        } else {
            {
                setOpenAddPartModal(true)
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <FormProvider methods={methods}>
                <Stack spacing={2}>
                    <Box sx={{ paddingTop: '20px' }}>
                        <Typography variant="h4" color="primary">
                            {t('ticketPage.title')}
                        </Typography>
                    </Box>

                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Grid width="100%" container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.serialNumber')}</Typography>
                                <CustomTextField border="simpleTextField" variant="outlined" name="serialNumber" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.name')}</Typography>
                                <CustomTextField border="simpleTextField" variant="outlined" name="name" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.model')}</Typography>
                                <CustomTextField className="" border="simpleTextField" variant="outlined" name="model" />
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
                                <CustomTextField border="simpleTextField" variant="outlined" name="pin" />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('ticketPage.fields.estimatedTime')}</Typography>
                                <CustomTextField
                                    type="number"
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
                                    <CustomTextarea border="simpleTextField" minRows={3} name="problemDescription" />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <CustomButton
                                    variant="contained"
                                    data-testid="generateButton"
                                    backGroundColor={
                                        methods.watch('serialNumber') ? theme.palette.common.white : theme.palette.grey['400']
                                    }
                                    textColor={methods.watch('serialNumber') ? theme.palette.primary.main : theme.palette.common.white}
                                    hoover={false}
                                    border={methods.watch('serialNumber') ? theme.palette.primary.main : theme.palette.grey['500']}
                                    sx={{ padding: '5px', width: '50%' }}
                                    disabled={!methods.watch('serialNumber')}
                                    onClick={handleOpen}
                                >
                                    {t('erpLogin.guarantee')}
                                </CustomButton>
                            </Grid>
                            <Grid item xs={12}>
                                {sellingDate === null ? (
                                    <Typography>{t('erpLogin.noWarranty')}</Typography>
                                ) : sellingDate === undefined ? (
                                    ''
                                ) : (
                                    <Grid item xs={12}>
                                        <FormProvider methods={guaranteeMethods}>
                                            <Stack flexDirection="row" alignItems="center">
                                                <Typography variant="h4">{t('erpLogin.duree')}</Typography>

                                                <CustomTextField
                                                    border="simpleTextField"
                                                    variant="outlined"
                                                    type="number"
                                                    name="guranteeValidite"
                                                    placeholder={t('erpLogin.guaranteeValidite')}
                                                    onBlur={() => guaranteeMethods.trigger('guranteeValidite')}
                                                    error={!!guaranteeMethods.formState.errors.guranteeValidite}
                                                    helperText={guaranteeMethods.formState.errors.guranteeValidite?.message}
                                                />
                                                <IconButton
                                                    onClick={checkGuaranteeValidite}
                                                    sx={{ color: theme.palette.primary.main }}
                                                    disabled={!guaranteeMethods.formState.isValid}
                                                >
                                                    <DoneOutlineIcon />
                                                </IconButton>
                                            </Stack>
                                        </FormProvider>
                                    </Grid>
                                )}
                                {underWarranty && (
                                    <Grid item xs={12}>
                                        {underWarranty === 'notExpired' && (
                                            <Typography variant="h4" color="primary">
                                                {t('erpLogin.fields.guaranteeValid')}
                                            </Typography>
                                        )}
                                        {underWarranty === 'expired' && (
                                            <Typography variant="h4" color="error">
                                                {t('erpLogin.fields.guaranteeExpired')}
                                            </Typography>
                                        )}
                                    </Grid>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Stack flexDirection="row" alignItems="center">
                                    <Button
                                        onClick={() => {
                                            addPartDetails()
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

                            <Grid item xs={12} md={6}>
                                <Typography variant="h4">{t('ticketPage.fields.estimatedCost')}</Typography>
                                <CustomTextField
                                    type="number"
                                    border="simpleTextField"
                                    variant="outlined"
                                    name="estimatedCost"
                                    endIcon={
                                        <Typography sx={{ color: theme.palette.grey['A400'], margin: '1rem' }}>{currency}</Typography>
                                    }
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    )}
                    {openAddPartModal && (
                        <CreatePartForm
                            open={openAddPartModal}
                            onClose={() => handleModalAddPart(false)}
                            parts={parts}
                            methodsCreate={methods}
                            showMainDoeuvre={showMainDoeuvre}
                        />
                    )}
                    {openSelectStoreModal && (
                        <DisplayDetailsStore
                            open={openSelectStoreModal}
                            onClose={() => setOpenSelectStoreModal(!openSelectStoreModal)}
                            selectedStore={selectedStore}
                            setSelectedSubStoreId={setSelectedSubStoreId}
                            setSelectedSubStoreName={setSelectedSubStoreName}
                        />
                    )}
                    <ErpLogin open={openErpConnection} handleClose={handleClose} />
                </Stack>
            </FormProvider>
        </Box>
    )
}

export default DetailsProductForm
