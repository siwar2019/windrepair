import { alpha, Theme } from '@mui/material/styles'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { typography } from './typography'

export const overrides = (theme: Theme) => {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box'
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    WebkitOverflowScrolling: 'touch'
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%'
                },
                '#root': {
                    width: '100%',
                    height: '100%'
                },
                input: {
                    '&[type=number]': {
                        MozAppearance: 'textfield',
                        '&::-webkit-outer-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none'
                        },
                        '&::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none'
                        }
                    }
                },
                img: {
                    maxWidth: '100%',
                    display: 'inline-block',
                    verticalAlign: 'bottom'
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha(theme.palette.grey[900], 0.8)
                },
                invisible: {
                    background: 'transparent'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 1,
                    fontWeight: typography.fontWeightMedium,
                    minHeight: 40
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: Number(theme.shape.borderRadius) * 2,
                    position: 'relative',
                    zIndex: 0 // Fix Safari overflow: hidden with border radius
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: { variant: 'h6' },
                subheaderTypographyProps: { variant: 'body2' }
            },
            styleOverrides: {
                root: {
                    padding: theme.spacing(3, 3, 0)
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    [`& .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: alpha(theme.palette.grey[500], 0.24)
                    }
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 1
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: theme.palette.text.secondary
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: theme.palette.grey[800]
                },
                arrow: {
                    color: theme.palette.grey[800]
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                paragraph: {
                    marginBottom: theme.spacing(2)
                },
                gutterBottom: {
                    marginBottom: theme.spacing(1)
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    ...theme.typography.body2
                }
            }
        }
    }
}
