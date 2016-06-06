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
  const serverDefaults = {
    server: {
      baseDir: [
        `${paths.dist}/en-US`,
        paths.local
      ]
    }
  };
  const serverOptions = (config.options || {}).server || {};
  const serverConfig = Object.assign({}, serverDefaults, serverOptions);

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
    taker.task('server:reload', this.reload);
    taker.task('server:serve', this.serve);
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
