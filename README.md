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
npm install
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
* BEM: https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

### Components
Learn about Fractal components here: https://fractal.build/guide/components/#what-defines-a-component. Note that this project uses Twig (`.twig`) instead of Handlebars (`.hbs`).

All work on components should be done in the `src/components` directory. Each component is contained in its own directory. Some component directories are grouped together for presentation purposes.

If you are starting work on a new component, please make sure that it has `status: prototype` in its config file. and is placed in the `src/components/prototypes` directory.


### Continuous Integration
![Publish docs to GitHub Pages](https://github.com/uiowa/uids/workflows/Publish%20docs%20to%20GitHub%20Pages/badge.svg)
GitHub Actions is used to build and deploy the Fractal artifact to the `gh-pages` branch. This branch is set to host UIDS using GitHub Pages. All pushes to a branches or tags will trigger a build.

Branches can be accessed at http://uids.brand.uiowa.edu/branches/{your-branch-name}

