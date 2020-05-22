const { src, dest, parallel, series, watch } = require('gulp');
const config = require('./config.json');
const fractal      = require('./fractal.config.js');
const logger       = fractal.cli.console;
const sass         = require('gulp-sass');
const prefix       = require('gulp-autoprefixer');
const glob         = require('gulp-sass-glob');
const plumber      = require('gulp-plumber');
const sourcemaps   = require('gulp-sourcemaps');


/*
 * Directories here
 */
var paths = {
    build: './components/',
    scss: './components/',
};

function assetsCopy() {
    return src(['./assets/**/*.woff', './assets/**/*.woff2', './assets/**/*.js', './assets/**/*.jpg', './assets/**/*.png', './assets/**/*.svg'])
    .pipe(dest('./dist/'));
}

// Icons
function icons() {
    return src(`${paths.src}/assets/icons/**/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.dest}/assets/icons`));
}

// SCSS bundled into CSS task
function css() {
    return src(config.css.src)
        .pipe(sourcemaps.init())
        .pipe(glob())
        // Stay live and reload on error
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: [config.css.includePaths],
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
        .pipe(dest(config.css.dest));
}

function fractalStart() {
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
};

// Watch files
function watchFiles() {
    // Watch SCSS changes
    return watch(config.css.src, css)
}

const watching = parallel(assetsCopy, fractalStart, watchFiles);

exports.default = parallel(css);
exports.watch = watching;
