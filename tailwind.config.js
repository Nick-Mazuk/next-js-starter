/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */

const config = require('@nick-mazuk/ui-config/tailwind')

module.exports = {
    theme: config.theme,
    variants: config.variants,
    plugins: [require('@tailwindcss/typography')],
    future: config.future,
    purge: {
        content: ['./pages/**/*.tsx', './components/**/*.tsx', 'node_modules/@nick-mazuk/**/*.tsx'],
        preserveHtmlElements: true,
    },
    dark: config.dark,
    experimental: config.experimental,
}
