import util from 'util';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import uglify from 'gulp-uglify';
import Registry from 'undertaker-registry';

const babelConfig = {presets: ['es2015']};
const sourcemapsConfig = ['.', {}];
const uglifyConfig = {preserveComments: 'some'};

/**
 * script registry constructor
 * @param {object} config configuration object
 */
function ScriptRegistry(config = {}) {
  const {paths} = config;

  // check paths
  if (!paths || !paths.scripts) {
    throw new Error('ScriptRegistry: paths not defined');
  }

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;
    taker.task('script:copy', this.script);
  };

  /**
   * copy scripts
   * @return {object} taker object
   */
  this.script = () => {
    let {taker} = this;

    return taker.src(paths.scripts, {base: paths.app})
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(sourcemaps.init())
      .pipe(babel(babelConfig))
      .pipe(uglify(uglifyConfig))
      .pipe(sourcemaps.write(...sourcemapsConfig))
      .pipe(size({title: 'scripts'}))
      .pipe(taker.dest(paths.local));
  };
}

util.inherits(ScriptRegistry, Registry);
export default ScriptRegistry;
