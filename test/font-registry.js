import test from 'ava';
import Undertaker from 'undertaker';
import FontRegistry from '../registries/font';

test('exports a function', t => {
  t.true(typeof FontRegistry === 'function');
});

test('exports a registry', t => {
  let font = new FontRegistry({});
  t.ok(font.init);
  t.ok(font._tasks);
});

test('accepts a configuration', t => {
  let config = {foo: 'bar'};
  let font = new FontRegistry(config);
  t.ok(font.config.foo);
});

test('registers a font task', t => {
  let taker = new Undertaker();
  taker.registry(new FontRegistry({}));
  t.ok(taker.task('font'));
});
