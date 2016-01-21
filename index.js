import util from 'util';
import Registry from 'undertaker-registry';
import FontRegistry from './registries/font';
import I18nRegistry from './registries/i18n';
import ImageRegistry from './registries/image';

const defaults = {
  paths: {
    app: './app',
    dist: './dist',
    fonts: './app/fonts/**/*',
    images: './app/**/*.{png,jpg,jpeg,gif}',
    local: './dist/local',
    locales: './locales'
  }
};

const registries = [
  FontRegistry,
  I18nRegistry,
  ImageRegistry
];

/**
 * Bootlicker registry constructor
 * @param {object} config configuration object
 */
function Bootlicker(config) {
  this._config = Object.assign({}, defaults, config);

  Registry.call(this);

  this.init = taker => {
    registries.forEach(Registry => {
      taker.registry(new Registry(this._config));
    }, this);
  };
}

util.inherits(Bootlicker, Registry);
export default Bootlicker;
