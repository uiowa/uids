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
    lang: 'en-US',
    styles: [
        'default',
        '/assets/css/theme.css'
    ],
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
fractal.set('project.title', 'UIDS - UIOWA Design System');
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
uidsTheme.addLoadPath(__dirname + '/theme/views');
fractal.web.theme(uidsTheme); // tell Fractal to use the configured theme by default
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);

fractal.components.set("statuses", {
  prototype: {
    label: "Prototype",
    description: "Do not implement.",
    color: "#D10000",
  },
  wip: {
    label: "WIP",
    description: "Work in progress. Implement with caution.",
    color: "#A84F00",
  },
  ready: {
    label: "Ready",
    description: "Ready to implement.",
    color: "#187718",
  },
});

fractal.docs.set("statuses", {
  draft: {
    label: "Draft",
    description: "Work in progress.",
    color: "#A84F00",
  },
  ready: {
    label: "Ready",
    description: "Ready for referencing.",
    color: "#187718",
  },
});
