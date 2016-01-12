import util from 'util';
import Registry from 'undertaker-registry';

export default function FazRegistry(config) {
  Registry.call(this);
  this.config = config;

  this.init = taker => {
    console.log('faz registered with', this.config);
    taker.task('faz', function() {});
  };
}

util.inherits(FazRegistry, Registry);
