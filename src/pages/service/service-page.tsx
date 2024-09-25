import { useTranslation } from "react-i18next"

const ServicePage = () => {
    const { t } =useTranslation()

    return <>{t("homePage.servicePage")}</>
}
export default ServicePage
