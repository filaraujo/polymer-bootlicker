import test from 'ava';
import Undertaker from 'undertaker';
import ImageRegistry from '../registries/image';
import sinon from 'sinon';

let config = {
  paths: {
    app: './',
    dist: './dist',
    images: './app/**/*.{png,jpg,jpeg,gif}',
    local: './dist/local'
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
  let image = new ImageRegistry(config);
  t.ok(image.init);
  t.ok(image._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new ImageRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a font task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('image'));
});

test.cb('sets the source and base form the configuration', t => {
  let taker = t.context.taker;

  taker.series('image')(() => {
    t.ok(srcSpy.firstCall.calledWith(config.paths.images));
    t.end();
  });
});

test.cb('moves into dest folder', t => {
  let taker = t.context.taker;

  taker.series('image')(() => {
    t.ok(destSpy.firstCall.calledWith(config.paths.local));
    t.end();
  });
});