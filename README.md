# UI Design System (UIDS)
A design system for the University of Iowa.

http://uids.brand.uiowa.edu

## Requirements
[Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) is used to lock the version of Node to the latest LTS.

After installing NVM, run `nvm use`. You may need to install the specified version of Node using `nvm install`.

The node-gyp package requires a C compiler. If you notice node-gyp errors after installing dependencies, see the instructions for installing a C compiler based on your OS: https://github.com/nodejs/node-gyp#on-macos

## Installation
First, install NPM dependencies:
```
npm install
```

## Local viewing and development
The following command creates and runs a temporary server to view the site locally.
```
npm run watch
```
The command will output the server URL to visit in your browser, ex. http://localhost:3000.

### Where do I put my code?
*Note: There is a top-level `components` directory. This is in place to preserve compatibility with `uids_base`. This directory will be removed after `uids_base` is updated to accommodate recent directory changes.*

All work on components should be done in the `src/components` directory. Each component is contained in its own directory. Some component directories are grouped together for presentation purposes.

## Continuous Integration
[![Build Status](https://travis-ci.com/uiowa/uids.svg?branch=master)](https://travis-ci.com/uiowa/uids)

TravisCI is used to build and deploy the Fractal artifact to the `gh-pages` branch. This branch is set to host the UIDS using GitHub Pages. All commits to `master` will trigger a deployment to GitHub Pages.

