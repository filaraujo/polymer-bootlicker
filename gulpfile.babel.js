import gulp from 'gulp';
import del from 'del';
import {interfaces, useReferences} from './tasks/interfaces';
import {fonts} from './tasks/fonts';
import {images} from './tasks/images';
import {paths} from './tasks/paths';
import {scripts} from './tasks/scripts';
import {reload, server} from './tasks/server';
import {styles} from './tasks/styles';

function clean() {
  console.log('clean');
  return del('./dist');
}

function watch() {
  let watchableTasks = [fonts, images, scripts, styles];

  watchableTasks.forEach(task => {
    gulp.watch(paths[task.name], gulp.series(task, reload));
  });
}

let serveAndWatch = gulp.parallel(server, watch);
let processAssets = gulp.parallel(fonts, images, scripts, styles);

let build = gulp.series(
  clean,
  interfaces,
  processAssets
);

let localServe = gulp.series(
  build,
  serveAndWatch
);

let localDist = gulp.series(
  build,
  useReferences,
  serveAndWatch
);

gulp.task('build', build);
gulp.task('serve', localServe);
gulp.task('serve:dist', localDist);
