'use strict';

module.exports = function(grunt, config) {

  var taskName = 'copy.prodCss';
  grunt.config.set(taskName, {
    src: config.DESTINATION + '/css/' + config.DEV.css,
    dest: config.DESTINATION + '/css/' + config.PROD.css,
  });
  grunt.task.run(taskName.replace('.', ':'));

  taskName = 'copy.prodJs';
  grunt.config.set(taskName, {
    src: config.DESTINATION + '/js/' + config.DEV.js,
    dest: config.DESTINATION + '/js/' + config.PROD.js,
  });
  grunt.task.run(taskName.replace('.', ':'));

  var directory = config.DESTINATION + '/views';
  var template = grunt.file.read(directory + '/' + config.DEV.template);
  template = template.replace('head', 'whead');
  template = template.replace('script', 'wscript');
  grunt.file.write(directory + '/' + config.PROD.template, template);

  directory = config.DESTINATION + '/views/partials';
  template = grunt.file.read(directory + '/head.ejs');
  template = template.replace(config.DEV.css, config.PROD.css);
  grunt.file.write(directory + '/whead.ejs', template);

  template = grunt.file.read(directory + '/script.ejs');
  template = template.replace(config.DEV.js, config.PROD.js);
  grunt.file.write(directory + '/wscript.ejs', template);
};
