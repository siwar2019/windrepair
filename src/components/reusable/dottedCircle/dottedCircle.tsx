import { Box, Typography, useTheme } from '@mui/material'

interface DottedCircularProgressProps {
    value: number
    size: number
    minutes: number
    seconds: number
}

const DottedCircularProgress = ({ value, size, minutes, seconds }: DottedCircularProgressProps) => {
    const theme = useTheme()
    const primaryColor = theme.palette.primary.main

    const numDots = 20
    const radius = size / 2
    const strokeWidth = 5
    const circumference = 2 * Math.PI * (radius - strokeWidth / 2)
    const clampedValue = Math.min(Math.max(value, 0), 100)
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference

    const angleCovered = (clampedValue / 100) * 2 * Math.PI

    const formattedTime = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    return (
        <Box position="relative" display="inline-flex" width={size + 10} height={size + 10} padding={1}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    stroke={primaryColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                />
                {Array.from({ length: numDots }).map((_, i) => {
                    const angle = (i / numDots) * 2 * Math.PI
                    const x = radius + (radius - strokeWidth / 2) * Math.cos(angle)
                    const y = radius + (radius - strokeWidth / 2) * Math.sin(angle)

                    if (angle < angleCovered) {
                        return null
                    }

                    return <circle key={i} cx={x} cy={y} r={3} fill={primaryColor} stroke="transparent" strokeWidth={2} />
                })}
            </svg>
            <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
                <Typography component="div" color={primaryColor} fontSize={17}>
                    {formattedTime}
                </Typography>
            </Box>
        </Box>
    )
}

export default DottedCircularProgress
