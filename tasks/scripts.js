import gulp from 'gulp';
import babel from 'gulp-babel';
import {paths} from '../tasks/paths.js';

export function scripts() {
  return gulp.src(paths.scripts)
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest(paths.dist));
}
