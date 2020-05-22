'use strict';

const path = require('path');
const pkg = require('./package.json');
const fractal = module.exports = require('@frctl/fractal').create();
const webUITheme = require('mono-fractal')({
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
fractal.set('project.repository', pkg._from)
fractal.set('project.version', pkg.version)

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
 * Tell Fractal where to look for components.
 *
 */

fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');
fractal.components.set('path', path.join(__dirname, 'components'));

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'documentation'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'dist'));
fractal.web.set('builder.dest', __dirname + '/docs');

// const hawkeyeTheme = mandelbrot({
//     lang: 'en-US',
//     skin: 'white',
//     // display context data in YAML
//     format: 'yaml',
//     // which panels to show
//     panels: [
//         'html',
//         'resources',
//         'context',
//         'info',
//     ],
// });

fractal.web.theme(webUITheme); // tell Fractal to use the configured theme by default
fractal.components.set('default.preview', '@preview');
