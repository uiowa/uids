# UI Design System (UIDS)
A design system for the University of Iowa.

See the documentation at http://uids.brand.uiowa.edu.

## Documentation
The documentation uses Vue.js. You can build and run a local version to aid in development.

### Requirements
[Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) is used to lock the version of Node to the latest LTS.

After installing NVM, run `nvm use`. You may need to install the specified version of Node using `nvm install`.

The node-gyp package requires a C compiler. If you notice node-gyp errors after installing dependencies, see the instructions for installing a C compiler based on your OS: https://github.com/nodejs/node-gyp#on-macos

## Project Setup

### Install dependencies

```sh
yarn install
```

```sh
yarn install
```

### Start the local server OR start Storybook
Compile and hot-reload for development.

```sh
yarn dev
```

**OR**

```sh
yarn storybook
```

The command will output the server URL to visit in your browser, ex. http://localhost:3000.

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn build
yarn test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Contributing
While we have not done a perfect job of applying any of these standards, we recommend the following resources as a starting point for best practices that are observed by this project:
* Writing CSS and HTML: https://codeguide.co/
* Block Element Modifier (BEM) CSS syntax: https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

### Creating a PR
Before opening or updating a PR, run:

```bash
yarn build
```

`yarn build` generates and validates token CSS when `src/tokens/**` changes; no generated
token files are committed.

### Creating a Release
Releases use [Semantic Versioning](https://semver.org/). The release workflow builds the
tagged source and attaches an installable package to the GitHub release. Do not run
`npm pack` or upload the tarball manually.

1. Create and merge a release PR that updates `package.json` to the intended version,
   updates `CHANGELOG.md`, and passes `yarn build`. A SemVer prerelease version (for
   example, `5.0.0-alpha.0`) is valid when consumers need to test a release before it
   is declared stable.
2. Create a GitHub release from that merged commit with the matching tag, prefixed with
   `v` (for example, package version `5.0.0-alpha.0` uses tag `v5.0.0-alpha.0`).
3. Publish the GitHub release. The `Release` workflow verifies the tag/version match,
   runs `yarn build`, creates `uids-<version>.tgz`, and attaches it to the release.
4. Wait for the workflow to finish and verify that the tarball appears in the release's
   assets before asking a consumer to update. If it fails, rerun the `Release` workflow
   with that tag; do not upload a replacement tarball manually.

Consumers install the release artifact by URL:

```json
"@uiowa/uids": "https://github.com/uiowa/uids/releases/download/v5.0.0/uids-5.0.0.tgz"
```

### Components
Learn about Fractal components here: https://fractal.build/guide/components/#what-defines-a-component. Note that this project uses Twig (`.twig`) instead of Handlebars (`.hbs`).

All work on components should be done in the `src/components` directory. Each component is contained in its own directory. Some component directories are grouped together for presentation purposes.

If you are starting work on a new component, please make sure that it has `status: prototype` in its config file, and it is placed in the `src/components/prototypes` directory.

### Continuous Integration
![Publish docs to GitHub Pages](https://github.com/uiowa/uids/workflows/Publish%20docs%20to%20GitHub%20Pages/badge.svg)

GitHub Actions is used to build and deploy the Fractal artifact to the `gh-pages` branch. This branch is set to host UIDS using GitHub Pages. All pushes to a branches or tags will trigger a build.

Branches can be accessed at http://uids.brand.uiowa.edu/branches/{your-branch-name}.
