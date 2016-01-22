'use strict';
module.exports = function(grunt, config) {
	var tests = grunt.file.expand(config.TEST + '/*.js');
	var file_content = '// This file has been generated';
	file_content += "\n" + '// To run use the command below';
	file_content += "\n" + '// > mocha';
	for (var i = 0; i < tests.length; i++) {
		file_content += "\n" + 'require("./' + tests[i] + '");';
	}
	grunt.file.write('test.js', file_content);
};
