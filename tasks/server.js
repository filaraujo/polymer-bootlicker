import browserSync from 'browser-sync';
import {paths} from '../tasks/paths.js';

const server = browserSync.create();
const serverConfig = {
  server: {
    baseDir: [
      `${paths.dist}/en-US`,
      paths.local
    ]
  }
};

/**
 * reloads the server
 */
export function reload() {
  server.reload();
}

/**
 * serves the application
 */
export function serve() {
  server.init(serverConfig);
}
