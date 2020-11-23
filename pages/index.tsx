import { HeroSimple } from '@nick-mazuk/ui/marketing/layouts/heros/simple'
import { Layout } from 'components/layout'

export default function Home(): JSX.Element {
    return (
        <Layout title='Home'>
            <HeroSimple
                title='Welcome to Next.js Starter'
                subtitle='Get started by editing pages/index.tsx'
            />
        </Layout>
    )
}
