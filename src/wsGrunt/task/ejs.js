'use strict';
module.exports = function(grunt, config) {
  var files = grunt.file.expand(config.SOURCE + "/partials/*.ejs",
                                config.SOURCE + "/partials/*.html",
                                config.SOURCE + "/views/*.html",
                                config.SOURCE + "/views/*.ejs");
  files.forEach(function(path) {
    var name = path.substr(path.lastIndexOf('/')+1).replace('.html', '.ejs');
    var task_name = name.replace(".ejs", "_ejs");
    var dest = config.DESTINATION + '/views/partials/' + name;
    if(path.lastIndexOf("/views/") > 0){
      dest = dest.replace("/partials", "");
    }

    grunt.config.set('copy.' + task_name, {
      src: path,
      dest: dest
    });

    grunt.task.run('copy:' + task_name);

    grunt.config.set('watch.' + task_name, {
      files: [path], 
      tasks: ['copy:' + task_name], 
      options: {spawn: false}
    });
  });
};
