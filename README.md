# Hawkeye Design System

The Hawkeye Design System (HDS) is specific to the University of Iowa.

## Requirements
Node Version Manager is used to lock the version of Node to the latest LTS.

- (NVM)[https://github.com/nvm-sh/nvm]

After installing NVM, run `nvm use`. You may need to install the specified
version of Node using `nvm install`.

## How to Use
First, install NPM dependencies:
```
npm install
```

If you want to compile assets with Gulp, you can install the Gulp CLI globally
per the NVM version or run it through an NPM script.

### Gulp CLI
- `nvm use`
- `npm install -g gulp-cli`
- `gulp watch`

#### NPM Script
- `npm run gulp`

## Building the Docs

You can install the Fractal CLI globally per the NVM version or run it through
an NPM script.

### Fractal CLI
- `nvm use`
- `npm i -g @frctl/fractal`
- `fractal build`

### NPM Script
- `npm run build`

This will also run `gulp` as a prebuild task.

## Viewing the HDS
Start the Fractal server to view the HDS locally. The command will output the
server URL to visit in your browser, ex. http://localhost:3000.

- `npm run start`
