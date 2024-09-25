import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'

export const ColorStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.lineHorizontal}`]: {
        marginTop: '15px',
        marginLeft: '15px',
        marginRight: '15px',
        borderColor: theme.palette.primary.main,
        borderTopWidth: '3px'
    }
}))

export const ColorStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.common.white,
    zIndex: 1,
    color: theme.palette.primary.main,
    width: 55,
    height: 55,
    display: 'flex',
    borderRadius: '50%',
    border: `3px solid ${theme.palette.primary.main}`,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: 20,
    ...(ownerState.active && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    }),
    ...(ownerState.completed && {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main
    })
}))
