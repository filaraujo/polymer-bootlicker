import gulp from 'gulp';
import del from 'del';
import {components} from './tasks/components';
import {fonts} from './tasks/fonts';
import {images} from './tasks/images';
import {scripts} from './tasks/scripts';
import {styles} from './tasks/styles';

function clean() {
  console.log('clean');
  return del('./dist');
}

let build = gulp.series(
  clean,
  // move components first
  components,
  // then process the assets
  gulp.parallel(
    fonts,
    images,
    scripts,
    styles
  )
);

gulp.task('build', build);
