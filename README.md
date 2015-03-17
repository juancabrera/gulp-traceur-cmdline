# Gulp Traceur (Command Line)

Gulp plugin for [Traceur](https://github.com/google/traceur-compiler). This plugin uses Traceur's command line instead of its Node API.  

**Why Traceur's command line ?**  
[Traceur](https://github.com/google/traceur-compiler) generates different outputs depending if you are using its Node API (the one that [gulp-traceur](https://www.npmjs.com/package/gulp-traceur) uses) or the command line, in most cases, the output of the command line is the more accurate.

## Install

Install the gulp-traceur-cmdline:
```
npm install gulp-traceur-cmdline --save-dev
```
##Usage


```javascript
var gulpTraceurCmdline = require('gulp-traceur-cmdline');

gulp.task('gulpTraceurCmdline',function() {
  gulp.src("./source/js/main.js")
    .pipe(gulpTraceurCmdline({
      modules : 'inline'
    }))
    .pipe(gulp.dest('./dist/js/'));
});
```
## API
#### Options
You can pass all current [Traceur's options](https://github.com/google/traceur-compiler/wiki/Options-for-Compiling) through gulp-traceur-cmdline. The default for the option `modules` is `inline`.

## License
MIT Copyright (c) [Juan Cabrera](http://juan.me)