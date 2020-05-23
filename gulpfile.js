const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const fractal       = require('./fractal.config.js');
const logger        = fractal.cli.console;
const sass          = require('gulp-sass');
const prefix        = require('gulp-autoprefixer');
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

// SCSS bundled into CSS task
function css() {
    return src(config.css.src)
        .pipe(sourcemaps.init())
        .pipe(glob())
        .pipe(sass({
            includePaths: [
                'components/**/*.scss',
                'assets/**/*.scss',
            ],
            outputStyle: 'compressed'
        }).on('error', function (err) {
            console.log(err.message);
            // sass.logError
            this.emit('end');
        }))
        .pipe(prefix(['last 2 versions', '> 1%', 'ie 9', 'ie 10'], {
            cascade: true
        }))
        //.pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/css'));
}

// Styles
function styles() {
    return src([
        `${paths.src}/components/**/*.scss`,
        `${paths.src}/assets/**/*.scss`,
    ])
        .pipe(sourcemaps.init())
        .pipe(glob())
        .pipe(sass({
            includePaths: [
                `${paths.src}/components/**/*.scss`,
                `${paths.src}/assets/**/*.scss`,
            ],
            outputStyle: 'compressed'
        }).on('error', function (err) {
            console.log(err.message);
            // sass.logError
            this.emit('end');
        }))
        .pipe(prefix(['last 2 versions', '> 1%', 'ie 9', 'ie 10'], {
            cascade: true
        }))
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
function startWatch() {
    serve();
    watch(`${paths.src}/assets/icons`, icons);
    // watch(`${paths.src}/assets/images`, images);
    // watch(`${paths.src}/assets/vectors`, images);
    // watch(`${paths.src}/**/*.js`, scripts);
    watch(`${paths.src}/**/*.css`, styles);
}

const compile = series(clean, parallel(assetsCopy, icons, styles));

exports.default = compile;
exports.watch = series(compile, startWatch);
