'use strict';

var map = require('map-stream'),
    through = require('through2'),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    build_commandline = require('./lib/traceur_command_builder');

module.exports = function(opt) {
  opt = opt || {};
  var debug = opt.debug || false;
  var clear = opt.clear;
  delete opt.debug;
  delete opt.clear;

  return through.obj(function(file, enc, cb) {
    var _self = this;
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-traceur-cmdline', 'Streaming not supported'));
      return;
    }

    var module_opts = {
      clear: clear,
      file: file,
      traceurcmd: path.join(__dirname, "/node_modules/traceur/traceur")
    };
    var cmd = build_commandline(opt, module_opts);

    exec(cmd, function(error, stdout, stderr) {
      if (error) {
        _self.emit('error', new gutil.PluginError('gulp-traceur-cmdline', stderr, {
          fileName: file.path,
          showStack: false
        }));
        cb(error, file);
      } else {
          file.contents = new Buffer(stdout);
          _self.push(file);
          cb();
      }});
  });
};
