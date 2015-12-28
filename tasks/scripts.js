import babel from 'gulp-babel';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {paths} from '../tasks/paths.js';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import uglify from 'gulp-uglify';

const babelConfig = {presets: ['es2015']};
const sourcemapsConfig = ['.', {}];
const uglifyConfig = {preserveComments: 'some'};

/**
 * moves and processes the scripts
 * @return {obj} gulp
 */
export function scripts() {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(uglify(uglifyConfig))
    .pipe(sourcemaps.write(...sourcemapsConfig))
    .pipe(size({title: 'scripts'}))
    .pipe(gulp.dest(paths.local));
}
