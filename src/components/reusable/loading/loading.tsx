import React from 'react'
// @mui
import { CircularProgress } from '@mui/material'
// styles
import { StyledLoader } from '../../../styles/custom-loader.style'

const Loading = () => {
    return (
        <StyledLoader data-testid="loader">
            <CircularProgress color="primary" size={50} thickness={5} />
        </StyledLoader>
    )
}
export default Loading
