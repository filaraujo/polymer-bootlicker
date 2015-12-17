import gulp from 'gulp';
import lazypipe from 'lazypipe';
import {paths} from '../tasks/paths.js';
import useref from 'gulp-useref';
import sourcemaps from 'gulp-sourcemaps';

const indexPage = `${paths.app}/index.html`;
const polybuildConfig = {maximumCrush: true};
const userefConfig = {searchPath: paths.dist};

function components() {
  return gulp.src(paths.components, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}

function pages() {
  return gulp.src(indexPage, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}

export function useReferences() {
  let sourcemapPipe = lazypipe().pipe(sourcemaps.init, {loadMaps: true});

  return gulp.src(indexPage, {base: paths.app})
    .pipe(useref(userefConfig, sourcemapPipe))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
}

export let interfaces = gulp.parallel(components, pages);
