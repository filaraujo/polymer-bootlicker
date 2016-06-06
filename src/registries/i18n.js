import i18n from 'gulp-i18n-localize';
import util from 'util';
import Registry from 'undertaker-registry';

/**
 * translation registry constructor
 * @param {object} config configuration object
 */
function I18nRegistry(config = {}) {
  const {paths} = config;

  // check paths
  if (!paths || !paths.locales) {
    throw new Error('I18nRegistry: paths not defined');
  }

  const i18nConfig = {localeDir: paths.locales};

  Registry.call(this);

  this.init = taker => {
    this.taker = taker;
    taker.task('i18n:translate', this.i18n);
  };

  /**
   * translate assets
   * @return {object} taker object
   */
  this.i18n = () => {
    let {taker} = this;
    let assetsPaths = [
      `${paths.local}/**/*`
    ];

    return taker.src(assetsPaths, {base: paths.local})
      .pipe(i18n(i18nConfig))
      .pipe(taker.dest(paths.dist));
  };
}

util.inherits(I18nRegistry, Registry);
export default I18nRegistry;
