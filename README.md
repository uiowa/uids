# UI Design System (UIDS)
A design system for the University of Iowa.

See the documentation at http://uids.brand.uiowa.edu.

## Documentation
The documentation is built with Fractal.js. You can build and run a local version to aid in development.

### Requirements
[Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) is used to lock the version of Node to the latest LTS.

After installing NVM, run `nvm use`. You may need to install the specified version of Node using `nvm install`.

The node-gyp package requires a C compiler. If you notice node-gyp errors after installing dependencies, see the instructions for installing a C compiler based on your OS: https://github.com/nodejs/node-gyp#on-macos

### Install dependencies
First, install NPM dependencies:
```
npm ci
```

### Start the local server.
The following command creates and runs a temporary server to view the site locally.
```
npm run watch
```
The command will output the server URL to visit in your browser, ex. http://localhost:3000.

## Contributing
While we have not done a perfect job of applying any of these standards, we recommend the following resources as a starting point for best practices that are observed by this project:
* Writing CSS and HTML: https://codeguide.co/
* Block Element Modifier (BEM) CSS syntax: https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

### Creating a PR
When your feature branch is ready for testing or after you have made any requested changes, you need to run the following command to make sure that the distribution files get updated:
```bash
npm run dist
```

### Creating a Release
The following is an example of the workflow and not meant to be copied and pasted verbatim. Please review the summary at https://semver.org/ to understand which type of release you should be creating. The version numbers you will use when you are actually going through this process will depend on the current version number and what type of release you are creating.

To see the full options for the command, run `npm version --help`.
1. `git checkout main` - Make sure you are on the `main` branch.
2. `git pull` - Make sure you have the most recent updates.
4. `npm version patch -m "https://github.com/uiowa/uids/compare/v3.1.0...v3.1.1"`
5. `git push`
6. `git push --tags`
7. Go to https://github.com/uiowa/uids/releases/new.
8. Enter the "Tag version" using the version _with_ the `v` at the front (e.g. "v3.1.1").
9. Enter the "Release title" using the version _without_ the `v` at the front (e.g. "3.1.1").
10. Paste in the compare link into the description area: `https://github.com/uiowa/uids/compare/v3.1.0...v3.1.1`
11. Click the "Publish release" button.
12. Profit!

### Components
Learn about Fractal components here: https://fractal.build/guide/components/#what-defines-a-component. Note that this project uses Twig (`.twig`) instead of Handlebars (`.hbs`).

All work on components should be done in the `src/components` directory. Each component is contained in its own directory. Some component directories are grouped together for presentation purposes.

If you are starting work on a new component, please make sure that it has `status: prototype` in its config file, and it is placed in the `src/components/prototypes` directory.

### Continuous Integration
![Publish docs to GitHub Pages](https://github.com/uiowa/uids/workflows/Publish%20docs%20to%20GitHub%20Pages/badge.svg)

GitHub Actions is used to build and deploy the Fractal artifact to the `gh-pages` branch. This branch is set to host UIDS using GitHub Pages. All pushes to a branches or tags will trigger a build.

Branches can be accessed at http://uids.brand.uiowa.edu/branches/{your-branch-name}.

