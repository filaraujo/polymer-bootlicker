import test from 'ava';
import Undertaker from 'undertaker';
import TestRegistry from '../registries/test';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    locales: './localizations',
    tests: './tests/**/*'
  }
};

let destSpy = sinon.spy(() => {
  return Promise.resolve();
});

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
  taker.registry(new TestRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a test task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('test:move'));
  t.ok(taker.task('test:local'));
  t.ok(taker.task('test:remote'));
});

test.cb('#test:move sets the source and base from the configuration', t => {
  let taker = t.context.taker;

  taker.series('test:move')(() => {
    t.ok(srcSpy.firstCall.calledWith(
      `${config.paths.local}/components/**/*`
    ));
    t.end();
  });
});

// test.cb('moves into dest folder', t => {
//   let taker = t.context.taker;
//
//   taker.series('test:remote')(() => {
//     t.ok(destSpy.firstCall.calledWith(config.paths.local));
//     t.end();
//   });
// });
