import util from 'util';
import imagemin from 'gulp-imagemin';
import Registry from 'undertaker-registry';
import size from 'gulp-size';

const imageminConfig = {interlaced: true, progressive: true};

/**
 * image registry constructor
 * @param {object} config configuration object
 */
function ImageRegistry(config = {}) {
  const {paths} = config;

  // check paths
  if (!paths || !paths.images) {
    throw new Error('ImageRegistry: paths not defined');
  }

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;
    taker.task('image:copy', this.image);
  };

  /**
   * copy images
   * @return {object} taker object
   */
  this.image = () => {
    let {taker} = this;

    return taker.src(paths.images)
      .pipe(imagemin(imageminConfig))
      .pipe(size({title: 'image'}))
      .pipe(taker.dest(paths.local));
  };
}

util.inherits(ImageRegistry, Registry);
export default ImageRegistry;
