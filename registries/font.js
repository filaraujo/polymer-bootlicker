import util from 'util';
import Registry from 'undertaker-registry';
import size from 'gulp-size';

/**
 * font registry constructor
 * @param {object} config configuration object
 */
function FontRegistry(config) {
  const {paths} = config;

  // check paths
  if (!paths || !paths.fonts) {
    throw new Error('FontRegistry: paths not defined');
  }

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;
    taker.task('font', this.font);
  };

  /**
   * copy fonts
   * @return {object} taker object
   */
  this.font = () => {
    let {taker} = this;

    return taker.src(paths.fonts, {base: paths.app})
      .pipe(size({title: 'fonts'}))
      .pipe(taker.dest(paths.local));
  };
}

util.inherits(FontRegistry, Registry);
export default FontRegistry;
