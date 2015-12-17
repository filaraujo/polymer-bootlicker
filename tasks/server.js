import browserSync from 'browser-sync';
import {paths} from '../tasks/paths.js';

const server = browserSync.create();

export function serve() {
  server.init({
    server: {
      baseDir: paths.dist
    }
  });
}

export function reload() {
  server.reload();
}
