import test from 'ava';
import Undertaker from 'undertaker';
import ImageRegistry from '../registries/image';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    local: './build/local',
    images: './app/images/**/*.{png,jpg,jpeg,gif}'
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
  t.true(typeof ImageRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new ImageRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new ImageRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new ImageRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a image task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('image:copy'));
});

test.cb('sets the source and base from the configuration', t => {
  let taker = t.context.taker;

  taker.series('image:copy')(() => {
    t.ok(srcSpy.firstCall.calledWith(config.paths.images));
    t.end();
  });
});

test.cb('moves into dest folder', t => {
  let taker = t.context.taker;

  taker.series('image:copy')(() => {
    t.ok(destSpy.firstCall.calledWith(config.paths.local));
    t.end();
  });
});


// figure out how to test image processes
