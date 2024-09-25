import { LoadingButton } from '@mui/lab'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { primaryFont } from '../../../theme/typography'

interface CustomButtonProps extends ButtonProps {
    loading?: boolean
    backGroundColor: string
    textColor: string
    variant: 'text' | 'outlined' | 'contained'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: React.ReactNode
    size?: 'medium' | 'large' | 'small'
    hoover: boolean
    border: string
}

const CustomButton = ({
    backGroundColor,
    textColor,
    variant,
    onClick,
    children,
    loading,
    size,
    hoover,
    border,
    ...other
}: CustomButtonProps) => {
    const StyledButton = styled(Button)<CustomButtonProps>(({ theme }) => ({
        '&.MuiButtonBase-root, .MuiButton-root': {
            fontSize: theme.typography.body2,
            fontWeight: primaryFont,
            textTransform: 'none',
            borderRadius: '6rem',
            fontFamily: primaryFont,
            color: textColor,
            backgroundColor: backGroundColor,
            border:
                border === theme.palette.common.white
                    ? `2px solid ${theme.palette.grey[700]}`
                    : border === theme.palette.primary.main
                      ? `2px solid ${theme.palette.primary.main}`
                      : border === theme.palette.grey['400']
                        ? `1px solid ${theme.palette.grey['400']}`
                        : 'none',

            '&:hover': {
                color: border === theme.palette.primary.main ? theme.palette.common.white : textColor,
                backgroundColor: border === theme.palette.primary.main ? theme.palette.primary.main : backGroundColor,
                border: border === theme.palette.primary.main ? `2px solid ${theme.palette.primary.main}` : 'none',
                opacity: hoover ? 1 : theme.palette.mode === 'light' ? 0.7 : 0.3
            }
        }
    }))
    const StyledLoadingButton = styled(LoadingButton)<CustomButtonProps>(({ theme }) => ({
        '&.MuiButtonBase-root, .MuiButton-root': {
            textTransform: 'none',
            borderRadius: '6rem',
            fontSize: theme.typography.body2,
            color: textColor,
            backgroundColor: backGroundColor,
            border:
                border === theme.palette.common.white
                    ? `1rem solid ${theme.palette.common.white}`
                    : border === 'red'
                      ? `1rem solid ${theme.palette.primary.main}`
                      : 'none',

            '&:hover': {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.primary.main,
                border: 'none',

                opacity: hoover ? 1 : theme.palette.mode === 'light' ? 0.7 : 0.3
            }
        }
    }))
    return (
        <>
            {loading ? (
                <StyledLoadingButton
                    fullWidth
                    backGroundColor={backGroundColor}
                    textColor={textColor}
                    hoover={false}
                    loading={loading}
                    onClick={onClick}
                    variant={variant}
                    size={size}
                    border={border}
                    {...other}
                >
                    {children}
                </StyledLoadingButton>
            ) : (
                <StyledButton
                    fullWidth
                    variant={variant}
                    textColor={textColor}
                    backGroundColor={backGroundColor}
                    onClick={onClick}
                    {...other}
                    size={size}
                    hoover={hoover}
                    border={border}
                >
                    {children}
                </StyledButton>
            )}
        </>
    )
}

export default CustomButton
