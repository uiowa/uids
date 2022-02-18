const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const fractal       = require('./fractal.config.js');
const logger        = fractal.cli.console;
const gulpSass = require('gulp-sass');
const nodeSass = require('node-sass');
const sass = gulpSass(nodeSass);
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
const glob          = require('gulp-sass-glob');
const sourcemaps    = require('gulp-sourcemaps');

/*
 * Directories here
 */
var paths = {
  build: `${__dirname}/www`,
  src: `${__dirname}/src`,
  dest: `${__dirname}/tmp`,
  dist: `${__dirname}/dist`,
  theme: `${__dirname}/theme`,
};

// Clean
function clean() {
  return del(`${paths.dest}/assets/`);
}

function cleanComponentCss() {
  return del(`${paths.src}/components/**/*.css`);
}

function assetsCopy() {
  return src([
    `${paths.src}/assets/**/*.{woff,woff2}`,
    `${paths.src}/assets/**/*.css`,
    `${paths.src}/assets/**/*.js`,
    `${paths.src}/assets/**/*.{jpg,png,svg}`,
    `${paths.src}/assets/**/*.{mov,mp4}`,
  ])
    .pipe(dest(`${paths.dest}/assets`));
}

// Icons
function icons() {
  return src(`${paths.src}/assets/icons/**/*`)
    .pipe(dest(`${paths.dest}/assets/icons`));
}

function componentCssInPlace() {
  return src(`${paths.src}/components/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(`${paths.src}/components`));
}

// Styles
function buildStyles() {
  return src(`${paths.src}/assets/scss/*.scss`)
    .pipe(glob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        `${paths.src}/components`,
      ],
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${paths.dest}/assets/css`));
}

function buildTheme() {
  return src(`${paths.theme}/assets/scss/*.scss`)
    .pipe(glob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        `${paths.src}/components`,
        `${paths.src}/assets/scss`,
      ],
    }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(`${paths.theme}/assets/css`));
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
    watch(`${paths.src}/**/*.js`, compile);
    watch(`${paths.src}/**/*.scss`, compile);
  // watch(`${paths.theme}/**/*.scss`, buildTheme);

  done();
}

const styles = series(componentCssInPlace, buildStyles/*, buildTheme*/);

const compile = series(parallel(clean, cleanComponentCss), parallel(assetsCopy, icons, styles));

exports.default = compile;
exports.watch = series(compile, startWatch);
