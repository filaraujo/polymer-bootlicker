'use strict';

import gulp from 'gulp';
import del from 'del';
import {components} from './tasks/components';
import {images} from './tasks/images';
import {scripts} from './tasks/scripts';

function clean() {
  console.log('clean');
  return del('./dist');
}

let cleanAndMoveAssets = gulp.series(
  clean,
  gulp.parallel(
    components,
    images,
    scripts
  )
);

gulp.task('build', cleanAndMoveAssets);
