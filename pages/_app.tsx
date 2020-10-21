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
            <div className='flex flex-col w-screen min-h-screen overflow-x-hidden antialiased text-gray-900 bg-white dark:text-gray-d900 dark:bg-black'>
                {/* header items go here */}
                <Component {...pageProps} />
            </div>
            {/* footer items go here, built-in components will automatically stick to the bottom */}
        </>
    )
}

export default MyApp

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
    webVitals(metric)
}
