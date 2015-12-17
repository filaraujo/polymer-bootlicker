import gulp from 'gulp';
import del from 'del';
import {components, pages} from './tasks/interfaces';
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

let build = gulp.series(
  clean,
  // move components first
  gulp.parallel(
    components,
    pages
  ),
  // then process the assets
  gulp.parallel(
    fonts,
    images,
    scripts,
    styles
  )
);

let localServe = gulp.series(
  build,
  gulp.parallel(
    server,
    watch
  )
);

gulp.task('build', build);
gulp.task('serve', localServe);
