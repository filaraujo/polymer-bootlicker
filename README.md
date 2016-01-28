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

## Usage


```js
import gulp from 'gulp';
import Bootlicker from 'polymer-bootlicker';

// register bootlicker
gulp.registry(new Bootlicker(config));

```


## Configuration

By default Bootlicker defines
```js
{
  paths: {
    app: './app',
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

You may define a custom configuration
```js
// custom configuration
let config = {
  paths: {
    dist: './build'
  }
};

gulp.registry(new Bootlicker(config));
```

## Tasks
list all tasks
```
gulp --tasks
```

### Build

```
gulp build
```

```
gulp build:copy
```

```
gulp build:dist
```

### Serve
```
gulp serve
```

```
gulp serve:dist
```

### Test
```
gulp test:local
```

```
gulp test:remote
```

## Registries
Say something about registries

### Fonts
```
gulp font:copy
```

### HTML
```
gulp html:bower:copy
```

```
gulp html:components:copy
```

```
gulp html:polybuild
```

```
gulp html:views:copy
```

```
gulp html:views:process
```

### i18n
```
gulp i18n:translate
```

### Images
```
gulp image:copy
```

### Scripts
```
gulp script:copy
```

## Server
```
gulp server:serve
```

```
gulp server:reload
```

### Styles
```
gulp style:copy
```

### Tests
```
gulp test:copy
```

```
gulp test:local
```

this overrides original definition
```
gulp test:remote
```

### Tidy
```
gulp tidy
```

```
gulp tidy:dist
```

```
gulp tidy:tests
```
