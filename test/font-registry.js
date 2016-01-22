import test from 'ava';
import Undertaker from 'undertaker';
import FontRegistry from '../registries/font';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    fonts: './typography/**/*',
    locales: './localizations'
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
  t.true(typeof FontRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new FontRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new FontRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new FontRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a font task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('font'));
});

test.cb('sets the source and base from the configuration', t => {
  let taker = t.context.taker;

  taker.series('font')(() => {
    t.ok(srcSpy.firstCall.calledWith(
      config.paths.fonts,
      {base: config.paths.app}
    ));
    t.end();
  });
});

test.cb('moves into dest folder', t => {
  let taker = t.context.taker;

  taker.series('font')(() => {
    t.ok(destSpy.firstCall.calledWith(config.paths.local));
    t.end();
  });
});
