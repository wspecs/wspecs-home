'use strict';
module.exports = function(grunt, config) {
	var style_path = '/style/*';
	var styles = grunt.file.expand(config.SOURCE + style_path);
	styles.forEach(function(dir){
		var dir_name = dir.substr(dir.lastIndexOf('/')+1);
		var file_name = config.DESTINATION + '/' + dir_name + '.sass';
		var task_name = dir_name + "_sass";

		grunt.config.set('concat.' + task_name, {
			src: [dir + '/*.sass'],
			dest: file_name
		});

		grunt.config.set('sass.' + task_name, {
			options : {
				style : 'compressed'
			},
			files: [{
				expand: true,
				sourcemap: 'none',
				cwd: config.DESTINATION,
				src: ['*.sass'],
				dest: config.DESTINATION + '/css',
				ext: '.min.css'
			}]
		});

		grunt.config.set('clean.' + task_name, [file_name]);
		grunt.registerTask(task_name, ['concat:' + task_name, 'sass:' + task_name, 'clean:' + task_name]);
		grunt.task.run(task_name);

		grunt.config.set('watch.' + task_name, {
			files: [dir + '/*'], 
			tasks: [task_name], 
			options: {spawn: false}
		});
	});

	// Minify vendor css to their respective folders
	var csss = grunt.file.expand(config.SOURCE + '/vendor/css/*.scss', 
		config.SOURCE + '/vendor/css/**/*.scss', 
		config.SOURCE + '/vendor/css/**/**/*.scss');
	csss.forEach(function(file){
		var source_path = file.substr(0, file.lastIndexOf('/'));
		var dest_path = config.DESTINATION + source_path.substr(source_path.indexOf('/css'));
		var file_name = file.substr(file.lastIndexOf('/')+1);
		var task_name = file_name.replace(".scss", "") + "_scss";
		
		console.log(source_path);
		console.log(task_name);
		console.log(dest_path);

		grunt.config.set('sass.' + task_name, {
			options : {
				style : 'compressed'
			},
			files: [{
				expand: true,
				sourcemap: 'none',
				cwd: source_path,
				src: ['*.scss'],
				dest: dest_path,
				ext: '.min.css'
			}]
		});

		grunt.config.set('clean.' + task_name, [dest_path + '/*.map']);
		grunt.registerTask(task_name, ['sass:' + task_name, 'clean:' + task_name]);
		grunt.task.run(task_name);

		grunt.config.set('watch.' + task_name, {
			files: [file], 
			tasks: [task_name], 
			options: {spawn: false}
		});
	});

	var files = {};
	files[config.DESTINATION + '/css'] = [config.DESTINATION + '/css/*.css'];
	grunt.config.set('cmq.handler', {
		files: files
	});

	grunt.config.set('cssmin.handler', {
		files: [{
			expand: true,
			cwd: config.DESTINATION + '/css',
			src: ['*.css'],
			dest: config.DESTINATION + '/css',
			ext: '.min.css'
		}]
	});

	grunt.registerTask('cmqmin', ['cmq:handler', 'cssmin:handler']);
	grunt.task.run('cmqmin');
	grunt.config.set('watch.handler', {
		files: [config.DESTINATION + '/css/*css'], 
		tasks: ['cssmin'], 
		options: {spawn: false}
	});
};