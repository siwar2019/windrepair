import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

// @mui
import { TextField, TextFieldProps, styled } from '@mui/material'

type CustomTextFieldProps = TextFieldProps & {
    name: string
    border?: 'formTextField' | 'simpleTextField'
    startIcon?: React.ReactNode
    isRounded?: boolean
    endIcon?: React.ReactNode
}
const StyledTextField = styled(TextField)<CustomTextFieldProps>(({ theme, border }) => ({
    '& .root-MuiOutlinedInput-root': {
        border: `1px solid ${theme.palette.primary.main}`,
        padding: '0.25rem',
        fontSize: '0.875rem'
    },
    '& .MuiOutlinedInput-root': {
        padding: '0.05rem',
        fontSize: '0.875rem',

        ...(border === 'formTextField' && {
            borderRadius: '3rem'
        })
    },
    '& .MuiFormHelperText-root': {
        fontSize: '0.75rem'
    },
    '& .css-1rey1cy-MuiFormLabel-root-MuiInputLabel-root': {
        top: '2rem'
    },
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
        color: 'transparent',
        opacity: 0
    }
}))
const CustomTextField = ({ name, helperText, type, border, startIcon, endIcon, ...other }: CustomTextFieldProps) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <StyledTextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    type={type}
                    border={border}
                    InputProps={{ startAdornment: startIcon, endAdornment: endIcon }}
                    onChange={(event) => {
                        if (type === 'number') {
                            field.onChange(event.target.value ? Number(event.target.value) : null)
                        } else {
                            field.onChange(event.target.value)
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                ></StyledTextField>
            )}
        />
    )
}
export default CustomTextField
