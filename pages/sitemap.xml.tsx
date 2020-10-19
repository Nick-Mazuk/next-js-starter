import { createGzip } from 'zlib'

import globby from 'globby'
import type { GetServerSideProps } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'

const Sitemap = (): JSX.Element => {
    return <div>Should not be navigated trough via next Link. Use standard a href.</div>
}
export default Sitemap

let sitemap: Buffer | null = null

const addNextUrls = async (smStream: SitemapStream): Promise<void> => {
    const pages = await globby([
        'pages/**/*{.ts,.tsx}',
        '!pages/_*{.ts,.tsx}',
        '!pages/**/*]{.ts,.tsx}',
        '!pages/*sitemap*{.ts,.tsx}',
        '!pages/*404*{.ts,.tsx}',
        '!pages/api',
    ])
    pages.forEach((page) => {
        const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
        const route = path === '/index' ? '' : path
        smStream.write({ url: `${route}` })
    })
}

const pingSearchEngines = (sitemapUrl: string): void => {
    fetch(`http://www.google.com/ping?sitemap=${sitemapUrl}`)
    fetch(`http://www.bing.com/ping?sitemap=${sitemapUrl}`)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, resolvedUrl }) => {
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    if (sitemap) {
        res.write(sitemap)
        res.end()
        return {
            props: {},
        }
    }

    const smStream = new SitemapStream({ hostname: `https://${req.headers.host}/` })
    const pipeline = smStream.pipe(createGzip())

    try {
        await addNextUrls(smStream)
        smStream.end()
        const resp = await streamToPromise(pipeline)

        /* cache the sitemap response (cache will be gone on next build.
       This cache is only useful if your content is static, and you must build the next app on every content change in the cms */

        // eslint-disable-next-line require-atomic-updates -- not race condition
        sitemap = resp

        res.write(resp)
        res.end()

        if (process.env.NODE_ENV === 'production') {
            const sitemapUrl = `https://${req.headers.host}${resolvedUrl}`
            pingSearchEngines(sitemapUrl)
        }
    } catch {
        // eslint-disable-next-line require-atomic-updates -- not race condition
        res.statusCode = 500
        res.write('Could not generate sitemap.')
        res.end()
    }

    return {
        props: {},
    }
}
