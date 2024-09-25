import { forwardRef } from 'react'
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// @mui
import Box, { BoxProps } from '@mui/material/Box'

type ImageProps = BoxProps &
    LazyLoadImageProps & {
        width?: string | number
    }

const Image = forwardRef<HTMLSpanElement, ImageProps>(({ src, alt, effect, width, sx, ...other }, ref) => {
    const content = (
        <Box
            component={LazyLoadImage}
            //

            alt={alt}
            src={src}
            effect={effect || 'blur'}
            //
            sx={{
                width: width || 1,
                height: 1,
                objectFit: 'cover',
                verticalAlign: 'bottom'
            }}
        />
    )

    return (
        <Box
            ref={ref}
            component="span"
            className="component-image"
            sx={{
                overflow: 'hidden',
                position: 'relative',
                verticalAlign: 'bottom',
                display: 'inline-block',

                '& span.component-image-wrapper': {
                    width: 1,
                    height: 1,
                    verticalAlign: 'bottom',
                    backgroundSize: 'cover !important'
                },
                ...sx
            }}
            {...other}
        >
            {content}
        </Box>
    )
})

export default Image
