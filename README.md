# Hawkeye Design System (HDS)
A design system for the University of Iowa.

https://uiowa.github.io/hds/

## Requirements
[Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) is used to lock the version of Node to the latest LTS.

After installing NVM, run `nvm use`. You may need to install the specified version of Node using `nvm install`.

## Usage
First, install NPM dependencies:
```
npm install
```

If you want to compile assets with Gulp, you can install the Gulp CLI globally per the NVM version or run it through an NPM script.

### Gulp CLI
```
nvm use
npm install -g gulp-cli
gulp watch
```

### NPM Script
```
npm run watch
```

### Building the Docs

You can install the Fractal CLI globally per the NVM version or run it through an NPM script.

#### Fractal CLI
```
nvm use
npm i -g @frctl/fractal
fractal build
```

#### NPM Script
```
npm run build
```

This will also run `gulp` as a prebuild task.

#### Viewing the HDS Locally
Start the Fractal server to view the HDS.

```
npm run start
```

The command will output the server URL to visit in your browser, ex. http://localhost:3000.

### Continuous Integration
[![Build Status](https://travis-ci.com/uiowa/hds.svg?branch=master)](https://travis-ci.com/uiowa/hds)

TravisCI is used to build and deploy the Fractal artifact to the `gh-pages` branch. This branch is set to host the HDS using GitHub Pages. All commits to `master` will trigger a deployment to GitHub Pages.

