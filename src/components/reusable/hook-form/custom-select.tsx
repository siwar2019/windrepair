import { useFormContext, Controller } from 'react-hook-form'
import { Select, MenuItem, InputLabel, FormControl, FormHelperText, Typography, SelectProps } from '@mui/material'
import { COMMON } from '../../../theme/palette'
import { useTranslations } from '../../../translation'
import { Options } from '../../../interfaces/options'

type CustomSelectProps = SelectProps & {
    name: string
    options: Options[]
    label?: string
    defaultValue?: any
    idInputLabel?: string
    idSelect?: string
    multiple?: boolean
    fieldName?: string
    placeholder?: string
    displayValue?: string
}

const CustomSelect = ({
    name,
    options,
    label,
    idSelect,
    idInputLabel,
    multiple = false,
    fieldName,
    placeholder = 'Select an option',
    displayValue,
    ...other
}: CustomSelectProps) => {
    const { control } = useFormContext()
    const { t } = useTranslations()
    return (
        <FormControl fullWidth variant="outlined">
            {label && <InputLabel id={idInputLabel}>{label}</InputLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            id={idSelect}
                            multiple={multiple}
                            {...field}
                            sx={{ padding: fieldName && '0px 0px 12px', borderRadius: '14px' }}
                            displayEmpty
                            error={!!error}
                            value={multiple ? field.value || [] : field.value}
                            renderValue={(selected) => {
                                if (displayValue) {
                                    return displayValue
                                }
                                if (fieldName && !selected) {
                                    return (
                                        <Typography
                                            sx={{
                                                '&.Mui-focused': {
                                                    color: COMMON.common.gray
                                                },
                                                color: error ? COMMON.common.error : COMMON.common.gray,
                                                fontSize: '15px'
                                            }}
                                        >
                                            {fieldName}
                                        </Typography>
                                    )
                                }
                                if (!multiple) {
                                    const selectedOption = options && options.find((option) => option.value === selected)
                                    return selectedOption ? selectedOption.label : ''
                                } else {
                                    const selectedLabels = options
                                        .filter((option) => selected.includes(option.value))
                                        .map((option) => option.label)
                                    return selectedLabels.join(', ')
                                }
                            }}
                            {...other}
                        >
                            <Typography fontStyle="italic">{t('common.selectOption')}</Typography>
                            {options && options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {error && <FormHelperText error>{error.message}</FormHelperText>}
                    </>
                )}
            />
        </FormControl>
    )
}

export default CustomSelect
