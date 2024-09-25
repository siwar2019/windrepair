export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        neutral: string
    }
    interface SimplePaletteColorOptions {
        lighter: string
        darker: string
    }
    interface PaletteColor {
        lighter: string
        darker: string
    }
}

// SETUP COLORS

export const grey = {
    0: '#FFFFFF',
    100: '#F5F5F5',
    400: '#BDBDBD',
    800: '#2F333A',
    200: '#B7B7B7',
    300: '#4B5563',
    500: '#111827',
    900: '#333333',
    600: '#222222',
    700: '#F3F2F7',
    1000: '#333333',
    1100: '#A3A2A2',
    1200: '#E1E1E2'
}

const PRIMARY = {
    lighter: '#BFCC71',
    light: '#AACD4E',
    main: '#DB2512',
    dark: '#2B4448'
}

const SECONDARY = {
    light: '#3061B3',
    main: '#0D3259',
    dark: '#333333',
    darker: '#001B2E',
    lighter: '#E5FFFE'
}

export const COMMON = {
    common: {
        black: '#000000',
        white: '#FFFFFF',
        pink: '#ffcbc4',
        opacity: '#5F1009',
        clicked: '#ff9a8f',
        primary: '#219653',
        error: '#d32f2f',
        gray: '#8A8A8A',
        green: '#219653',
        orange: '#EB690B',
        red: '#DB2512',
        yellow: '#F7B609',
        grey: '#F9FAFB',
        blueGray: '#F2F2F2',
        clearGray: '#D0D5DD',
        orangeWhite: '#DB251259'
    },
    primary: PRIMARY,
    secondary: SECONDARY,
    grey,

    action: {
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
}

export const palette = (mode: 'light' | 'dark') => {
    const light = {
        ...COMMON,
        mode: 'light',
        background: {
            paper: COMMON.common.white,
            default: 'transparent',
            neutral: grey[100]
        }
    }

    const dark = {
        ...COMMON,
        mode: 'dark'
    }

    return mode === 'light' ? light : dark
}
