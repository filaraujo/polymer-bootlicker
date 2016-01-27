import test from 'ava';
import Undertaker from 'undertaker';
import TestRegistry from '../src/registries/test';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    tests: './tests/**/*'
  }
};

let destSpy = sinon.spy(() => {
  return Promise.resolve();
});

let noop = () => () => Promise.resolve();

let srcSpy = sinon.spy(() => {
  var promise = Promise.resolve();
  promise.pipe = srcSpy;
  return promise;
});

test('exports a function', t => {
  t.true(typeof TestRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new TestRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new TestRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  t.context.seriesSpy = sinon.stub(taker, 'series', noop);

  taker.registry(new TestRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a test task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('test:copy'));
  t.ok(taker.task('test:local'));
  t.ok(taker.task('test:remote'));
});

test.cb('#test:copy sets the source and base from the configuration', t => {
  let taker = t.context.taker;

  taker.parallel('test:copy')(() => {
    t.ok(srcSpy.firstCall.calledWith(
      `${config.paths.local}/components/**/*`
    ));
    t.end();
  });
});

test.cb('#test:local runs `test:move` and tests locally in a series', t => {
  let taker = t.context.taker;
  let {copy, local} = taker._registry;

  taker.parallel('test:local')(() => {
    t.true(t.context.seriesSpy.calledWith(copy, local));
    t.end();
  });
});

test.cb('#test:remote runs `test:move` and tests remotely in a series', t => {
  let taker = t.context.taker;
  let {copy, remote} = taker._registry;

  taker.parallel('test:remote')(() => {
    t.true(t.context.seriesSpy.calledWith(copy, remote));
    t.end();
  });
});
