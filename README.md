Gulp Traceur Command Line
==========================

Overview
--------
Gulp plugin that wraps command line [Traceur](https://github.com/google/traceur-compiler) instead of using its Node API. 
This is basically an alternative to [gulp-traceur](https://www.npmjs.org/package/gulp-traceur) (that uses Traceur's Node API). The main reason for this plugin is that sometimes the output of Traceur's Node API is different than the command line Traceur.

Install
-------
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
    .pipe(gulpTraceurCmdline({
      modules : 'inline',
      out     : './dist/styleguide/js/main.js',
      debug   : false
    }))
});
```