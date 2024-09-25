import { useTheme } from "@mui/material"
import { StyledActionButton } from "../../styles/modal.style"
import AlertModal from "../reusable/customModal/alert-modal"
import { useTranslations } from "../../translation"
interface IAlertProps {
    open:boolean,
    handleClose:()=>void
    onClick:()=>void
}
const LimitFundAlert=({open,handleClose,onClick}:IAlertProps) => {
    const theme=useTheme()
    const {t}=useTranslations()

return (
    <AlertModal
                open={open}
                handleClose={handleClose}
                dialogTitle={t('alertModal.title')}
                dialogContent={t('alertModal.description')}
            >
                <StyledActionButton
                    variant="contained"
                    data-testid="registerButton"
                    backGroundColor={theme.palette.common.white}
                    textColor={theme.palette.common.black}
                    hoover={false}
                    onClick={onClick}
                    border={theme.palette.grey['800']}
                    type="submit"
                >
                    {t('alertModal.upgrade')}
                </StyledActionButton>

                <StyledActionButton
                    variant="contained"
                    data-testid="registerButton"
                    onClick={handleClose}
                    backGroundColor={theme.palette.primary.main}
                    textColor={theme.palette.common.white}
                    hoover={false}
                    border={'none'}
                    type="submit"
                >
                    {t('alertModal.exit')}
                </StyledActionButton>
            </AlertModal>
)
}
export default LimitFundAlert