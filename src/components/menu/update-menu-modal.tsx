import { useTranslations } from '../../translation'
import { Box, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import CustomModal from '../reusable/customModal/custom-modal'
import * as Yup from 'yup'
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '../reusable/hook-form/custom-text-field'
import CustomButton from '../reusable/hook-form/custom-button'
import Toast from '../reusable/custom-toast'
import { useEditMenu } from '../../hooks/menu.hook'
import { IMenu, TEditMenuForm } from '../../interfaces/menu/menu'
import Image from '../reusable/reusableImage'
import { ImgPaths } from '../../utils/image-paths'
import { COMMON } from '../../theme/palette'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

interface UpdateMenuModalProps {
    open: boolean
    onClose: () => void
    menu: IMenu
}
const UpdateMenuModal = ({ open, onClose, menu }: UpdateMenuModalProps) => {
    const { t } = useTranslations()
    const { id, name, actionId, buttons } = menu || {}

    const { mutateAsync: editMenu } = useEditMenu()

    const updateMenuSchema = Yup.object().shape({
        name: Yup.string().required(),
        actionId: Yup.string().required(),
        buttons: Yup.array()
            .of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    name: Yup.string().required(),
                    actionId: Yup.string().required()
                })
            )
            .required(),
        idsDeleted: Yup.array().of(Yup.number())
    })

    const defaultValues = {
        name: name || '',
        actionId: actionId || '',
        buttons:
            buttons?.map((button) => ({
                id: button.id,
                name: button.name || '',
                actionId: button.actionId || ''
            })) || []
    }

    const methods = useForm({
        resolver: yupResolver(updateMenuSchema),
        defaultValues,
        mode: 'all'
    })

    const theme = useTheme()

    const { handleSubmit, control } = methods

    const { append } = useFieldArray({
        control,
        name: 'buttons'
    })

    const buttonsWatch = useWatch({
        control,
        name: 'buttons'
    })

    const addButton = () => {
        append({ id: -1, name: '', actionId: '' })
    }

    const [idsDeleted, setIdsDeleted] = useState<number[]>([])

    const deleteButton = (buttonIndex: number, id: number) => {
        if (buttonsWatch) {
            const currentWatch = [...buttonsWatch]
            if (id !== -1 && setIdsDeleted) {
                setIdsDeleted((prevDeletedIds: number[]) => [...prevDeletedIds, id])
            }
            currentWatch.splice(buttonIndex, 1)
            methods.setValue('buttons', currentWatch)
        }
    }

    const onSubmit = async (data: TEditMenuForm) => {
        try {
            await editMenu({
                id,
                ...data,
                idsDeleted
            })
            Toast({
                message: t(`menuPage.updateMenu.success`),
                type: 'success'
            })
            onClose()
        } catch (_err) {
            Toast({
                message: t(`menuPage.updateMenu.error`),
                type: 'error'
            })
        }
    }

    return (
        <CustomModal open={open} handleClose={onClose} title={t('menuPage.updateMenu.title')}>
            <Box>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={1}>
                            <Grid container gap={1}>
                                <Grid item xs={12} sm={12}>
                                    <Typography>{t('menuPage.addMenu.menuName')}</Typography>
                                    <CustomTextField name={`name`} variant="outlined" />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Typography>{t('menuPage.addMenu.actionId')}</Typography>
                                    <CustomTextField name={`actionId`} variant="outlined" disabled={Boolean(actionId)} />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <IconButton
                                        sx={{
                                            color: COMMON.common.red,
                                            cursor: 'pointer',
                                            ':hover': { background: 'transparent' }
                                        }}
                                    >
                                        <AddIcon />
                                        <Typography onClick={addButton}>{t('menuPage.addMenu.addButton')}</Typography>
                                    </IconButton>
                                </Grid>

                                {buttonsWatch?.map((item, buttonIndex) => (
                                    <Grid container alignItems="center" key={item.id} sx={{ marginTop: '2%' }}>
                                        <Grid p={3} sx={{ border: `1px solid ${theme.palette.primary.main}` }} md={11} xs={11}>
                                            <Typography>{t('menuPage.addMenu.nameButton')}</Typography>
                                            <CustomTextField name={`buttons.${buttonIndex}.name`} variant="outlined" fullWidth />

                                            <Typography>{t('menuPage.addMenu.actionId')}</Typography>
                                            <CustomTextField
                                                name={`buttons.${buttonIndex}.actionId`}
                                                variant="outlined"
                                                fullWidth
                                                disabled={item.id !== -1}
                                            />
                                        </Grid>
                                        <Grid md={1} display="flex" justifyContent="flex-end" xs={1}>
                                            <Image
                                                src={ImgPaths.delete_icon}
                                                onClick={() => {
                                                    deleteButton(buttonIndex, item.id)
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
                                    sx={{ padding: '1rem', width: '30%' }}
                                >
                                    {t('common.confirm')}
                                </CustomButton>
                            </Grid>
                        </Stack>
                    </form>
                </FormProvider>
            </Box>
        </CustomModal>
    )
}

export default UpdateMenuModal
