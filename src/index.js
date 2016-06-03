import util from 'util';
import defaultsDeep from 'lodash.defaultsdeep';
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
    bower: './bower_components',
    components: './app/components/**/*',
    dist: './dist',
    fonts: './app/fonts/**/*',
    images: './app/**/*.{png,jpg,jpeg,gif}',
    local: './dist/local',
    locales: './locales',
    scripts: './app/**/*.js',
    styles: './app/**/*.css',
    tests: './test',
    views: `./app/index.html`
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

const optimizeHtml = [
  'html:views:process',
  'html:polybuild'
];

const watchTasks = {
  bower: 'html:bower:copy',
  components: 'html:components:copy',
  fonts: 'font:copy',
  images: 'image:copy',
  scripts: 'script:copy',
  styles: 'style:copy',
  views: 'html:views:copy'
};

/**
 * Bootlicker registry constructor
 * @param {object} config configuration object
 */
function Bootlicker(config) {
  this.config = {};
  defaultsDeep(this.config, config, defaults);

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;

    registries.forEach(Registry => {
      taker.registry(new Registry(this.config));
    }, this);

    taker.task('build:copy', taker.series(
      'tidy',
      taker.parallel(...copyResources),
      taker.parallel(...copyHtml)
    ));

    taker.task('build', taker.series(
      'build:copy',
      'i18n:translate'
    ));

    taker.task('build:dist', taker.series(
      'build:copy',
      taker.series(...optimizeHtml),
      'i18n:translate'
    ));

    taker.task('serve', taker.series(
      'build',
      taker.parallel(
        'server:serve',
        this.watch
      )
    ));

    taker.task('serve:dist', taker.series(
      'build:dist',
      'server:serve'
    ));

    taker.task('test', taker.series(
      'build',
      'test:local'
    ));

    taker.task('test:sauce', taker.series(
      'build',
      'test:remote'
    ));
  };

  /**
   * watch process
   */
  this.watch = () => {
    let {config, taker} = this;
    let {paths} = config;

    Object.keys(watchTasks).forEach(function(task) {
      taker.watch(paths[task], taker.series(
        watchTasks[task],
        'i18n:translate',
        'server:reload'
      ));
    });
  };
}

util.inherits(Bootlicker, Registry);
export default Bootlicker;
