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
                <body className='flex flex-col justify-between w-screen min-h-screen overflow-x-hidden antialiased text-gray-900 bg-white dark:text-gray-d900 dark:bg-black'>
                    <Main />

                    <NextScript />
                </body>
            </Html>
        )
    }
}
