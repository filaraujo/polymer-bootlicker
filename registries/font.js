import util from 'util';
import Registry from 'undertaker-registry';
import size from 'gulp-size';

/**
 * font registry constructor
 * @param {object} config configuration object
 */
function FontRegistry(config) {
  Registry.call(this);
  this.config = config;

  this.init = taker => {
    this.taker = taker;
    taker.task('font', this.font);
  };

  /**
   * copy fonts
   * @return {object} taker object
   */
  this.font = () => {
    let paths = this.config.paths;
    let taker = this.taker;

    return taker.src(paths.fonts, {base: paths.app})
      .pipe(size({title: 'fonts'}))
      .pipe(taker.dest(paths.local));
  };
}

util.inherits(FontRegistry, Registry);
export default FontRegistry;
