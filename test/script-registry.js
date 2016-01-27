import test from 'ava';
import Undertaker from 'undertaker';
import ScriptRegistry from '../src/registries/script';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    local: './build/local',
    scripts: './application/scripts/**/*.js'
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
  t.true(typeof ScriptRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new ScriptRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new ScriptRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new ScriptRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a script task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('script:copy'));
});

test.cb('sets the source and base from the configuration', t => {
  let taker = t.context.taker;

  taker.series('script:copy')(() => {
    t.ok(srcSpy.firstCall.calledWith(
      config.paths.scripts,
      {base: config.paths.app}
    ));
    t.end();
  });
});

test.cb('moves into dest folder', t => {
  let taker = t.context.taker;

  taker.series('script:copy')(() => {
    t.ok(destSpy.firstCall.calledWith(config.paths.local));
    t.end();
  });
});
