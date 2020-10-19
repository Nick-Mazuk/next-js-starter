const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')()

const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {
    NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
    SENTRY_ORG,
    SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN,
    NODE_ENV,
    VERCEL_GITHUB_COMMIT_SHA,
} = process.env

const COMMIT_SHA = VERCEL_GITHUB_COMMIT_SHA

process.env.SENTRY_DSN = SENTRY_DSN
const basePath = ''

module.exports = withPlugins(
    [{ reactStrictMode: true, poweredByHeader: false }],
    withSourceMaps({
        serverRuntimeConfig: {
            rootDir: __dirname,
        },
        webpack: (config, options) => {
            if (!options.isServer) {
                config.resolve.alias['@sentry/node'] = '@sentry/browser'
            }

            config.module.rules.push({
                test: /node_modules.*mazuk\/.*ts(x)?/,
                use: [options.defaultLoaders.babel]
            })

            if (
                SENTRY_DSN &&
                SENTRY_ORG &&
                SENTRY_PROJECT &&
                SENTRY_AUTH_TOKEN &&
                COMMIT_SHA &&
                NODE_ENV === 'production'
            ) {
                config.plugins.push(
                    new SentryWebpackPlugin({
                        include: '.next',
                        ignore: ['node_modules'],
                        stripPrefix: ['webpack://_N_E/'],
                        urlPrefix: `~${basePath}/_next`,
                        release: COMMIT_SHA,
                    })
                )
            }
            return config
        },
        basePath,
    })
)
