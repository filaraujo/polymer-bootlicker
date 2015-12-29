import gulp from 'gulp';
import del from 'del';
import {html, optimize} from './tasks/html';
import {fonts} from './tasks/fonts';
import {translate} from './tasks/i18n';
import {images} from './tasks/images';
import {paths} from './tasks/paths';
import {scripts} from './tasks/scripts';
import {reload, serve} from './tasks/server';
import {styles} from './tasks/styles';

/**
 * clean out dist folder
 * @return {obj} deletion promise
 */
function clean() {
  return del('./dist');
}

const assets = [fonts, images, scripts, styles];
const copyAssets = [
  clean,
  gulp.parallel(...html),
  gulp.parallel(...assets)
];
const buildDist = [
  ...copyAssets,
  gulp.series(...optimize),
  translate
];

/**
 * watch for asset and html changes then reprocess and reload
 */
function watch() {
  let watchableTasks = [...assets, ...html];

  watchableTasks.forEach(task => {
    gulp.watch(paths[task.name], gulp.series(task, translate, reload));
  });
}

gulp.task('build', gulp.series(...copyAssets, translate));
gulp.task('build:dist', gulp.series(...buildDist));
gulp.task('serve', gulp.series(...copyAssets, gulp.parallel(serve, watch)));
gulp.task('serve:dist', gulp.series(...buildDist, serve));
