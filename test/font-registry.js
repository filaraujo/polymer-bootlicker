import test from 'ava';
import Undertaker from 'undertaker';
import FontRegistry from '../registries/font';
import sinon from 'sinon';

let config = {paths: {app: './', fonts: './fontz', local: './dist/local'}};

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

test('exports a registry', t => {
  let font = new FontRegistry({});
  t.ok(font.init);
  t.ok(font._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new FontRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;
});

test('registers a font task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('font'));
});

test.cb('sets the source and base form the configuration', t => {
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
    t.ok(destSpy.firstCall.calledWith(
      config.paths.local
    ));
    t.end();
  });
});
