import gulp from 'gulp';
import del from 'del';
import {interfaces, optimizeHTML} from './tasks/interfaces';
import {fonts} from './tasks/fonts';
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

let buildLocal = gulp.series(
  clean,
  interfaces,
  gulp.parallel(fonts, images, scripts, styles)
);

let buildDist = gulp.series(
  buildLocal,
  optimizeHTML
);

let serveLocal = gulp.series(
  buildLocal,
  gulp.parallel(serve.local, watch)
);

let serveDist = gulp.series(
  buildDist,
  serve.dist
);

gulp.task('default', buildDist);
gulp.task('build', buildLocal);
gulp.task('serve', serveLocal);
gulp.task('serve:dist', serveDist);
