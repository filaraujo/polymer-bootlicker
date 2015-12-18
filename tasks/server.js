import browserSync from 'browser-sync';
import {paths} from '../tasks/paths.js';

const server = browserSync.create();

/**
 * starts up a serve instance
 */
export function serve() {
  server.init({
    server: {
      baseDir: paths.dist
    }
  });
}

/**
 * reloads the server
 */
export function reload() {
  server.reload();
}
