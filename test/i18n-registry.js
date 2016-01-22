import test from 'ava';
import Undertaker from 'undertaker';
import I18nRegistry from '../registries/i18n';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application',
    dist: './build',
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
  t.true(typeof I18nRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new I18nRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new I18nRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new I18nRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a i18n task', t => {
  let taker = t.context.taker;
  t.ok(taker.task('i18n'));
});

// test.cb('sets the source and base from the configuration', t => {
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

// figure out how to test i18n processes
