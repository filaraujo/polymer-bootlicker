import gulp from 'gulp';
import {paths} from '../tasks/paths.js';
import size from 'gulp-size';

/**
 * moves the font assets
 * @return {obj} gulp
 */
export function fonts() {
  return gulp.src(paths.fonts, {base: paths.app})
    .pipe(size({title: 'fonts'}))
    .pipe(gulp.dest(paths.dist));
}
