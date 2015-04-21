'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    build_commandline = require('./lib/traceur_command_builder');

var getTraceurPath = function() {
  var traceurPathInner = path.join(__dirname, "/node_modules/traceur/traceur");
  var traceurPathOuter = path.join(__dirname, "../traceur/traceur");

  return fs.existsSync(traceurPathInner) ? traceurPathInner : traceurPathOuter;
};

module.exports = function(opt) {
  opt = opt || {};
  var clear = opt.clear;
  var traceurcmd = opt.traceurcmd || getTraceurPath();
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

    function emitError(opError, cbError) {
      if (cbError === undefined) {
        cbError = opError;
      }

      _self.emit('error', new gutil.PluginError('gulp-traceur-cmdline', opError, {
        fileName: file.path,
        showStack: false
      }));
      cb(cbError, file);
    }

    var module_opts = {
      clear: clear,
      file: file,
      traceurcmd: traceurcmd
    };
    var cmd = build_commandline(opt, module_opts);
    var cmdArr = cmd.split(";");
    var traceurCmd = cmdArr[0].trim();
    var tempFileName = cmdArr[1].trim().split(" ")[1];
    var rmCmd = cmdArr[2].trim();

    exec(traceurCmd, function(error, stdout, stderr) {
      if (error) {
        emitError(stderr, error);
      } else {
        fs.readFile(tempFileName, function(error, data) {
          if (error) {
            emitError(error);
          } else {
            file.contents = new Buffer(data);
            _self.push(file);

            exec(rmCmd, function(error, stdout, stderr) {
              if (error) {
                emitError(stderr, error);
              } else {
                cb();
              }
            });
          }
        });
      }
    });
  });
};
