import { useTranslation } from "react-i18next"

const PricePage = () => {
    const { t } =useTranslation()

    return <>{t("homePage.pricePage")}</>
}
export default PricePage
