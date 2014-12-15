var gulp = require('gulp');
var mocha = require('gulp-mocha');
var expect = require('chai').expect;


gulp.task('default', function () {
    global.expect = expect;

    return gulp.src('test/traceur_command_builder_test.js', {read: false})
        .pipe(mocha(
            {
                reporter: 'nyan',
                globals: {
                    expect: expect
                }
            }
        ));
});