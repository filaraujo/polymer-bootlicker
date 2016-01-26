import test from 'ava';
import Bootlicker from '../index';
import Undertaker from 'undertaker';

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
  t.ok(bootlicker._config.foo);
});

test('set default paths config', t => {
  let bootlicker = new Bootlicker({});
  let {paths} = bootlicker._config;
  t.ok(paths);
  t.is(paths.app, './app');
  t.is(paths.dist, './dist');
  t.is(paths.fonts, './app/fonts/**/*');
  t.is(paths.images, './app/**/*.{png,jpg,jpeg,gif}');
  t.is(paths.local, './dist/local');
  t.is(paths.locales, './locales');
  t.is(paths.scripts, './app/**/*.js');
  t.is(paths.styles, './app/**/*.css');
});

test('accepts local configuration', t => {
  let fontPath = './app/fontz';
  let bootlicker = new Bootlicker({paths: {font: fontPath}});
  t.is(bootlicker._config.paths.font, fontPath);
});

test('adds default registries tasks', t => {
  let taker = new Undertaker();
  taker.registry(new Bootlicker({}));

  [
    'font:copy',
    'i18n:translate',
    'html:bower:copy',
    'html:components:copy',
    'html:polybuild',
    'html:views:copy',
    'html:views:process',
    'i18n:translate',
    'image:copy',
    'server:reload',
    'server:serve',
    'script:copy',
    'style:copy',
    'test:local',
    'tidy:dist',
    'tidy:tests'
  ].forEach(function(task) {
    t.ok(taker.task(task));
  });
});
