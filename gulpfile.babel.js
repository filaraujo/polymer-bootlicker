import gulp from 'gulp';
import del from 'del';
import {components} from './tasks/components';
import {fonts} from './tasks/fonts';
import {images} from './tasks/images';
import {scripts} from './tasks/scripts';

function clean() {
  console.log('clean');
  return del('./dist');
}

let build = gulp.series(
  clean,
  gulp.parallel(
    components,
    fonts,
    images,
    scripts
  )
);

gulp.task('build', build);
