var expect = require('chai').expect,
	build_commandline = require('../lib/traceur_command_builder');

var fake = {path: 'a.js'};

describe("CommandBuilder", function() {
	describe("modules option", function() {
		it("default module option", function(){
			var command = build_commandline({},{file: fake, traceurcmd: 'traceur'});
			expect(command).to.have.string('--modules=inline');
		});

		it("custom module option", function(){
			var command = build_commandline({modules: 'register'},{file: fake, traceurcmd: 'traceur'});
			expect(command).to.have.string('--modules=register');
		})
	});

	describe("file param", function() {
    it("file param", function(){
      var command = build_commandline({},{file: fake, traceurcmd: 'traceur'});
      expect(command).to.have.string('a.js');
    });
	});

	describe("clear param", function() {
		it("with clear", function(){
			var command = build_commandline({},{file: fake, traceurcmd: 'traceur', clear:true});
			expect(command).to.have.string('clear &&');
		});

		it("without clear", function(){
			var command = build_commandline({},{file: fake, traceurcmd: 'traceur'});
			expect(command).not.to.have.string('clear &&');
		});
	});
});
