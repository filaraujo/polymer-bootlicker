import gulp from 'gulp';
import del from 'del';
import {components, pages} from './tasks/interfaces';
import {fonts} from './tasks/fonts';
import {images} from './tasks/images';
import {scripts} from './tasks/scripts';
import {server} from './tasks/server';
import {styles} from './tasks/styles';

function clean() {
  console.log('clean');
  return del('./dist');
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
  server
);

gulp.task('build', build);
gulp.task('serve', localServe);
