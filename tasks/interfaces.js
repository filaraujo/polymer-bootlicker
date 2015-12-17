import gulp from 'gulp';
import lazypipe from 'lazypipe';
import {paths} from '../tasks/paths.js';
import polybuild from 'polybuild';
import useref from 'gulp-useref';
import sourcemaps from 'gulp-sourcemaps';

const polybuildConfig = {maximumCrush: true, omitSuffix: true};
const userefConfig = {searchPath: paths.dist};

function components() {
  return gulp.src(paths.components, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}

function bower() {
  let dest = `${paths.dist}/components`;
  let bowerAssets = `${paths.bower}**/*`;

  return gulp.src(bowerAssets, {base: paths.bower})
    .pipe(gulp.dest(dest));
}

function pages() {
  return gulp.src(`${paths.app}/index.html`)
    .pipe(gulp.dest(paths.dist));
}

function userefs() {
  let sourcemapPipe = lazypipe().pipe(sourcemaps.init, {loadMaps: true});

  return gulp.src(`${paths.app}/index.html`)
    .pipe(useref(userefConfig, sourcemapPipe))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
}

function polybuilds() {
  return gulp.src(`${paths.dist}/index.html`)
    .pipe(polybuild(polybuildConfig))
    .pipe(gulp.dest(paths.dist));
}

export let interfaces = gulp.parallel(bower, components, pages);
export let optimizeHTML = gulp.series(userefs, polybuilds);
