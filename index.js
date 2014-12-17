/*jshint node:true */

'use strict';

var map   = require('map-stream'),
    gutil   = require('gulp-util'),
    exec    = require('child_process').exec,
    fs      = require('fs'),
    build_commandline = require('./lib/traceur_command_builder');

module.exports = function(opt) {

    // Assign default options if one is not supplied
    opt = opt || {};
    var debug =   opt.debug   || false;
    var clear = opt.clear;
    delete opt.debug;
    delete opt.clear;

    return map( function(file, cb) {
        var module_opts = {
            clear: clear,
            file: file,
            traceurcmd: "./node_modules/gulp-traceur-cmdline/node_modules/traceur/traceur"
        };

        var cmd = build_commandline(opt, module_opts);

        // print out debug details
        if (debug) {
            gutil.log(gutil.colors.yellow('\n *** Debug : Command - ' + cmd  + ' ***\n'));
        }

        exec(cmd, function(error, stdout, stderr) {
            // call user callback if ano error occurs
            if (error) {
                if (debug) {
                    gutil.log(error);
                }
                cb(error, file);
            }
            else {
                cb(null, file);
            }
        });
    });
};
