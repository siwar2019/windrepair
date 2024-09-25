import { Height } from '@mui/icons-material';
import { Switch, TextField, TextareaAutosize, styled } from '@mui/material'

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: '0.75rem 1rem  !important',

        '&.Mui-disabled': {
            WebkitTextFillColor: theme.palette.common.black
        }
    },
    paddingBottom: 2,
    width: "100%"
}));
export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    padding: '0.6rem',
    fontSize: '0.875rem',
    borderRadius:  '1rem' ,
    '&:focus': {
        outline: 'none',
        borderColor: theme.palette.primary.dark
    },
    '&:disabled': {
        resize: 'none'
    }
}))

export const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 100,
    height: 53,
    '& .MuiSwitch-switchBase': {
        width: 70,
        height: 50,
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(40px)'
        },
        ':hover': {
            backgroundColor: 'transparent'
        }
    },
    '& .MuiSwitch-track': {
        borderRadius: 20,
        width: '100%'
    },
    '& .MuiSwitch-switchBas' : {
        width: "68px" ,
        height: "56px",
        padding: "2px",
    },

}))
