import util from 'util';
import defaults from 'lodash.defaults';
import Registry from 'undertaker-registry';
import wct from 'web-component-tester';

/**
 * test registry constructor
 * @param {object} config configuration object
 */
function TestRegistry(config = {}) {
  const {paths} = config;
  const testOptions = (config.options || {}).test || {};

  // check paths
  if (!paths || !paths.tests) {
    throw new Error('TestRegistry: paths not defined');
  }

  const wctConfig = {
    suites: [
      `${paths.tests}/**/tests/index.html`,
      `${paths.tests}/**/test/index.html`
    ]
  };

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;

    taker.task('test:copy', this.copy);
    taker.task('test:local', taker.series(this.copy, this.local));
    taker.task('test:remote', taker.series(this.copy, this.remote));
  };

  /**
   * copy components to test directory
   * @return {object} taker undertaker object
   */
  this.copy = () => {
    let {taker} = this;

    return taker.src(`${paths.local}/components/**/*`)
      .pipe(taker.dest(paths.tests));
  };

  /**
   * test locally
   *
   * @param {funcion} cb callback
   * @return {object} wct object
   */
  this.local = cb => {
    let options = defaults(wctConfig, testOptions);
    options.plugins.sauce = undefined;
    return wct.test(options, cb);
  };

  /**
   * test remotelyb
   *
   * @param {funcion} cb callback
   * @return {object} wct object
   */
  this.remote = cb => {
    let options = defaults(wctConfig, testOptions);
    options.plugins.local = undefined;
    return wct.test(options, cb);
  };
}

util.inherits(TestRegistry, Registry);
export default TestRegistry;
