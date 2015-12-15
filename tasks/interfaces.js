import gulp from 'gulp';
import {paths} from '../tasks/paths.js';

export function components() {
  return gulp.src(paths.components, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}

export function pages() {
  var path = paths.app + '/index.html';

  return gulp.src(path, {base: paths.app})
    .pipe(gulp.dest(paths.dist));
}
