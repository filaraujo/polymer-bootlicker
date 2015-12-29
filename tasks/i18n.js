import gulp from 'gulp';
import i18n from 'gulp-i18n-localize';
import {paths} from '../tasks/paths.js';

const i18nConfig = {localeDir: paths.locales};

/**
 * translates assets files and moves them into localization folders
 * @return {obj} gulp
 */
export function translate() {
  return gulp.src(`${paths.local}/**/*`, {base: paths.local})
    .pipe(i18n(i18nConfig))
    .pipe(gulp.dest(paths.dist));
}
