import gulp from 'gulp';
import {paths} from '../tasks/paths.js';
import useref from 'gulp-useref';

let indexPage = `${paths.app}/index.html`;
let polybuildConfig = {maximumCrush: true};

function components() {
  return gulp.src(paths.components, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}

function pages() {
  return gulp.src(indexPage, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}

export function useReferences() {
  return gulp.src(indexPage, {base: paths.app})
    .pipe(useref())
    .pipe(gulp.dest(paths.dist));
}

export let interfaces = gulp.parallel(components, pages);
