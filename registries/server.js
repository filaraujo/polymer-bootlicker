import util from 'util';
import browserSync from 'browser-sync';
import Registry from 'undertaker-registry';

/**
 * server registry constructor
 * @param {object} config configuration object
 */
function ServerRegistry(config = {}) {
  const {paths} = config;
  const server = browserSync.create();
  const serverConfig = {
    server: {
      baseDir: [
        `${paths.dist}/en-US`,
        paths.local
      ]
    }
  };

  // check paths
  if (!paths || !paths.dist || !paths.local) {
    throw new Error('ServerRegistry: paths not defined');
  }

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    taker.task('reload', this.reload);
    taker.task('serve', this.serve);
  };

  /**
   * reloads the application
   */
  this.reload = () => {
    server.reload();
  };

  /**
   * serves the application
   */
  this.serve = () => {
    server.init(serverConfig);
  };
}

util.inherits(ServerRegistry, Registry);
export default ServerRegistry;
