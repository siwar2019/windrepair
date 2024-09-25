import React, { useMemo } from 'react'
//
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeOptions, ThemeProvider as CustomThemeProvider } from '@mui/material/styles'

import { palette } from './palette'
import { typography } from './typography'
import { overrides } from './overrides'
import { direction, Rtl } from './change-direction'
import { useTranslations } from '../translation'
import i18n from '../translation/i18n'
import { merge } from 'lodash'

type ThemeProviderProps = {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { currentLang } = useTranslations()
    const baseOption = useMemo(
        () => ({
            palette: palette('light'),
            typography: typography,
            shape: { borderRadius: 8 }
        }),
        []
    )

    const directionOption = direction(i18n.dir())

    const memoizedValue = useMemo(() => merge(baseOption, directionOption), [baseOption, directionOption])

    const theme = createTheme(memoizedValue as ThemeOptions)
    theme.components = merge(overrides(theme))

    const themeLocale = useMemo(() => createTheme(theme, currentLang.systemValue), [currentLang.systemValue, theme])

    return (
        <Rtl direction={directionOption.direction}>
            <CustomThemeProvider theme={themeLocale}>
                <CssBaseline />
                {children}
            </CustomThemeProvider>
        </Rtl>
    )
}

export default ThemeProvider
