import { Grid, TableCell, TableRow, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ImgPaths } from '../../utils/image-paths'
import Image from '../reusable/reusableImage'
import { useCallback, useState } from 'react'
import { COMMON } from '../../theme/palette'
import { IPartner } from '../../interfaces/partner'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {  useUpdateStatus } from '../../hooks/partner.hook'
import CustomModal from '../reusable/customModal/custom-modal'
import { FormProvider, useForm } from 'react-hook-form'
import { TextFieldStyled } from '../../styles/employee.style'
import { StyledTypography } from '../../styles/modal.style'
import Toast from '../reusable/custom-toast'
import CustomSelectMenu from '../reusable/custom-select-menu'
import PaymentPartnerDetailsView from '../payment/view/payment-partner-details'
type PartnersListProps = {
    rowData: IPartner
}

const PartnerRows = ({ rowData }: PartnersListProps) => {
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)
    const [openDetailsPayment, setOpenDetailsPayment] = useState(false)

    const methods = useForm()
    const [statusToUpdate, setStatusToUpdate] = useState<string | boolean | null>(null)
    const { id, companyName, email, phone, isActive } = rowData

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false)
        setStatusToUpdate(null)
    }

    const handleOpenConfirmation = (newStatus: string | boolean | null) => {
        setStatusToUpdate(newStatus)
        setOpenConfirmation(true)
    }

    const { mutateAsync: updateStatusPartner } = useUpdateStatus()

    const handleChangeStatus = useCallback(async () => {
        if (statusToUpdate !== null) {
            await updateStatusPartner(
                { id, isActive: statusToUpdate },

                {
                    onSuccess(data, _variables, _context) {
                        if (data.status === 200) {
                            Toast({
                                message: t('productPage.messages.updatePartner'),
                                type: 'success'
                            })
                        }
                    }
                }
            ).catch((data) => {
                Toast({
                    message: t(`productPage.messages.${data.message}`),
                    type: 'error'
                })
            })

            handleCloseConfirmation()
        }
    }, [id, statusToUpdate])

    const theme = useTheme()
    const { t } = useTranslation()

    const togglePartnersDetails = () => {
        setOpenDetails((prev) => !prev)
    }
    const paymentPartnersDetails = (value: boolean) => {
        setOpenDetailsPayment(value)
    }
    const labelColor = (isActive: unknown) => {
        switch (isActive) {
            case true:
                return COMMON.common.primary
            case false:
                return theme.palette.primary.main

            default:
                return ''
        }
    }
    const labelTraduction = (isActive: unknown) => {
        switch (isActive as boolean) {
            case true:
                return t('employee.active')
            case false:
                return t('employee.inactive')

            default:
                return ''
        }
    }
    const partnerStatus = [true, false]
    return (
        <>
            <TableRow>
                <TableCell align="center">{companyName}</TableCell>
                <TableCell align="center">{email}</TableCell>
                <TableCell align="center">{phone}</TableCell>
                <TableCell align="center">
                    <CustomSelectMenu
                        openConfirmation={openConfirmation} //modal open props
                        handleCloseConfirmation={handleCloseConfirmation}
                        handleOpenConfirmation={handleOpenConfirmation} //on item click function
                        handleChangeStatus={handleChangeStatus} //the modal confirm function
                        description={t('updateModal.status')} //modal title description
                        labelColor={labelColor} //color of items
                        labelTraduction={labelTraduction} //items  name list
                        status={isActive} //dependency
                        listStatus={partnerStatus} //items values
                        endIcon={<KeyboardArrowDownIcon />} //if has icon
                        displayMenu={true}
                    />
                </TableCell>
                <TableCell align="center" sx={{ gap: 2 }}>
                    <Image
                        alt={t('updateModal.details')}
                        onClick={() => togglePartnersDetails()}
                        src={ImgPaths.details}
                        sx={{ cursor: 'pointer', pr: 1 }}
                    />
                     <Image
                     width={15}
                        alt={t('updateModal.details')}
                        onClick={() => paymentPartnersDetails(true)}
                        src={ImgPaths.paymenticon}
                        sx={{ cursor: 'pointer', pr: 1 }}
                    />
                </TableCell>
            </TableRow>

            <FormProvider {...methods}>
                <CustomModal
                    open={openDetails}
                    handleClose={togglePartnersDetails}
                    title={t('updateModal.titleDetails')}
                    maxWidth="30rem"
                >
                    <Grid container item flexDirection="row" spacing={2} justifyContent="center">
                        <Grid item md={6} xs={12}>
                            <StyledTypography>{t('updateModal.name')}</StyledTypography>
                            <TextFieldStyled disabled name="name" border="simpleTextField" value={companyName} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <StyledTypography>{t('updateModal.email')}</StyledTypography>
                            <TextFieldStyled disabled name="email" border="simpleTextField" value={email} />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <StyledTypography>{t('updateModal.phone')}</StyledTypography>
                            <TextFieldStyled disabled name="phone" border="simpleTextField" value={phone} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <StyledTypography>{t('updateModal.status')}</StyledTypography>
                            <TextFieldStyled
                                disabled
                                name="status"
                                border="simpleTextField"
                                value={isActive ? t('employee.active') : t('employee.inactive')}
                            />
                        </Grid>
                    </Grid>
                </CustomModal>
            </FormProvider>
            {openDetailsPayment && <PaymentPartnerDetailsView id={id} open={openDetailsPayment} onClose={() => paymentPartnersDetails(false)} />}

        </>
    )
}

export default PartnerRows
