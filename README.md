# Polymer BootLicker
> Configurable build tasks for Polymer applications.

[![Build Status](https://api.travis-ci.org/filaraujo/polymer-bootlicker.svg)](https://travis-ci.org/filaraujo/polymer-bootlicker)
[![Coverage Status](https://coveralls.io/repos/github/filaraujo/polymer-bootlicker/badge.svg?branch=develop)](https://coveralls.io/github/filaraujo/polymer-bootlicker?branch=develop)

Bootlicker is a collection of gulp tasks which helps organize and build your
Polymer applications. It aims to abstract many of the annoyances around
tooling and provides a simplier, configurable alternative.

## Table of Contents

- [Usage](#usage)
- [Configuration](#configuration)
- [Tasks](#tasks)
- [Registries](#registries)
- [Roadmap](https://github.com/filaraujo/polymer-bootlicker/wiki/RoadMap)

## Usage
When using the Bootlicker registry, it will add default tasks to your
`gulp` instance.

```js
import gulp from 'gulp';
import Bootlicker from 'polymer-bootlicker';

// register bootlicker
gulp.registry(new Bootlicker(config));
```

Now exposes the default tasks.
> gulp --tasks



## Configuration
Default path configuration

```js
{
  paths: {
    app: './app',
    bower: './bower_components',
    components: './app/components/**/*',
    dist: './dist',
    fonts: './app/fonts/**/*',
    images: './app/**/*.{png,jpg,jpeg,gif}',
    local: './dist/local',
    locales: './locales',
    scripts: './app/**/*.js',
    styles: './app/**/*.css',
    tests: './test'
  }
}
```

You may define a custom configuration which will extend the base configuration.
```js
// custom configuration
let config = {
  paths: {
    dist: './build',
    local: './build/local'
  }
};

gulp.registry(new Bootlicker(config));
```

## Tasks

### Build
Build the local version of the application.
```
gulp build
```

Copy all build resources and html assets into build directory.
```
gulp build:copy
```

Build the distributable version of the application. This includes
optimization and minification of assets.
```
gulp build:dist
```

### Serve
Serve the local version of the application.
```
gulp serve
```

Serve the distributable version of the application.
```
gulp serve:dist
```

### Test
Run  wct locally.
```
gulp test:local
```

Run wct on saucelabs.
```
gulp test:sauce
```

## Registry Tasks
Additional tasks are available

### Fonts
```
gulp font:copy
```

### HTML
Copy bower assets to distribution folder.
```
gulp html:bower:copy
```

Copy components to distribution folder.
```
gulp html:components:copy
```

Polybuild html assets. `polybuild`
```
gulp html:polybuild
```

Copy views to distribution folder.
```
gulp html:views:copy
```

Process html view assets. `sourcemap` `useref` `htmlmin`
```
gulp html:views:process
```

### i18n
Translate asset files. `gulp-i18n-localize`
```
gulp i18n:translate
```

### Images
Copy and process images. `imagemin`.
```
gulp image:copy
```

### Scripts
Copy and process scripts. `eslint` `sourcemap` `babel` `uglify` `minify`
```
gulp script:copy
```

### Server
Start a server instance.
```
gulp server:serve
```

Reload server instance.
```
gulp server:reload
```

### Styles
Copy and process stylesheets. `autoprefix` `sourcemaps` `minify`
```
gulp style:copy
```

### Tests
Copy test assets into temporary test folder.
```
gulp test:copy
```

Run tests locally. `wct`
```
gulp test:local
```

Run test on remote. `wct`
```
gulp test:remote
```

### Tidy

Clean temporary folders.
```
gulp tidy
```

Clean distribution folder.
```
gulp tidy:dist
```

Clean temporary test folders.
```
gulp tidy:tests
```
