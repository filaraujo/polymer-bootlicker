import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import {paths} from '../tasks/paths.js';

export function images() {
  return gulp.src(paths.images)
    // optimize
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.dist));
}
