import { useTranslation } from 'react-i18next'
import CustomModal from '../../../reusable/customModal/custom-modal'
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material'
import CustomTextField from '../../../reusable/hook-form/custom-text-field'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import CustomButton from '../../../reusable/hook-form/custom-button'
import CustomTableContainer from '../../../reusable/table/custom-table-container'
import PartRows from './part-list-rows'
import { useMemo, useState } from 'react'
import { ICreateProduct, TEditProductForm, TPart } from '../../../../interfaces/product/product'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { THeadCell } from '../../../../interfaces/table'
import { currency } from '../../../../utils/constants'
import { useGetAllProductCategory } from '../../../../hooks/settings.hook'
import CustomSelect from '../../../reusable/hook-form/custom-select'
import { useGetUser } from '../../../../hooks/profile/profile.hook'
import { TAddCategory, TVariant } from '../../../../interfaces/category'

export interface CreatePartProps {
    methodsEdit?: UseFormReturn<TEditProductForm>
    methodsCreate?: UseFormReturn<ICreateProduct>
    parts?: TPart[]
    open: boolean
    onClose: () => void
    setIdsDeleted?: React.Dispatch<React.SetStateAction<number[]>>
    showMainDoeuvre: boolean
    setErpClient?: any
}

const CreatePartForm = ({
    open,
    onClose,
    parts = [],
    methodsEdit,
    methodsCreate,
    setIdsDeleted,
    showMainDoeuvre
}: CreatePartProps) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { data: getUserData } = useGetUser()

    const isErpClient = useMemo(() => getUserData?.isErpClient, [getUserData])

    const createPartSchema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required(),
        ...(parts.length > 0 && {
            category: Yup.string().required(),
            garantie: Yup.number().required()
        })
    })

    const { data: productData } = useGetAllProductCategory(localStorage.getItem('erpToken'))

    const listProductCategory = useMemo(() => productData?.data ?? [], [productData, localStorage.getItem('erpToken')])

    const defaultValues: TPart = {
        id: undefined,
        name: showMainDoeuvre && parts.length === 0 ? t('addPartPage.mainDoeuvre') : '',
        category: '',
        price: 0,
        garantie: 0
    }

    const methodsPart = useForm<any>({
        resolver: yupResolver(createPartSchema),
        defaultValues,
        context: { parts },
        mode: 'all'
    })

    const { watch, setValue } = methodsPart
    const watchedName = watch('name')
    const watchedCategory = watch('category')

    const variantOptions = useMemo(() => {
        const category = listProductCategory.find((cat: TAddCategory) => cat.name === watchedCategory)
        return (
            category?.variants?.map((variant: TVariant) => ({
                label: variant.nameVariant,
                value: variant.nameVariant
            })) || []
        )
    }, [watchedCategory, listProductCategory, localStorage.getItem('erpToken')])

    useMemo(() => {
        if (watchedCategory && watchedName) {
            const category = listProductCategory?.find((cat: TAddCategory) => cat.name === watchedCategory)
            setValue('price', category?.productPriceDto.purchasePrice)

            return category?.productPriceDto.purchasePrice || 0
        }
        return []
    }, [watchedCategory, watchedName, listProductCategory])

    const handleAddPart = methodsPart.handleSubmit((data) => {
        const updatedParts = [...parts, data]
        methodsCreate?.setValue('parts', updatedParts)
        methodsEdit?.setValue('parts', updatedParts)

        methodsPart.reset(defaultValues)
    })

    const handleRemovePart = (index: number, id: number | undefined) => {
        const currentParts = [...parts]
        if (id && setIdsDeleted) {
            setIdsDeleted((prev) => [...prev, id])
        }
        currentParts.splice(index, 1)
        methodsCreate?.setValue('parts', currentParts)
        methodsEdit?.setValue('parts', currentParts)
    }

    const tableHead: THeadCell[] = [
        { id: '1', label: t('addPartPage.fields.name'), align: 'center' },
        { id: '2', label: t('addPartPage.fields.category'), align: 'center' },
        { id: '3', label: t('addPartPage.fields.price'), align: 'center' },
        { id: '4', label: t('addPartPage.fields.guarantee'), align: 'center' },
        { id: '5', label: t('addPartPage.fields.actions'), align: 'center' }
    ]

    const partsData = useMemo(() => parts, [parts])

    return (
        <CustomModal open={open} handleClose={onClose} title={t('addPartPage.title')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <FormProvider {...methodsPart}>
                    <Stack spacing={2}>
                        <Grid container spacing={2} justifyContent="center">
                            {parts.length > 0 && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h4">{t('addPartPage.fields.category')}</Typography>
                                        {isErpClient ? (
                                            <CustomSelect
                                                name="category"
                                                options={listProductCategory.map((cat: TAddCategory) => ({
                                                    label: cat.name,
                                                    value: cat.name
                                                }))}
                                                label="Select a Category"
                                                placeholder="Select a category"
                                                idSelect="category-select"
                                            />
                                        ) : (
                                            <CustomTextField border="simpleTextField" variant="outlined" name="category" />
                                        )}
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('addPartPage.fields.name')}</Typography>
                                {isErpClient && parts.length > 0 ? (
                                    <CustomSelect
                                        name="name"
                                        options={variantOptions}
                                        placeholder="Select a name"
                                        idSelect="name-select"
                                    />
                                ) : (
                                    <CustomTextField
                                        border="simpleTextField"
                                        variant="outlined"
                                        name="name"
                                        disabled={parts.length === 0}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h4">{t('addPartPage.fields.price')}</Typography>
                                <CustomTextField
                                    border="simpleTextField"
                                    type="number"
                                    variant="outlined"
                                    name="price"
                                    disabled={isErpClient && parts.length > 0 && (!watchedName || !watchedCategory)}
                                    endIcon={
                                        <Typography sx={{ color: theme.palette.grey['A400'], margin: '1rem' }}>{currency}</Typography>
                                    }
                                />
                            </Grid>
                            {parts && parts.length > 0 && (
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h4">{t('addPartPage.fields.guarantee')}</Typography>
                                    <CustomTextField
                                        border="simpleTextField"
                                        type="number"
                                        variant="outlined"
                                        name="garantie"
                                        endIcon={
                                            <Typography sx={{ color: theme.palette.grey['A400'], margin: '1rem' }}>MONTH</Typography>
                                        }
                                    />
                                </Grid>
                            )}
                            <Grid item>
                                <CustomButton
                                    variant="outlined"
                                    data-testid="backButton"
                                    backGroundColor={theme.palette.common.white}
                                    textColor={theme.palette.primary.main}
                                    hoover={true}
                                    border={theme.palette.primary.main}
                                    onClick={handleAddPart}
                                    sx={{ padding: '1px', width: '10rem', fontSize: '1rem' }}
                                >
                                    {t('addPartPage.add')}
                                </CustomButton>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Stack alignItems="center">
                                    <Box sx={{ p: 2, width: '95%', height: '100%' }}>
                                        <CustomTableContainer
                                            rowCount={1}
                                            headCells={tableHead}
                                            data={partsData}
                                            CustomRow={({ rowData, index }) => (
                                                <PartRows
                                                    key={rowData.id}
                                                    rowData={rowData}
                                                    index={index}
                                                    removePart={() => handleRemovePart(index, rowData.id)}
                                                    fromTicketDetails={false}
                                                    isLastRow={index === rowData.length - 1}
                                                    methodsCreate={methodsCreate}
                                                    methodsEdit={methodsEdit}
                                                />
                                            )}
                                            title={'addPartPage'}
                                        />
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid container justifyContent="center">
                                <Grid item>
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
                                        {t('common.save')}
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </FormProvider>
            </Box>
        </CustomModal>
    )
}

export default CreatePartForm
