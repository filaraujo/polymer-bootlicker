import util from 'util';
import del from 'del';
import Registry from 'undertaker-registry';

/**
 * tidy registry constructor
 * @param {object} config configuration object
 */
function TidyRegistry(config = {}) {
  const {paths} = config;

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    taker.task('tidy:dist', this.tidyDist);
    taker.task('tidy:tests', this.tidyTests);
    taker.task('tidy', taker.parallel(
      'tidy:dist',
      'tidy:tests'
    ));
  };

  /**
   * clean up dist folder
   * @return {object} taker object
   */
  this.tidyDist = () => {
    return del(paths.dist);
  };

  /**
   * clean up test folder
   * @return {object} taker object
   */
  this.tidyTests = () => {
    return del(paths.tests);
  };
}

util.inherits(TidyRegistry, Registry);
export default TidyRegistry;
