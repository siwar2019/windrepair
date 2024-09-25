import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
//
import { defaultLang } from './config'
//
import translationEn from './langs/en.json'
import translationFr from './langs/fr.json'

// ----------------------------------------------------------------------

const lng = localStorage.getItem('i18nextLng') || defaultLang.value

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translations: translationEn },
            fr: { translations: translationFr }
        },
        lng,
        fallbackLng: lng,
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n
