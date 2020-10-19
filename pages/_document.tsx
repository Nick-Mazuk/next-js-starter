import Document, { Head, Html, Main, NextScript } from 'next/document'

import { trackingCode } from 'lib/gtag'

export default class MyDocument extends Document {
    // eslint-disable-next-line class-methods-use-this -- required for next js
    render(): JSX.Element {
        return (
            <Html lang='en'>
                <Head>
                    {trackingCode}
                    <link
                        href='https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='dns-prefetch' href='https://fonts.gstatic.com' />
                    <link rel='dns-prefetch' href='https://www.google-analytics.com' />
                    <link rel='dns-prefetch' href='https://www.gstatic.com' />
                </Head>
                <body className='w-screen overflow-x-hidden flex flex-col justify-between min-h-screen antialiased text-gray-900 bg-white dark:text-gray-d900 dark:bg-black'>
                    {/* header items go here */}
                    <Main />
                    {/* eslint-disable-next-line no-inline-comments -- it's a prettier/eslint conflict */}
                    <div className='mt-auto'>{/* footer items go here */}</div>
                    <NextScript />
                </body>
            </Html>
        )
    }
}
