'use strict';
module.exports = function(grunt, config) {
	var folders = ['./', 
	config.LIB,
	config.TEST,
	config.SOURCE + '/script',
	config.SOURCE + '/wsGrunt', 
	config.SOURCE + '/wsGrunt/task',
	];
	folders.forEach(function(folder){
		var js_files = grunt.file.expand(folder + '/*.js');
		js_files.forEach(function(file){
			file = file.replace("./", "");
			var file_name = file.substr(file.lastIndexOf('/')+1);
			var task_name = file_name.replace(".js", "_syntax");

			grunt.config.set('jshint.' + task_name, [file]);


			grunt.registerTask(task_name, ['jshint:' + task_name]);
			grunt.task.run(task_name);

			grunt.config.set('watch.' + task_name, {
				files: [file], 
				tasks: [task_name], 
				options: {spawn: false}
			});
		});

	});
};