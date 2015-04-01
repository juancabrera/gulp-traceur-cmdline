var fs      = require('fs'),
    gutil   = require('gulp-util'),
    os      = require('os'), 
    btoa      = require('btoa');

module.exports = exports = build_commandline;

function build_commandline(traceur_command_opts, module_opts) {
  var traceurcmd = module_opts.traceurcmd;
  var commandline_string = build_commandline_opts(traceur_command_opts);
  var clear_string =  module_opts.clear ? 'clear && ' : '';
  var tempout = "tempout" + btoa(Math.random(999, 9999)).replace(/=/g, "red") + ".js";

  var command = "";

  if(os.platform().indexOf("win") != -1 && os.platform().indexOf("darwin") == -1) {
    command = "node ";
    command += clear_string + traceurcmd + " " + commandline_string + " " + module_opts.file.path + " --out " + tempout + " && type " + tempout + " && del " + tempout;
  } else {
    command += clear_string + traceurcmd + " " + commandline_string + " " + module_opts.file.path + " --out " + tempout + "; cat " + tempout + "; rm " + tempout;
  }

  return command;

}

// function to build the commandline arguments part out of the user params and the params the command line gives. This should reduce boilerplate
function build_commandline_opts(user_opts) {

    var default_opts = { modules: 'inline' };

    function build_opt_string(key, val) {
      if(val === true) return '--'+key;
      return '--' + key + '=' + val;
    }

    function build_user_opt_string(key) {
      var val = user_opts[key];
      var opt_string = build_opt_string(key, val);
      return opt_string;
    }

    function build_default_opt_string(key) {
      if(!(key in user_opts)) {
        var default_val = default_opts[key];
        gutil.log(gutil.colors.yellow('\n       *** Debug : Traceur "'+key+'" not defined. Defaulting to "'+default_val+'"  ***\n'));
        return build_opt_string(key, default_val)
      }
      return '';
    }

    var user_opts_string =  Object.keys(user_opts).map(build_user_opt_string).join(" ");
    var default_opts_string = Object.keys(default_opts).map(build_default_opt_string).join(" ");
    return user_opts_string + " "+ default_opts_string;
}
