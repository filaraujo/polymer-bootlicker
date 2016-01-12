import test from 'ava';
import Bootlicker from '../index';

test('exports a function', t => {
  t.true(typeof Bootlicker === 'function');
});

test('exports a registry', t => {
  let bootlicker = new Bootlicker({});
  t.ok(bootlicker.init);
  t.ok(bootlicker._tasks);
});

test('accepts a configuration', t => {
  let config = {foo: 'bar'};
  let bootlicker = new Bootlicker(config);
  t.ok(bootlicker.config.foo);
});

test('set default paths config', t => {
  let bootlicker = new Bootlicker({});
  t.ok(bootlicker.config.paths);
});

test('accepts local configuration', t => {
  let fontPath = './app/fontz';
  let bootlicker = new Bootlicker({paths: {fontDir: fontPath}});
  t.is(bootlicker.config.paths.fontDir, fontPath);
});
