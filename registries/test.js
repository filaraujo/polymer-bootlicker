import util from 'util';
import Registry from 'undertaker-registry';
import wct from 'web-component-tester';

/**
 * test registry constructor
 * @param {object} config configuration object
 */
function TestRegistry(config = {}) {
  const {paths} = config;
  const wctLocalConfig = {local: {}};
  const wctSauceConfig = {sauce: {}};

  // check paths
  if (!paths || !paths.tests) {
    throw new Error('TestRegistry: paths not defined');
  }

  const wctConfig = {
    suites: [`${paths.tests}/**/tests/index.html`]
  };

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;
    taker.task('test:move', this.moveTests);
    taker.task('test:local',
      taker.series('test:move', this.testLocal)
    );
    taker.task('test:remote',
      taker.series('test:move', this.testRemote)
    );
  };

  /**
   * move components to test directory
   * @return {object} taker undertaker object
   */
  this.moveTests = () => {
    let {taker} = this;

    return taker.src(`${paths.local}/components/**/*`)
      .pipe(taker.dest(paths.tests));
  };

  /**
   * test locally
   * @return {object} wct object
   */
  this.testLocal = () => {
    return wct.test(Object.assign({}, wctLocalConfig, wctConfig));
  };

  /**
   * test remotely
   * @return {object} wct object
   */
  this.testRemote = () => {
    return wct.test(Object.assign({}, wctSauceConfig, wctConfig));
  };
}

util.inherits(TestRegistry, Registry);
export default TestRegistry;
