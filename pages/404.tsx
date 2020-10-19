import { Button } from '@nick-mazuk/ui/elements/button'
import { Text } from '@nick-mazuk/ui/elements/text'
import { Layout } from 'components/layout'

export default function Custom404(): JSX.Element {
    return (
        <Layout title='404'>
            <section className='pt-48 text-center wrapper'>
                <Text hidden h1>
                    404 - page not found
                </Text>
                <Text h5 as='p'>
                    Oops…
                </Text>
                <Text h3 as='p' color='text-primary'>
                    This is awkward
                </Text>
                <div className='mt-8 mb-12'>
                    <Text>Looks like the page you're looking for has been moved, deleted.</Text>
                </div>
                <Button value='Take me home' href='/' color='primary' />
            </section>
        </Layout>
    )
}
