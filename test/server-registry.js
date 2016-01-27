import test from 'ava';
import Undertaker from 'undertaker';
import ServeRegistry from '../lib/registries/server';

let config = {
  paths: {
    local: './build/local',
    dist: './build'
  }
};

test('exports a function', t => {
  t.true(typeof ServeRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new ServeRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new ServeRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new ServeRegistry(config));

  taker.on('error', console.log);
});

test('registers server tasks', t => {
  let taker = t.context.taker;
  t.ok(taker.task('server:reload'));
  t.ok(taker.task('server:serve'));
});

// figure out how to test server processes
