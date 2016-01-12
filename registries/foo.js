import util from 'util';
import Registry from 'undertaker-registry';

export default function FooRegistry(config) {
  Registry.call(this);
  this.config = config;

  this.init = taker => {
    console.log('foo registered with', this.config);
    taker.task('foo', function() {});
  };
}

util.inherits(FooRegistry, Registry);
