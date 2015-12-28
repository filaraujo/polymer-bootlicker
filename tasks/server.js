import browserSync from 'browser-sync';
import {paths} from '../tasks/paths.js';

const server = browserSync.create();
const serverLocalConfig = {server: {baseDir: paths.local}};
const serverDistConfig = {server: {baseDir: `${paths.dist}/en-US`}};

let serverInit = config => {
  return function serve() {
    server.init(config);
  };
};

/**
 * reloads the server
 */
export function reload() {
  server.reload();
}

export let serve = {
  local: serverInit(serverLocalConfig),
  dist: serverInit(serverDistConfig)
};
