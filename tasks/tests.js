import gulp from 'gulp';
import {paths} from '../tasks/paths.js';
import wct from 'web-component-tester';

const wctConfig = {
  persistent: true,
  suites: [`${paths.tests}/**/tests/*.html`]
};
const wctLocalConfig = {local: {}};
const wctSauceConfig = {sauce: {}};

/**
 * moves assets into test folder
 * @return {obj} gulp
 */
function moveTests() {
  return gulp.src(`${paths.local}/components/**/*`)
    .pipe(gulp.dest(paths.tests));
}

/**
 * runs tests locally
 * @return {obj} gulp
 */
function runLocalTests() {
  return wct.test(Object.assign(wctLocalConfig, wctConfig));
}

/**
 * runs tests on saucelabs
 */
function runSauceTests() {
  wct.test(Object.assign(wctSauceConfig, wctConfig));
}

export let tests = {
  local: [moveTests, runLocalTests],
  remote: [moveTests, runSauceTests]
};
