import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

// components
//
import { languages, defaultLang } from './config'

// ----------------------------------------------------------------------

const useTranslations = () => {
    const { i18n, t } = useTranslation()

    const langStorage = localStorage.getItem('i18nextLng')

    const currentLang = languages.find((lang) => lang.value === langStorage) || defaultLang

    const onChangeLang = useCallback(
        (lng: string) => {
            i18n.changeLanguage(lng)
        },
        [i18n]
    )

    return {
        languages,
        t,
        currentLang,
        onChangeLang
    }
}

export default useTranslations
