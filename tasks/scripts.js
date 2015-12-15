import babel from 'gulp-babel';
import gulp from 'gulp';
import jshint from 'gulp-jshint';
import jscs from 'gulp-jscs';
import jscsStylish from 'gulp-jscs-stylish';
import {paths} from '../tasks/paths.js';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import uglify from 'gulp-uglify';

const babelConfig = {presets: ['es2015']};
const sourcemapsConfig = ['.', {}];
const uglifyConfig = {preserveComments: 'some'};

export function scripts() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jscs())
    .pipe(jscsStylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(uglify(uglifyConfig))
    .pipe(sourcemaps.write(...sourcemapsConfig))
    .pipe(size({title: 'scripts'}))
    .pipe(gulp.dest(paths.dist));
}
