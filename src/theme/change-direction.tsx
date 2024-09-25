import { useEffect } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

type RtlProps = {
    direction: 'rtl' | 'ltr'
    children: React.ReactNode
}

export const Rtl = ({ children, direction }: RtlProps) => {
    useEffect(() => {
        document.dir = direction
    }, [direction])

    const cacheRtl = createCache({
        key: 'rtl',
        stylisPlugins: []
    })

    if (direction === 'rtl') {
        return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
    }

    return <>{children}</>
}

// ----------------------------------------------------------------------

export const direction = (themeDirection: 'rtl' | 'ltr') => {
    const theme = {
        direction: themeDirection
    }

    return theme
}
