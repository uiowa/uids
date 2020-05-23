'use strict';

const paths = {
    build: `${__dirname}/www`,
    src: `${__dirname}/src`,
    static: `${__dirname}/tmp`,
}

const pkg = require('./package.json');
const fractal = module.exports = require('@frctl/fractal').create();
const uidsTheme = require('mono-fractal')({
    favicon: '/assets/icons/favicon.ico',
    panels: [
        'html',
        'resources',
        'context',
        'info',
    ],
});

/*
 * Give your project a title.
 */
fractal.set('project.title', 'UIDS');
fractal.set('project.repository', pkg.repository.url);
fractal.set('project.version', pkg.version);

/*
* Require the Twig adapter
*/
const twigAdapter = require('@frctl/twig')({
    // if pristine is set to true, bundled filters, functions, tests
    // and tags are not registered.
    // default is false
    pristine: false,
    // if importContext is set to true, all include calls are passed
    // the component's context
    // default is false
    importContext: false,
    // use custom handle prefix
    // this will change your includes to {% include '%button' %}
    // default is '@'
    handlePrefix: '@',
});

/*
 * Components config.
 */
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');
fractal.components.set('default.preview', '@preview');
fractal.components.set('path', `${paths.src}/components`);

/*
 * Documentation config.
 */
fractal.docs.set('path', `${paths.src}/docs`);

/*
 * Web UI config.
 */
fractal.web.theme(uidsTheme); // tell Fractal to use the configured theme by default
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);

