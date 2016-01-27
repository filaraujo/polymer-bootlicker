import test from 'ava';
import Undertaker from 'undertaker';
import HTMLRegistry from '../lib/registries/html';
import sinon from 'sinon';

let config = {
  paths: {
    app: './application'
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
  t.true(typeof HTMLRegistry === 'function');
});

test('throws if not configured with paths', t => {
  let func = () => new HTMLRegistry();
  t.throws(func);
});

test('exports a registry', t => {
  let registry = new HTMLRegistry(config);
  t.ok(registry.init);
  t.ok(registry._tasks);
});

test.beforeEach(t => {
  let taker = t.context.taker = new Undertaker();
  taker.registry(new HTMLRegistry(config));
  taker.dest = destSpy;
  taker.src = srcSpy;

  taker.on('error', console.log);
});

test('registers a html tasks', t => {
  let taker = t.context.taker;

  [
    'html:bower:copy',
    'html:components:copy',
    'html:polybuild',
    'html:views:copy',
    'html:views:process'
  ].forEach(function(task) {
    t.ok(taker.task(task));
  });
});

// test tasks
// test.cb('sets the source and base from the configuration', t => {
//   let taker = t.context.taker;
//
//   taker.series('font:copy')(() => {
//     t.ok(srcSpy.firstCall.calledWith(
//       config.paths.fonts,
//       {base: config.paths.app}
//     ));
//     t.end();
//   });
// });
