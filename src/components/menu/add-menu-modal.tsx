import { useTranslations } from '../../translation'
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material'
import CustomModal from '../reusable/customModal/custom-modal'
import * as Yup from 'yup'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '../reusable/hook-form/custom-text-field'
import AddIcon from '@mui/icons-material/Add'
import CustomButton from '../reusable/hook-form/custom-button'
import { COMMON } from '../../theme/palette'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import { useCreateMenu } from '../../hooks/menu/menu.hook'
import Toast from '../reusable/custom-toast'
import { IAddMenu } from '../../interfaces/menu/menu'

interface AddMenuModalProps {
    open: boolean
    closeModal: () => void
}

const AddMenuModal = ({ open, closeModal }: AddMenuModalProps) => {
    const { t } = useTranslations()

    const { mutateAsync: createMenu } = useCreateMenu()

    const addMenuSchema = Yup.object().shape({
        menuName: Yup.string().required(t('menuPage.errors.menuNameRequired')),
        actionId: Yup.string().required(t('menuPage.errors.actionIdRequired')),
        buttons: Yup.array().of(
            Yup.object().shape({
                buttonName: Yup.string().required(t('menuPage.errors.buttonNameRequired')),
                actionId: Yup.string().required(t('menuPage.errors.menuNameRequired'))
            })
        )
    })

    const defaultValues = { menuName: '', actionId: '', buttons: [{ buttonName: '', actionId: '' }] }

    const methods = useForm({
        resolver: yupResolver(addMenuSchema),
        defaultValues,
        mode: 'all'
    })

    const theme = useTheme()

    const { handleSubmit, control, reset } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'buttons'
    })

    const onSubmit = async (data: IAddMenu) => {
        const menuData = { menus: [data] }
        await createMenu(menuData, {
            onSuccess(data, _variables, _context) {
                if (data.status === 200) {
                    Toast({
                        message: t(`menuPage.messages.${data.data.message}`),
                        type: 'success'
                    })
                    methods.reset()
                    closeModal()
                }
            }
        }).catch((data) => {
            Toast({
                message: t(`menuPage.messages.${data.message}`),
                type: 'error'
            })
        })
    }

    const addButton = () => {
        append({ buttonName: '', actionId: '' })
    }

    const handleCloseModal = () => {
        closeModal()
        reset()
    }

    const deleteButton = (buttonIndex: number) => {
        remove(buttonIndex)
    }

    return (
        <Box>
            <CustomModal open={open} handleClose={handleCloseModal} title={t('menuPage.addMenu.title')}>
                <Grid container>
                    <Grid item xs={12}>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid container sx={{ padding: '2rem' }}>
                                        <Typography>{t('menuPage.addMenu.menuName')}</Typography>
                                        <CustomTextField name={`menuName`} variant="outlined" sx={{ width: '92%' }} />
                                        <Typography>{t('menuPage.addMenu.actionId')}</Typography>
                                        <CustomTextField name={`actionId`} variant="outlined" sx={{ width: '92%' }} />
                                        <IconButton
                                            sx={{
                                                color: COMMON.common.red,
                                                cursor: 'pointer',
                                                ':hover': { background: 'transparent' }
                                            }}
                                        >
                                            <>
                                                <AddIcon />
                                                <Typography onClick={addButton}>{t('menuPage.addMenu.addButton')}</Typography>
                                            </>
                                        </IconButton>
                                        {fields?.map((_, buttonIndex) => (
                                            <Grid container alignItems="center" key={buttonIndex} sx={{ marginTop: '4%' }}>
                                                <Grid p={3} sx={{ border: `1px solid ${theme.palette.primary.main}` }} md={11} xs={11}>
                                                    <Typography>{t('menuPage.addMenu.nameButton')}</Typography>
                                                    <CustomTextField
                                                        name={`buttons.${buttonIndex}.buttonName`}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                    <Typography>{t('menuPage.addMenu.actionId')}</Typography>
                                                    <CustomTextField
                                                        name={`buttons.${buttonIndex}.actionId`}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid md={1} display="flex" justifyContent="flex-end" xs={1}>
                                                    <Image
                                                        src={ImgPaths.delete_icon}
                                                        onClick={() => {
                                                            deleteButton(buttonIndex)
                                                        }}
                                                        width={'18px'}
                                                        sx={{ cursor: 'pointer' }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <CustomButton
                                            variant="contained"
                                            backGroundColor={theme.palette.primary.main}
                                            textColor={theme.palette.common.white}
                                            hoover={false}
                                            border={'none'}
                                            type="submit"
                                            sx={{ padding: '1rem', width: '50%' }}
                                        >
                                            {t('common.confirm')}
                                        </CustomButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </FormProvider>
                    </Grid>
                </Grid>
            </CustomModal>
        </Box>
    )
}

export default AddMenuModal
