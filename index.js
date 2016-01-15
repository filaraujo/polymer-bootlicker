import util from 'util';
import Registry from 'undertaker-registry';
import FontRegistry from './registries/font';

const paths = {
  app: './app',
  fonts: './app/fonts/**/*',
  local: './dist/local',
  locales: './locales'
};

const defaultConfig = {
  paths: paths
};

/**
 * Bootlicker registry constructor
 * @param {object} config configuration object
 */
function Bootlicker(config) {
  this._config = Object.assign({}, defaultConfig, config);

  Registry.call(this);

  this.init = taker => {
    taker.registry(new FontRegistry(this._config));
  };
}

util.inherits(Bootlicker, Registry);
export default Bootlicker;
