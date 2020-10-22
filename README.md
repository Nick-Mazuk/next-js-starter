# Next JS Starter

A very opinionated starter for Next JS. It's configured to suit personal needs exactly, and it comes pre-configured with everything you'll need out of the box.

> Note: If you do not wish to use my components, CI, function library, ESLint/TypeScript configs, Tailwind CSS, etc., you should not use this starter.

## Getting Started

This is a template repository, so follow the [GitHub documentation for using template repositories](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).

> Do not select "include all branches".

After installation, update dependencies

```bash
npm run update-modules
```

And install `node_modules`

```bash
npm install

```

## Starting the website

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

## Continuous Integration

By default, the `main` branch should house all pre-release code. Then, when you're ready to deploy to production, merge into the `production` branch.

This will also run several CI tests with GitHub actions.

To set this up, just create a `production` branch.
