import { enUS, frFR } from '@mui/material/locale'

export const languages = [
    {
        label: 'language.english',
        value: 'en',
        systemValue: enUS,
        icon: 'twemoji:flag-united-kingdom'
    },
    {
        label: 'language.french',
        value: 'fr',
        systemValue: frFR,
        icon: 'twemoji:flag-france'
    }
]

export const defaultLang = languages[0] // English
