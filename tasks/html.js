import gulp from 'gulp';
import lazypipe from 'lazypipe';
import {paths} from '../tasks/paths.js';
import polybuild from 'polybuild';
import useref from 'gulp-useref';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';

const polybuildConfig = {maximumCrush: true, suffix: false};
const userefConfig = {searchPath: paths.local};

/**
 * moves components
 * @return {obj} gulp
 */
function components() {
  return gulp.src(paths.components, {base: paths.app})
    .pipe(size({title: 'components'}))
    .pipe(gulp.dest(paths.local));
}

/**
 * moves bower assets
 * @return {obj} gulp
 */
function bower() {
  let bowerAssets = `${paths.bower}**/*`;
  let dest = `${paths.local}/components`;

  return gulp.src(bowerAssets, {base: paths.bower})
    .pipe(gulp.dest(dest));
}

/**
 * moves index pages
 * @return {obj} gulp
 */
function pages() {
  return gulp.src(`${paths.app}/index.html`)
    .pipe(size({title: 'pages'}))
    .pipe(gulp.dest(paths.local));
}

/**
 * concats references for scripts and css into a single minified reference
 * @return {obj} gulp
 */
function userefs() {
  let sourcemapPipe = lazypipe().pipe(sourcemaps.init, {loadMaps: true});

  return gulp.src(`${paths.local}/index.html`)
    .pipe(useref(userefConfig, sourcemapPipe))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.local));
}

/**
 * vulcanizes down the components into one asset
 * @return {obj} gulp
 */
function polybuilds() {
  return gulp.src(`${paths.local}/components/elements.html`)
    .pipe(polybuild(polybuildConfig))
    .pipe(gulp.dest(`${paths.local}/components`));
}

export let html = [bower, components, pages];
export let optimize = [userefs, polybuilds];
