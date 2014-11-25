Gulp Traceur Command Line
==========================

Overview
--------
Gulp plugin that wraps command line [Traceur](https://github.com/google/traceur-compiler) instead of using its Node API. 
This is basically an alternative to [gulp-traceur](https://www.npmjs.org/package/gulp-traceur) (that uses Traceur's Node API). The main reason for this plugin is that sometimes the output of Traceur's Node API is different than the command line Traceur, especifically the option of inline modules, which it's pretty important if you want to use ES6 modules in the Browser.

Install
-------
Make sure you have installed Traceur globally:
```
npm install traceur --global
```
Install the gulp-traceur-cmdline:
```
npm install gulp-traceur-cmdline --save-dev
```
Usage
-------

```javascript
var gulpTraceurCmdline = require('gulp-traceur-cmdline');

gulp.task('gulpTraceurCmdline',function() {
  gulp.src("./source/styleguide/js/main.js")
    .pipe(gulpTraceurCmdline('/usr/local/bin/traceur', {
      modules : 'inline',
      out     : './dist/styleguide/js/main.js',
      debug   : false
    }))
});
```