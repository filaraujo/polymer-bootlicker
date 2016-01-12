import util from 'util';
import Registry from 'undertaker-registry';
import FooRegistry from './registries/foo';
import FazRegistry from './registries/faz';

export default function Bootlicker(config) {
  Registry.call(this);
  this.config = config;
  console.log('config', this.config);

  console.log(FooRegistry);

  this.init = taker => {
    taker.registry(new FooRegistry(this.config));
    taker.registry(new FazRegistry(this.config));
  };
}

util.inherits(Bootlicker, Registry);
