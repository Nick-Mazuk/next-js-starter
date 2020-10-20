import { useEffect } from 'react'

import type { AppProps, NextWebVitalsMetric } from 'next/app'
import getConfig from 'next/config'

import { RewriteFrames } from '@sentry/integrations'
import { init } from '@sentry/node'

import { trackPageChanges, webVitals } from 'lib/gtag'

import 'styles/globals.css'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const config = getConfig()
    const distDirectory = `${config.serverRuntimeConfig.rootDir}/.next`
    init({
        enabled: process.env.NODE_ENV === 'production',
        integrations: [
            new RewriteFrames({
                iteratee: (frame) => {
                    frame.filename = frame.filename?.replace(distDirectory, 'app:///_next')
                    return frame
                },
            }),
        ],
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    })
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    useEffect(() => {
        trackPageChanges()
    }, [])

    return (
        <>
            {/* header items go here */}
            <Component {...pageProps} />
            {/* eslint-disable-next-line no-inline-comments -- it's a prettier/eslint conflict */}
            <div className='mt-auto'>{/* footer items go here */}</div>
        </>
    )
}

export default MyApp

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
    webVitals(metric)
}
