'use strict';

const path = require('path');
const mandelbrot = require('@frctl/mandelbrot');
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Give your project a title.
 */
fractal.set('project.title', 'UIDS');

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

const hawkeyeTheme = mandelbrot({
    lang: 'en-US',
      skin: 'white',
      // display context data in YAML
      format: 'yaml',
      // which panels to show
      panels: [
        'html',
        'notes',
        'view',
        'context',
        'resources',
        'info',
      ],
});

fractal.web.theme(hawkeyeTheme); // tell Fractal to use the configured theme by default
fractal.components.set('default.preview', '@preview');
