import util from 'util';
import nano from 'gulp-cssnano';
import Registry from 'undertaker-registry';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import through from 'through2';

const nanoConfig = {
  autoprefixer: {
    add: true,
    browsers: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  }
};
const sourcemapsConfig = ['.', {}];

/**
 * style registry constructor
 * @param {object} config configuration object
 */
function StyleRegistry(config = {}) {
  const {paths} = config;
  const styleTransforms = (config.transforms || {}).styles || {};
  const {preprocess = through.obj} = styleTransforms;
  const {postprocess = through.obj} = styleTransforms;

  // check paths
  if (!paths || !paths.styles) {
    throw new Error('StyleRegistry: paths not defined');
  }

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;
    taker.task('style:copy', this.style);
  };

  /**
   * copy styles
   * @return {object} taker object
   */
  this.style = () => {
    let {taker} = this;

    return taker.src(paths.styles, {base: paths.app})
      .pipe(preprocess())
      .pipe(sourcemaps.init())
      .pipe(nano(nanoConfig))
      .pipe(sourcemaps.write(...sourcemapsConfig))
      .pipe(postprocess())
      .pipe(size({title: 'styles'}))
      .pipe(taker.dest(paths.local));
  };
}

util.inherits(StyleRegistry, Registry);
export default StyleRegistry;
