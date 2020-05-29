const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const fractal       = require('./fractal.config.js');
const logger        = fractal.cli.console;
const sass          = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
const glob          = require('gulp-sass-glob');
const sourcemaps    = require('gulp-sourcemaps');
const imagemin      = require('gulp-imagemin')


/*
 * Directories here
 */
var paths = {
    build: `${__dirname}/www`,
    src: `${__dirname}/src`,
    dest: `${__dirname}/tmp`,
};

// Clean
function clean() {
    return del(`${paths.dest}/assets/`);
}

function assetsCopy() {
    return src([
        `${paths.src}/assets/**/*.woff`,
        `${paths.src}/assets/**/*.woff2`,
        `${paths.src}/assets/**/*.js`,
        `${paths.src}/assets/**/*.jpg`,
        `${paths.src}/assets/**/*.png`,
        `${paths.src}/assets/**/*.svg`,
        `${paths.src}/assets/**/*.css`,
    ])
    .pipe(dest(`${paths.dest}/assets`));
}

// Icons
function icons() {
    return src(`${paths.src}/assets/icons/**/*`)
        .pipe(imagemin())
        .pipe(dest(`${paths.dest}/assets/icons`));
}

function componentCssInPlace() {
    console.log('Generating CSS for components in place');
    return src(`${paths.src}/components/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(`${paths.src}/components`));
}

// Styles
function buildStyles() {
    return src([
        'src/assets/scss/*.scss',
    ])
        .pipe(glob())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(`${paths.dest}/assets/css`));
}

function serve() {
    const server = fractal.web.server({
        sync: true,
        syncOptions: {
            https: true
        },
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
}

// Watch
function startWatch(done) {
    serve();
    watch(`${paths.src}/assets/icons`, icons);
    // watch(`${paths.src}/assets/images`, images);
    // watch(`${paths.src}/assets/vectors`, images);
    // watch(`${paths.src}/**/*.js`, scripts);
    watch(`${paths.src}/**/*.scss`, styles);

    done();
}

const styles = series(componentCssInPlace, buildStyles);

const compile = series(clean, parallel(assetsCopy, icons, styles));

exports.default = compile;
exports.watch = series(compile, startWatch);
