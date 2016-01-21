import test from 'ava';
import Undertaker from 'undertaker';
import I18nRegistry from '../registries/i18n';
import sinon from 'sinon';

let config = {
  paths: {
    app: './',
    locales: './localez',
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
  t.true(typeof I18nRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new I18nRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let i18n = new I18nRegistry(config);
  t.ok(i18n.init);
  t.ok(i18n._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new I18nRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a font task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('i18n'));
});

// test.cb('sets the source and base form the configuration', t => {
//   let taker = t.context.taker;
//
//   taker.series('i18n')(() => {
//     t.ok(srcSpy.firstCall.calledWith(
//       `${config.paths.local}/**/*`,
//       {base: config.paths.local}
//     ));
//     t.end();
//   });
// });

// test.cb('moves into dest folder', t => {
//   let taker = t.context.taker;
//
//   taker.series('i18n')(() => {
//     t.ok(destSpy.firstCall.calledWith(
//       config.paths.dist
//     ));
//     t.end();
//   });
// });
