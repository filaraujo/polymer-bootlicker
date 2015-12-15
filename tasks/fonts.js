import gulp from 'gulp';
import {paths} from '../tasks/paths.js';
import size from 'gulp-size';

export function fonts() {
  return gulp.src(paths.fonts, {base: paths.app})
    .pipe(size({title: 'fonts'}))
    .pipe(gulp.dest(paths.dist));
}
