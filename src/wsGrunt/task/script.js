'use strict';
module.exports = function(grunt, config) {
	var style_path = '/script/*';
	var styles = grunt.file.expand(config.SOURCE + style_path);
	styles.forEach(function(dir){
		var dir_name = dir.substr(dir.lastIndexOf('/')+1);
		var is_file = dir_name.substr(dir_name.length-3) == ".js";
		var task_name = dir_name.replace(".", "") + "_js";
		
		if (is_file){
			grunt.config.set('watch.' + task_name, {
				files: [dir], 
				tasks: [task_name], 
				options: {spawn: false}
			});

			dir = dir.substr(0, dir.lastIndexOf('/'));

			grunt.config.set('uglify.' + task_name, {
				files: [{
					expand: true,
					cwd: dir,
					src: '*.js',
					dest: config.DESTINATION + '/js/',
					ext: '.min.js'
				}]
			});
			grunt.registerTask(task_name, ['uglify:' + task_name]);
			grunt.task.run(task_name);
		}

		else {
			var dest_name = config.DESTINATION + '/' + dir_name + '.min.js';
			grunt.config.set('concat.' + task_name, {
				src: [dir + '/*.js'],
				dest: dest_name
			});

			grunt.config.set('uglify.' + task_name, {
				files: [{
					expand: true,
					cwd: config.DESTINATION,
					src: dir_name + '.min.js',
					dest: config.DESTINATION + '/js'
				}]
			});

			grunt.config.set('clean.' + task_name, [dest_name]);
			grunt.registerTask(task_name, ['concat:' + task_name, 'uglify:' + task_name, 'clean:' + task_name]);
			grunt.task.run(task_name);

			grunt.config.set('watch.' + task_name, {
				files: [dir + '/*.js'], 
				tasks: [task_name], 
				options: {spawn: false}
			});
		}
	});


	// Minify vendor css to their respective folders
	var jss = grunt.file.expand(config.SOURCE + '/vendor/js/*.js', 
		config.SOURCE + '/vendor/js/**/*.js', 
		config.SOURCE + '/vendor/js/**/**/*.js');
	jss.forEach(function(file){
		var source_path = file.substr(0, file.lastIndexOf('/'));
		var dest_path = config.DESTINATION + source_path.substr(source_path.indexOf('/js'));
		var file_name = file.substr(file.lastIndexOf('/')+1);
		var task_name = file_name.replace(".js", "") + "_js_min";
		
		console.log(source_path);
		console.log(task_name);
		console.log(dest_path);

		grunt.config.set('uglify.' + task_name, {
			files: [{
				expand: true,
				cwd: source_path,
				src: file_name,
				dest: dest_path,
				ext: '.min.js'
			}]
		});

		grunt.registerTask(task_name, ['uglify:' + task_name]);
		grunt.task.run(task_name);

		grunt.config.set('watch.' + task_name, {
			files: [file], 
			tasks: [task_name], 
			options: {spawn: false}
		});
	});
};