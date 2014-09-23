Gulp Traceur Command Line
==========================

Usage
--------
Install traceur globaly
```
npm install traceur --global
```

Add the package to your package.json
```javascript
"devDependencies": {
  "gulp-traceur-cmdline": "git+ssh://git@github.com:juancabrera/gulp-traceur-cmdline.git#v0.0.1"
}
```

Add it to your gulpfile.js
```javascript
var gulpTraceurCmdline = require('gulp-traceur-cmdline');

gulp.task('gulpTraceurCmdline',function() {
  gulp.src("./source/styleguide/js/main.js")
    .pipe(gulpTraceurCmdline('/usr/local/bin/traceur', {
      modules : 'inline',
      out     : './dist/styleguide/js/main.js',
      debug   : true
    }))
});
```