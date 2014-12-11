/*jshint node:true */

'use strict';

var map   = require('map-stream'),
    gutil   = require('gulp-util'),
    exec    = require('child_process').exec,
    fs      = require('fs');

//function to build the commandline arguments part out of the user params and the params the command line gives. This should reduce boilerplate
function build_commandline_opts(user_opts) {

    var commandline_opts = {
        modules: 'inline',
        'source-maps': null
    };

    function build_param_string(key) {
        var val = user_opts[key];
        if (val) {
            return '--' + key + '=' + val;
        }
        var default_val = commandline_opts[key];
        if (default_val !== null) {
            gutil.log(gutil.colors.yellow('\n       *** Debug : Traceur "'+key+'" not defined. Defaulting to "'+default_val+'"  ***\n'));
            return '--' + key + '=' + default_val;
        }
        return '';
    }

    return Object.keys(commandline_opts).map(build_param_string).join(" ");

}

module.exports = function(traceurcmd, opt) {

    // Assign default options if one is not supplied
    opt = opt || {};
    opt.out =  opt.out     || false;
    opt.debug =   opt.debug   || false;

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

        var command_options_part = build_commandline_opts(opt);
        cmd += ' ' + command_options_part + ' ';


        // add out option
        if (!opt.out) {
            gutil.log(gutil.colors.red('\n       *** Error : "out" not provided!  ***\n'));
            // TODO : throw error here
        }

        cmd += ' --out ' + opt.out;

        // add file path
        cmd += ' ' + file.path;

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
};
