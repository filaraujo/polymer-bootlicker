import util from 'util';
import Registry from 'undertaker-registry';
import FontRegistry from './registries/font';

const paths = {
  app: './app/',
  fonts: './app/fonts/**/*',
  local: './dist/local'
};

const defaultConfig = {
  paths: paths
};

/**
 * Bootlicker registry constructor
 * @param {object} config configuration object
 */
function Bootlicker(config) {
  Registry.call(this);
  this.config = Object.assign(defaultConfig, config);
  // console.log('config', this.config);

  this.init = taker => {
    taker.registry(new FontRegistry(this.config));
  };
}

util.inherits(Bootlicker, Registry);
export default Bootlicker;
