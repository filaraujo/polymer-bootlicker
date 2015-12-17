import gulp from 'gulp';
import del from 'del';
import {interfaces, useReferences} from './tasks/interfaces';
import {fonts} from './tasks/fonts';
import {images} from './tasks/images';
import {paths} from './tasks/paths';
import {scripts} from './tasks/scripts';
import {reload, serve} from './tasks/server';
import {styles} from './tasks/styles';

/**
 * clean out dist folder
 */
function clean() {
  return del('./dist');
}

/**
 * watch for font, images, scripts and styles changes
 * then reprocess and reload
 */
function watch() {
  let watchableTasks = [fonts, images, scripts, styles];

  watchableTasks.forEach(task => {
    gulp.watch(paths[task.name], gulp.series(task, reload));
  });
}

let serveAndWatch = gulp.parallel(serve, watch);
let processAssets = gulp.parallel(fonts, images, scripts, styles);

let build = gulp.series(
  clean,
  interfaces,
  processAssets
);

let serveLocal = gulp.series(
  build,
  serveAndWatch
);

let serveDist = gulp.series(
  build,
  useReferences,
  serveAndWatch
);

gulp.task('build', build);
gulp.task('serve', serveLocal);
gulp.task('serve:dist', serveDist);
