import test from 'ava';
import Undertaker from 'undertaker';
import TidyRegistry from '../src/registries/tidy';

test('exports a function', t => {
  t.true(typeof TidyRegistry === 'function');
});

test('exports a registry', t => {
  let registry = new TidyRegistry();
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new TidyRegistry());
  taker.on('error', console.log);
});

test('registers a tidy task', t => {
  let taker = new Undertaker();
  taker.registry(new TidyRegistry());
  t.ok(taker.task('tidy:dist'));
  t.ok(taker.task('tidy:tests'));
});
