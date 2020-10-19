import type { ReactNode } from 'react'

import Head from 'next/head'

type Props = {
    children?: ReactNode | ReactNode[]
    title: string
}

const siteTitle = 'Next.js starter'

export const Layout = ({ children, title }: Props): JSX.Element => {
    return (
        <>
            <Head>
                <title>{title === '' ? siteTitle : `${title} | ${siteTitle}`}</title>
            </Head>

            <main id='content'>{children}</main>
        </>
    )
}

export type Layout = ReturnType<typeof Layout>
