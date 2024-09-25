type ResponsiveFontSizesProps = {
    xs?: number
    sm: number
    md: number
    lg: number
    xl: number
}

// ----------------------------------------------------------------------

export const remToPx = (value: string) => {
    return Math.round(parseFloat(value) * 16)
}

export const pxToRem = (value: number) => {
    return `${value / 16}rem`
}

export const responsiveFontSizes = ({ xs, sm, md, lg, xl }: ResponsiveFontSizesProps) => {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm)
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md)
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg)
        },
        '@media (min-width:2000px)': {
            fontSize: pxToRem(xl)
        }
    }
}

export const primaryFont = 'DM Sans'
export const secondaryFont = 'Days One'

// ----------------------------------------------------------------------

export const typography = {
    fontFamily: primaryFont,
    fontSecondaryFamily: secondaryFont,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
        fontWeight: 800,
        lineHeight: 80 / 64,
        fontSize: pxToRem(40),
        ...responsiveFontSizes({ sm: 52, md: 58, lg: 64, xl: 80 })
    },
    h2: {
        fontWeight: 500,

        lineHeight: 64 / 48,
        fontSize: pxToRem(32),
        ...responsiveFontSizes({ sm: 25, md: 30, lg: 33, xl: 60 })
    },
    h3: {
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        ...responsiveFontSizes({ sm: 15, md: 21, lg: 28, xl: 48 })
    },
    h4: {
        fontWeight: 500,

        lineHeight: 1.5,
        fontSize: pxToRem(20),
        ...responsiveFontSizes({ sm: 14, md: 15, lg: 18, xl: 20 })
    },
    h5: {
        lineHeight: 1.5,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 8, md: 11, lg: 14, xl: 30 })
    },
    h6: {
        fontWeight: 600,
        lineHeight: 28 / 18,
        fontSize: pxToRem(17),
        ...responsiveFontSizes({ sm: 14, md: 14, lg: 19, xl: 25 })
    },
    subtitle1: {
        fontWeight: 600,
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    subtitle2: {
        fontWeight: 600,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    body1: {
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    body2: {
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12)
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12)
    },
    button: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'none'
    }
}
