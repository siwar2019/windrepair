import { useTranslations } from '../../translation'
import { Box, Card, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import * as Yup from 'yup'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '../reusable/hook-form/custom-text-field'
import CustomButton from '../reusable/hook-form/custom-button'
import { COMMON } from '../../theme/palette'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import Toast from '../reusable/custom-toast'
import { secondaryFont } from '../../theme/typography'
import { IAddStoreFormValues, Store } from '../../interfaces/store/store'
import { useCreateStore, useGetStoresList } from '../../hooks/store/store.hooks'
import MatrixComponent from './matrice-store'
import { useEffect } from 'react'
import { Loading } from '../reusable/loading'

const AddStore = () => {
    const { t } = useTranslations()

    const { mutateAsync: createStore } = useCreateStore()
    const { data: storesData, isLoading } = useGetStoresList()

    const addStoreSchema = Yup.object().shape({
        stores: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required(t('storePage.errors.storeName')),
                    nbrLines: Yup.number().required(),
                    columns: Yup.array().of(Yup.string().required()).required()
                })
            )
            .required()
    })

    const methods = useForm<IAddStoreFormValues>({
        resolver: yupResolver(addStoreSchema),
        defaultValues: {
            stores: []
        },
        mode: 'all'
    })

    const theme = useTheme()

    const { handleSubmit, control } = methods

    const { append: appendStore } = useFieldArray({
        control,
        name: 'stores'
    })

    const stores = useWatch({
        control,
        name: 'stores'
    })

    useEffect(() => {
        if (storesData?.data) {
            const initialValues = storesData.data.length
                ? storesData.data.map((store: Store) => ({
                      id: store.id || -1,
                      name: store.name || '',
                      nbrLines: store.nbrLines || 1,
                      columns: store.columns || [''],
                      subStores: store.subStores || []
                  }))
                : [
                      {
                          id: -1,
                          name: '',
                          nbrLines: 1,
                          columns: ['']
                      }
                  ]
            methods.reset({
                stores: initialValues
            })
        }
    }, [storesData, methods])

    const onSubmit = async (data: IAddStoreFormValues) => {
        await createStore(data.stores, {
            onSuccess(data, _variables, _context) {
                if (data.status === 200) {
                    Toast({
                        message: t(`storePage.messages.${data.data.message}`),
                        type: 'success'
                    })
                    methods.reset()
                }
            }
        }).catch((data) => {
            Toast({
                message: t(`storePage.messages.${data.message}`),
                type: 'error'
            })
        })
    }

    return (
        <Stack alignItems="center">
            <Card sx={{ p: 2, width: '70%', height: '100%' }}>
                <Box sx={{ width: '85%', height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h3" mb={3} sx={{ fontFamily: secondaryFont }}>
                        {t('storePage.title')}
                    </Typography>
                </Box>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                stores.map((store, storeIndex) => (
                                    <Grid item xs={11} key={storeIndex}>
                                        <Grid container sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
                                            <Grid item sx={{ padding: '2rem' }} xs={12}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                        gap: 5
                                                    }}
                                                >
                                                    <Typography>{t('storePage.storeName')}</Typography>
                                                    <CustomTextField
                                                        name={`stores[${storeIndex}].name`}
                                                        variant="outlined"
                                                        sx={{
                                                            width: '50%'
                                                        }}
                                                        disabled={store.id !== -1}
                                                    />
                                                </Box>

                                                <Grid container alignItems="center" sx={{ marginTop: '4%' }}>
                                                    <MatrixComponent methods={methods} storeIndex={storeIndex} store={store} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))
                            )}

                            <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
                                <IconButton
                                    onClick={() => {
                                        appendStore({
                                            id: -1,
                                            name: '',
                                            nbrLines: 1,
                                            columns: ['']
                                        })
                                    }}
                                    sx={{
                                        color: COMMON.common.red,
                                        cursor: 'pointer',
                                        ':hover': { background: 'transparent' }
                                    }}
                                >
                                    <Image src={ImgPaths.addStoreIcon} />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <CustomButton
                                variant="contained"
                                backGroundColor={theme.palette.primary.main}
                                textColor={theme.palette.common.white}
                                hoover={false}
                                border={'none'}
                                type="submit"
                                sx={{ padding: '1rem', width: '15%' }}
                            >
                                {t('common.confirm')}
                            </CustomButton>
                        </Grid>
                    </form>
                </FormProvider>
            </Card>
        </Stack>
    )
}

export default AddStore
