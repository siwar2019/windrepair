import { useTranslation } from "react-i18next"

const AboutPage = () => {
    const { t } =useTranslation()
    return <>{t("homePage.aboutPage")}</>
}
export default AboutPage
