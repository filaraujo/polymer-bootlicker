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
  const wctLocalConfig = {plugins: {local: {}}};
  const wctSauceConfig = {plugins: {sauce: {}}};

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
    return wct.test(defaults(wctConfig, testOptions, wctLocalConfig), cb);
  };

  /**
   * test remotely
   *
   * @param {funcion} cb callback
   * @return {object} wct object
   */
  this.remote = cb => {
    return wct.test(defaults(wctConfig, testOptions, wctSauceConfig), cb);
  };
}

util.inherits(TestRegistry, Registry);
export default TestRegistry;
