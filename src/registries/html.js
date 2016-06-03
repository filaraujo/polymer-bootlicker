import util from 'util';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import useref from 'gulp-useref';
import lazypipe from 'lazypipe';
import polybuild from 'polybuild';
import Registry from 'undertaker-registry';
/**
 * html registry constructor
 * @param {object} config configuration object
 */
function HTMLRegistry(config = {}) {
  const {paths} = config;
  const htmlminConfig = {empty: true, quotes: true, spare: true};
  const polybuildConfig = {maximumCrush: true, suffix: false};
  const userefConfig = {searchPath: paths.local};

  Registry.call(this);

  /**
   * init registry
   * @param {object} taker undertaker object
   */
  this.init = taker => {
    this.taker = taker;
    taker.task('html:bower:copy', this.copyBower);
    taker.task('html:components:copy', this.copyComponents);
    taker.task('html:polybuild', this.polybuild);
    taker.task('html:views:copy', this.copyViews);
    taker.task('html:views:process', this.processViews);
  };

  /**
   * copy bower assets
   * @return {object} taker object
   */
  this.copyBower = () => {
    let bowerAssets = [
      `${paths.bower}/**/*`,
      `!${paths.bower}/**/test/*`,
      `!${paths.bower}/**/tests/*`
    ];
    let {taker} = this;

    return taker.src(bowerAssets, {base: paths.bower})
      .pipe(taker.dest(`${paths.local}/assets/components`));
  };

  /**
   * copy components
   * @return {object} taker object
   */
  this.copyComponents = () => {
    let {taker} = this;

    return taker.src(paths.components, {base: paths.app})
      .pipe(size({title: 'components'}))
      .pipe(taker.dest(paths.local));
  };

  /**
   * copy views
   * @return {object} taker object
   */
  this.copyViews = () => {
    let {taker} = this;

    return taker.src(paths.views)
        .pipe(size({title: 'pages'}))
        .pipe(taker.dest(paths.local));
  };

  /**
   * polybuild elements
   * @param {function} cb callback function
   * @return {object} taker object
   */
  this.polybuild = cb => {
    let {taker} = this;
    let {fragments} = paths;
    let dest = `${paths.local}/components`;

    if (!fragments) {
      return cb();
    }

    return taker.src(fragments)
      .pipe(polybuild(polybuildConfig))
      .pipe(taker.dest(dest));
  };

  /**
   * process the views
   * @return {object} taker object
   */
  this.processViews = () => {
    let sourcemapPipe = lazypipe().pipe(sourcemaps.init, {loadMaps: true});
    let {taker} = this;
    let viewAssets = `${paths.local}/index.html`;

    return taker.src(viewAssets)
      .pipe(useref(userefConfig, sourcemapPipe))
      .pipe(htmlmin(htmlminConfig))
      .pipe(sourcemaps.write('.'))
      .pipe(taker.dest(paths.local));
  };
}

util.inherits(HTMLRegistry, Registry);
export default HTMLRegistry;
