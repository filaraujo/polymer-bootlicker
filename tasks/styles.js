import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import gulp from 'gulp';
import {paths} from '../tasks/paths.js';
import size from 'gulp-size';

const autoprefixerConfig = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
const minifyCssConfig = {};

/**
 * auto prefixes and minifies the css assets
 * @return {obj} gulp
 */
export function styles() {
  return gulp.src(paths.styles, {base: paths.app})
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(minifyCss(minifyCssConfig))
    .pipe(size({title: 'styles'}))
    .pipe(gulp.dest(paths.dist));
}
