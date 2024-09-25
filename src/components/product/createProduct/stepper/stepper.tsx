import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckIcon from '@mui/icons-material/Check'
import { ColorStepConnector, ColorStepIconRoot } from '../../../../styles/stepper.style'

interface StepperProps {
    steps: string[]
    activeStep: number
}

const StepIconComponent = (props: StepIconProps) => {
    const { active, completed, className, icon } = props
    const stepNumber: { [index: string]: number } = {
        1: 1,
        2: 2,
        3: 3
    }

    const icons = {
        default: stepNumber[String(icon)],
        completed: <CheckIcon />,
        active: stepNumber[String(icon)]
    }

    return (
        <ColorStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed ? icons.completed : icons.default}
        </ColorStepIconRoot>
    )
}

const CustomizedSteppers = ({ steps, activeStep }: StepperProps) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorStepConnector />} orientation="horizontal">
                {steps.map((label, index) => {
                    return (
                        <Step key={label} completed={activeStep > index}>
                            <StepLabel StepIconComponent={StepIconComponent}></StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Stack>
    )
}

export default CustomizedSteppers
