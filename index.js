import util from 'util';
import Registry from 'undertaker-registry';
import FontRegistry from './registries/font';
import HTMLRegistry from './registries/html';
import I18nRegistry from './registries/i18n';
import ImageRegistry from './registries/image';
import ScriptRegistry from './registries/script';
import ServerRegistry from './registries/server';
import StyleRegistry from './registries/style';
import TestRegistry from './registries/test';
import TidyRegistry from './registries/tidy';

const defaults = {
  paths: {
    app: './app',
    components: './app/components/**/*',
    dist: './dist',
    fonts: './app/fonts/**/*',
    images: './app/**/*.{png,jpg,jpeg,gif}',
    local: './dist/local',
    locales: './locales',
    scripts: './app/**/*.js',
    styles: './app/**/*.css',
    tests: './test'
  }
};

const registries = [
  FontRegistry,
  HTMLRegistry,
  I18nRegistry,
  ImageRegistry,
  ScriptRegistry,
  ServerRegistry,
  StyleRegistry,
  TestRegistry,
  TidyRegistry
];

const copyResources = [
  'font:copy',
  'image:copy',
  'script:copy',
  'style:copy'
];

const copyHtml = [
  'html:bower:copy',
  'html:components:copy',
  'html:views:copy'
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

    taker.task('assets:copy', taker.series(
      'tidy',
      taker.parallel(...copyResources),
      taker.parallel(...copyHtml)
    ));

    taker.task('build', taker.series(
      'assets:copy'
    ));
  };
}

util.inherits(Bootlicker, Registry);
export default Bootlicker;
