import util from 'util';
import Registry from 'undertaker-registry';

/**
 * font registry constructor
 * @param {object} config configuration object
 */
function FontRegistry(config) {
  Registry.call(this);
  this.config = config;

  this.init = taker => {
    console.log('foo registered with', this.config);
    taker.task('foo', function() {});
  };
}

util.inherits(FontRegistry, Registry);
export default FontRegistry;
