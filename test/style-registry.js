import test from 'ava';
import Undertaker from 'undertaker';
import StyleRegistry from '../src/registries/style';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    local: './build/local',
    styles: './css/**/*'
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
  t.true(typeof StyleRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new StyleRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new StyleRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new StyleRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a style task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('style:copy'));
});

test.cb('sets the source and base from the configuration', t => {
  let taker = t.context.taker;

  taker.series('style:copy')(() => {
    t.ok(srcSpy.firstCall.calledWith(
      config.paths.styles,
      {base: config.paths.app}
    ));
    t.end();
  });
});

test.cb('moves into dest folder', t => {
  let taker = t.context.taker;

  taker.series('style:copy')(() => {
    t.ok(destSpy.firstCall.calledWith(config.paths.local));
    t.end();
  });
});

// figure out how to test style processes
