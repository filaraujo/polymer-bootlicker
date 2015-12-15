import browserSync from 'browser-sync';
import {paths} from '../tasks/paths.js';

let server = browserSync.create();

export function server() {
  server.init({
    server: {
      baseDir: paths.dist
    }
  });
}
