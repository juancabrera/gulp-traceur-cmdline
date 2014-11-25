/*jshint node:true */

'use strict';

var map   = require('map-stream'),
    gutil   = require('gulp-util'),
    exec    = require('child_process').exec,
    fs      = require('fs');

module.exports = function(traceurcmd, opt) {

  // Assign default options if one is not supplied
  opt = opt || {};
  opt = {
    modules: opt.modules || false,
    out    : opt.out     || false,
    debug  : opt.debug   || false
  };

  // check for traceur command
  if (!traceurcmd) {

    fs.exists('/usr/local/bin/traceur', function(exists) {
      if (!exists) {
        gutil.log(gutil.colors.red('[ERROR]', "Traceur command not provided and default of /usr/local/bin/traceur does not exist on system"));
      }
    });

    traceurcmd = '/usr/local/bin/traceur';

    gutil.log(gutil.colors.blue('[NOTICE]', "Traceur command not provided, defaulting to /usr/local/bin/traceur"));

  }

  return map( function(file, cb) {

    var cmd = opt.clear ? 'clear && ' + traceurcmd : traceurcmd;

    // add modules option
    if (!opt.modules) {
      gutil.log(gutil.colors.yellow('\n       *** Debug : Traceur "modules" format not defined. Defaulting to "inline"  ***\n'));
      opt.modules = 'inline'
    }

    cmd += ' --modules ' + opt.modules

    // add out option
    if (!opt.out) {
      gutil.log(gutil.colors.red('\n       *** Error : "out" not provided!  ***\n'));
      // TODO : throw error here
    }

    cmd += ' --out ' + opt.out

    // add file path
    cmd += ' ' + file.path

    // print out debug details
    if (opt.debug) {
      gutil.log(gutil.colors.yellow('\n       *** Debug : Command - ' + cmd  + ' ***\n'));
    }

    exec(cmd, function(error, stdout, stderr) {
      // call user callback if ano error occurs
      if (error) {
        if (opt.debug) {
          gutil.log(error);
        }
        cb(error, file);
      }
      else {
        cb(null, file);
      }
    });
  });
}
