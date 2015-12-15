import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import {paths} from '../tasks/paths.js';
import size from 'gulp-size';

const imageminConfig = {progressive: true, interlaced: true};

export function images() {
  return gulp.src(paths.images)
    .pipe(imagemin(imageminConfig))
    .pipe(size({title: 'images'}))
    .pipe(gulp.dest(paths.dist));
}
