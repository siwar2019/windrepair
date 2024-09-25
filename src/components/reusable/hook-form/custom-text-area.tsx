import { useFormContext, Controller } from 'react-hook-form'
import { FormControl, FormHelperText, styled } from '@mui/material'
import { COMMON } from '../../../theme/palette'

type CustomTextareaProps = {
    name: string
    border?: 'formTextField' | 'simpleTextField'
    borderRadius?: string
    helperText?: string
    minRows?: number
    maxRows?: number
    disabled?: boolean
}

const CustomTextarea = ({ name, border, borderRadius, helperText, minRows = 2, maxRows, disabled, ...other }: CustomTextareaProps) => {
    const { control } = useFormContext()
    const StyledTextarea = styled('textarea')(({ theme }) => ({
        width: '100%',
        padding: '0.6rem',
        fontSize: '0.875rem',
        borderColor: COMMON.common.clearGray,
        borderRadius: border === 'formTextField' ? borderRadius ?? '3rem' : '0.45rem',
        '&:focus': {
            outline: 'none',
            borderColor: theme.palette.primary.dark
        }
    }))

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth>
                    <StyledTextarea
                        {...field}
                        rows={minRows}
                        onChange={(event) => field.onChange(event.target.value)}
                        {...other}
                        sx={error ? { border: `1px solid ${COMMON.common.red}` } : undefined}
                        disabled={disabled}
                    />
                    <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default CustomTextarea
