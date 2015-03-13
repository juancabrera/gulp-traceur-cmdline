'use strict';

var map = require('map-stream'),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    fs = require('fs'),
    build_commandline = require('./lib/traceur_command_builder');

module.exports = function(opt) {
  opt = opt || {};
  var debug = opt.debug || false;
  var clear = opt.clear;
  delete opt.debug;
  delete opt.clear;

  return map( function(file, cb) {
    var module_opts = {
      clear: clear,
      file: file,
      traceurcmd: __dirname + "/node_modules/traceur/traceur"
    };

    var cmd = build_commandline(opt, module_opts);

    if (debug)  gutil.log(gutil.colors.yellow('\n *** Debug : Command - ' + cmd  + ' ***\n'));

    exec(cmd, function(error, stdout, stderr) {
      if (error) {
        if (debug) {
          gutil.log(error);
        }
        cb(error, file);
      } else {
        cb(null, file);
      }
    });
  });
};
